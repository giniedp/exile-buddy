import { Poe2Database } from '../types'

export async function findItemClasses(db: Poe2Database) {
  return await db.query.itemClasses.findMany({
    with: {
      itemClassCategory: true,
    },
  })
}

export async function findItemClassById(db: Poe2Database, id: string) {
  return await db.query.itemClasses.findFirst({
    where: (classes, { eq }) => eq(classes.id, id),
    with: {
      itemClassCategory: true,
    },
  })
}

export async function findItemClassByIdWithBaseItems(db: Poe2Database, id: string) {
  return await db.query.itemClasses.findFirst({
    where: (classes, { eq }) => eq(classes.id, id),
    with: {
      itemClassCategory: true,
      baseItemTypes: true,
    },
  })
}
