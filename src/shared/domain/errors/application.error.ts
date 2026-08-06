export class ApplicationError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode = 400,
    public readonly details: readonly unknown[] = [],
  ) {
    super(message);
  }
}
