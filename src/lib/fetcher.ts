/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { StrapiError } from "./error";
import {
  FetcherOptions,
  NextRequestInit,
  StrapiErrorPayload,
  StrapiResponse,
} from "./types";

if (typeof window !== "undefined") {
  throw new Error(
    "fetcher can only be used on the server. Use an API route or a client hook instead."
  );
}

const getBaseUrl = (): string => {
  const env = process.env.STRAPI_API_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!env) throw new Error("Missing STRAPI_API_URL or NEXT_PUBLIC_STRAPI_URL");
  return env.replace(/\/$/, "");
};

const isServer = () => typeof window === "undefined";

function buildUrl(
  base: string,
  endpoint: string,
  query?: FetcherOptions["query"]
): string {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = new URL(cleanEndpoint, `${base}/`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      if (Array.isArray(v)) {
        for (const item of v) url.searchParams.append(k, String(item));
      } else {
        url.searchParams.append(k, String(v));
      }
    }
  }
  return url.toString();
}

function isJsonContentType(contentType: string | null): boolean {
  if (!contentType) return false;
  return (
    contentType.includes("application/json") || contentType.includes("+json")
  );
}

export async function fetcher<T = unknown>(
  opts: FetcherOptions
): Promise<StrapiResponse<T>> {
  const {
    endpoint,
    query,
    revalidate,
    headers = {},
    method,
    body,
    signal,
  } = opts;

  const base = getBaseUrl();
  const url = buildUrl(base, endpoint, query);
  const requestHeaders: Record<string, string> = { ...headers };

  let requestBody: BodyInit | undefined;

  if (body !== undefined && body !== null) {
    if (typeof FormData !== "undefined" && body instanceof FormData) {
      requestBody = body as unknown as BodyInit;
      delete requestHeaders["Content-Type"];
    } else {
      try {
        requestBody = JSON.stringify(body);
        requestHeaders["Content-Type"] =
          requestHeaders["Content-Type"] ?? "application/json";
      } catch (err) {
        throw new StrapiError(
          "Failed to serialize request body",
          0,
          {
            error: {
              message: "Failed to serialize request body",
              details: err,
            },
          },
          err
        );
      }
    }
  }

  const fetchInit: NextRequestInit = {
    method: method ?? (requestBody ? "POST" : "GET"),
    headers: requestHeaders,
    body: requestBody,
    signal,
  };

  if (isServer()) {
    if (revalidate !== undefined) fetchInit.next = { revalidate };
    else fetchInit.cache = "no-store";
  }

  try {
    const res = await fetch(url, fetchInit);

    if (res.status === 204) {
      return { data: undefined as unknown as T } as StrapiResponse<T>;
    }

    const contentType = res.headers.get("content-type");
    let parsed: unknown = null;
    if (isJsonContentType(contentType)) {
      try {
        parsed = await res.json();
      } catch (parseErr) {
        console.warn("[fetcher] Failed to parse JSON:", parseErr);
        try {
          parsed = await res.text();
        } catch (textErr) {
          console.warn("[fetcher] Failed to read text fallback:", textErr);
          parsed = null;
        }
      }
    } else {
      try {
        parsed = await res.text();
      } catch (textErr) {
        console.warn("[fetcher] Failed to read text:", textErr);
        parsed = null;
      }
    }

    if (!res.ok) {
      const payload =
        parsed &&
        typeof parsed === "object" &&
        "error" in (parsed as Record<string, unknown>)
          ? (parsed as StrapiErrorPayload)
          : {
              error: {
                status: res.status,
                name:
                  (parsed &&
                    typeof parsed === "object" &&
                    (parsed as any).name) ??
                  "StrapiError",
                message:
                  (parsed &&
                    typeof parsed === "object" &&
                    ((parsed as any).error?.message ??
                      (parsed as any).message)) ??
                  String(parsed ?? `HTTP ${res.status}`),
                details:
                  (parsed &&
                    typeof parsed === "object" &&
                    (parsed as any).error?.details) ??
                  undefined,
              },
            };

      throw new StrapiError(payload.error.message, res.status, payload, parsed);
    }

    return parsed as StrapiResponse<T>;
  } catch (err) {
    if (err instanceof StrapiError) throw err;

    const isAbort = err instanceof DOMException && err.name === "AbortError";
    const message = isAbort
      ? "Request aborted"
      : err instanceof Error
      ? err.message
      : String(err);

    throw new StrapiError(
      message,
      0,
      {
        error: {
          message,
          name: isAbort ? "AbortError" : "NetworkError",
          details: err,
        },
      },
      err
    );
  }
}
