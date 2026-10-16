// Small helpers that keep responses shaped like the previous NestJS API,
// so the existing frontend error handling keeps working unchanged.
export class HttpError extends Error {
  constructor(status, message) {
    super(Array.isArray(message) ? message.join(', ') : message);
    this.status = status;
    this.messages = Array.isArray(message) ? message : [message];
  }
}

// Validate `data` against a zod schema; throw a 400 HttpError with the
// flattened messages (matching NestJS ValidationPipe's array format).
export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const messages = result.error.issues.map((issue) => {
      const path = issue.path.join('.');
      return path ? `${path}: ${issue.message}` : issue.message;
    });
    throw new HttpError(400, messages);
  }
  return result.data;
}

// Wrap an async route handler so thrown errors reach the error middleware.
export const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
