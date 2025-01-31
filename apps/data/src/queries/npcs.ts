import { Poe2Database } from "../types";

export async function findNpcs(db: Poe2Database) {
  return await db.query.npCs.findMany({
    with: {
      npcPortrait: true
    },
  })
}

export async function findNpcById(db: Poe2Database, id: string) {
  return await db.query.npCs.findFirst({
    where: (items, { eq }) => eq(items.id, id),
    with: {
      npcPortrait: true
    },
  })
}
