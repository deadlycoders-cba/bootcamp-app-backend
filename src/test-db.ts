import 'temporal-polyfill/full/global';
import { db } from './prisma/db.js';

const participants =
  await db.orm.public.Participants.all();

console.log(participants);