import { db } from "../prisma/db.js";

const participants = [
 { id: 1, name: 'Jordan Smith', stream: 'Engineering', isActive: true },
 { id: 2, name: 'Bart Simpson', stream: 'Cyber', isActive: true },
];

export async function getAllParticipants() {
 //return participants;
  return await db.orm.public.Participants.all();
} 

export async function getParticipantById(id: number) {
  //return participants.find(p => p.id === id) ?? null;
  return await db.orm.public.Participants.where({ id }).first();
}

export async function createParticipant(name: string, stream: string) {
  /*
  const newParticipant = {
    id: participants.length + 1,
    name: name.trim(),
    stream,
    isActive: true,
  };
  participants.push(newParticipant);
  */
 const newParticipant =
  await db.orm.public.Participants.create({
    name: name.trim(),
    stream: stream.trim(),
  });
 
  return newParticipant;
}

export async function updateParticipant(id: number, data: { name?: string; stream?: string; isActive?: boolean }) {
  const existing = await db.orm.public.Participants.where({ id }).first();
  if (!existing) return null;


  // support change of isActive status, but if not provided, keep existing value

  const updated = await db.orm.public.Participants
    .where({ id })
    .update({
      name: data.name?.trim() ?? existing.name,
      stream: data.stream?.trim() ?? existing.stream,
      isActive: data.isActive ?? existing.isActive,
      //updatedAt: Temporal.Now.plainDateTimeISO()
    });

  return updated;
}

export async function deleteParticipant(id: number) {
  const existing = await db.orm.public.Participants.where({ id }).first();
  if (!existing) return null;

  await db.orm.public.Participants.where({ id }).delete();
  return existing;
}
  
/*
export async function getActiveParticipantCount() {
    const participants = 
        await db.orm.public.Participants.all(); 
    return participants.filter(
        participant => participant.isActive === true 
    ).length;
}
*/
// changes the code because the integration test is failing because the isActive property can be null, so we need to check for that as well
export async function getActiveParticipantCount() {
  const participants =
    await db.orm.public.Participants.all();

  return participants.filter(
    (participant: { isActive: boolean | null }) =>
      participant.isActive === true
  ).length;
}