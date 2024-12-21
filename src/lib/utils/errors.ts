export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public data?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }

  static isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
  }
}

export const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTEGRATION_ERROR: 'INTEGRATION_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
} as const;