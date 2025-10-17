import { StrapiErrorPayload } from "./types";

export class StrapiError extends Error {
  public status: number;
  public payload: StrapiErrorPayload;
  constructor(
    message: string,
    status: number,
    payload: StrapiErrorPayload,
    cause?: unknown
  ) {
    super(message);
    this.name = "StrapiError";
    this.status = status;
    this.payload = payload;

    if (cause && !("cause" in this)) {
      (this as unknown as { cause?: unknown }).cause = cause;
    }

    Object.setPrototypeOf(this, StrapiError.prototype);
  }
}
