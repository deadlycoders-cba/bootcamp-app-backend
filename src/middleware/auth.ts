// src/middleware/auth.ts
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';

// Extend the Request type to include the user payload
export interface AuthenticatedRequest extends Request {
  user?: { userId: number; role: string };
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1] as string;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as {
      userId: number;
      role: string;
    };
    req.user = decoded; // Attach user info to the request
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
