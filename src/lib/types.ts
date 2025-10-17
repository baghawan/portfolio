export interface NextRequestInit extends RequestInit {
  next?: { revalidate?: number | false };
  cache?: RequestCache;
}

export interface FetcherOptions {
  endpoint: string;
  query?: Record<
    string,
    | string
    | number
    | boolean
    | Array<string | number | boolean>
    | null
    | undefined
  >;
  revalidate?: number | false;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface StrapiErrorPayload {
  error: {
    status?: number;
    name?: string;
    message: string;
    details?: unknown;
  };
}
