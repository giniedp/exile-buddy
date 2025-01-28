import { Poe2Database } from '../types'

export async function findItemClasses(db: Poe2Database) {
  return await db.query.itemClasses.findMany({
    where: (classes, { notLike }) => notLike(classes.id, '%donotuse%'),
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
    // with: {
    //   baseItemTypes: true,
    // },
  })
}
export async function findItemClassesByCategory(db: Poe2Database, categoryIdx: number) {
  return await db.query.itemClasses.findMany({
    where: (classes, { eq }) => eq(classes.itemClassCategory, categoryIdx),
  })
}
