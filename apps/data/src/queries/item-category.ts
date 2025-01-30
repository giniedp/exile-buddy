import { Poe2Database } from '../types'

export async function findItemClassCategories(db: Poe2Database) {
  return await db.query.itemClassCategories.findMany({
    where: (categories, { notLike }) => notLike(categories.id, '%donotuse%'),
    with: {
      itemClasses: {
        columns: {
          $idx: true,
          id: true,
          name: true,
        },
      },
    },
  })
}

export async function findItemClassCategoriesById(db: Poe2Database, id: string) {
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

export async function findItemClassCategoriesByIdWithBaseItems(db: Poe2Database, idx: number) {
  return await db.query.itemClassCategories.findFirst({
    where: (categories, { eq, and, notLike }) => and(eq(categories.$idx, idx), notLike(categories.id, '%donotuse%')),
    with: {
      itemClasses: {
        with: {
          baseItemTypes: {
            with: {
              itemVisualIdentity: true,
            },
          },
        },
      },
    },
  })
}
