import { Poe2Database } from '../types'

export async function findItemClassCategories(db: Poe2Database) {
  return await db.query.itemClassCategories.findMany({
    with: {
      itemClasses: true,
    },
  })
}

export async function findItemClassCategoriesById(db: Poe2Database, id: string) {
  return await db.query.itemClassCategories.findFirst({
    where: (categories, { eq, and, notLike }) => and(eq(categories.id, id), notLike(categories.id, '%donotuse%')),
    with: {
      itemClasses: true,
    },
  })
}

export async function findItemClassCategoriesByIdWithBaseItems(db: Poe2Database, id: string) {
  return await db.query.itemClassCategories.findFirst({
    where: (categories, { eq, and, notLike }) => and(eq(categories.id, id), notLike(categories.id, '%donotuse%')),
    with: {
      itemClasses: {
        with: {
          baseItemTypes: true,
        },
      },
    },
  })
}
