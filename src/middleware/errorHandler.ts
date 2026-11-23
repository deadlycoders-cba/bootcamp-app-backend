import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction  // Required even if not used
) {
  console.error('Unhandled error:', err.message);

  res.status(500).json({
    error: 'Something went wrong on the server',
    ...(process.env.NODE_ENV === 'development' && {
      details: err.message
    }),
  });
}
