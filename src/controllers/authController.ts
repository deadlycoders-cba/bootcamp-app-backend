import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import * as authService from '../services/authService.js';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;


    const { accessToken, refreshToken, userId, role } =
      await authService.login(email, password);
 
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ accessToken, userId, role });
  } catch {
      res.status(401).json({ error: 'Invalid credentials' });
  }

  /*

    const result = await authService.login(email, password);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error: 'Invalid credentials',
    });
  }
  */
}

// handels refresh token requests
export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.status(401).json({ error: 'No refresh token' });
  }
 
  try {
    const decoded = authService.verifyRefreshToken(token);
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET ?? 'dev-secret-change-in-production',
      { expiresIn: '15m' }
    );
    res.status(200).json({ accessToken });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
}

// handles logout requests and clears the refresh token cookie
export function logout(req: Request, res: Response) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  res.status(200).json({ message: 'Logged out successfully' });
}
