import type { Request, Response } from 'express';
import * as participantService from '../services/participantService.js';
import type { AuthenticatedRequest } from '../middleware/auth.js';

export async function getAll(req: AuthenticatedRequest, res: Response) {
  console.log('Authenticated user:', req.user); // Log the authenticated user info
  
  const participants = await participantService.getAllParticipants();
  res.status(200).json(participants);
}

export async function getById(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const participant = await participantService.getParticipantById(id);
  if (!participant) {
    return res.status(404).json({ error: 'Participant not found' });
  }
  res.status(200).json(participant);
}

export async function create(req: Request, res: Response) {
  const { name, stream } = req.body;
  const participant = await participantService.createParticipant(name, stream);
  res.status(201).json(participant);
}


export async function update(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const { name, stream, isActive } = req.body;
  const updated = await participantService.updateParticipant(id, { name, stream, isActive });
  if (!updated) {
    return res.status(404).json({ error: 'Participant not found' });
  }
  res.status(200).json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const deleted = await participantService.deleteParticipant(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Participant not found' });
  }
  res.status(200).json({ message: 'Participant deleted successfully' });
}
