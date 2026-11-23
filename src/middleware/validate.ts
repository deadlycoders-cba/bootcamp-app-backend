import type { Request, Response, NextFunction } from 'express';

export function validateParticipant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, stream } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(422).json({
      error: 'Validation failed',
      details: 'name is required and must be a non-empty string',
    });
  }

  const validStreams = ['Engineering', 'Data', 'Cyber'];
  if (!stream || !validStreams.includes(stream)) {
    return res.status(422).json({
      error: 'Validation failed',
      details: `stream must be one of: ${validStreams.join(', ')}`,
    });
  }

  next();
}

export function validateParticipantUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, stream, isActive } = req.body;

  // At least one field must be provided
  if (
    name === undefined &&
    stream === undefined &&
    isActive === undefined
  ) {
    return res.status(422).json({
      error: 'Validation failed',
      details: 'At least one of `name`, `stream`, or `isActive` must be provided',
    });
  }

  // Validate name when provided
  if (
    name !== undefined &&
    (typeof name !== 'string' || name.trim().length === 0)
  ) {
    return res.status(422).json({
      error: 'Validation failed',
      details: 'name must be a non-empty string when provided',
    });
  }

  // Validate stream when provided
  const validStreams = ['Engineering', 'Data', 'Cyber'];

  if (
    stream !== undefined &&
    (typeof stream !== 'string' || !validStreams.includes(stream))
  ) {
    return res.status(422).json({
      error: 'Validation failed',
      details: `stream must be one of: ${validStreams.join(', ')}`,
    });
  }

  // Validate isActive when provided
  if (isActive !== undefined && typeof isActive !== 'boolean') {
    return res.status(422).json({
      error: 'Validation failed',
      details: 'isActive must be a boolean when provided',
    });
  }

  next();
}