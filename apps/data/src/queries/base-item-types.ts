import { sql } from 'drizzle-orm'
import { Poe2Database } from '../types'

export async function findBaseItemTypes(db: Poe2Database) {
  return await db.query.baseItemTypes.findMany({
    with: {},
  })
}

export async function findBaseItemTypeById(db: Poe2Database, id: string) {
  return await db.query.baseItemTypes.findFirst({
    where: (items, { eq }) => eq(items.id, id),
    columns: {
      itemVisualIdentity: false,
      itemClass: false,
    },
    with: {
      itemClass: {
        with: {
          itemClassCategory: true,
        },
      },
      itemVisualIdentity: true,
    },
  })
}

export async function findBaseItemTypeByClassIdx(db: Poe2Database, classIdx: number) {
  return await db.query.baseItemTypes.findMany({
    where: (items, { eq }) => eq(items.itemClass, classIdx),
    columns: {
      itemVisualIdentity: false,
      itemClass: false,
    },
    with: {
      itemClass: {
        with: {
          itemClassCategory: true,
        },
      },
      itemVisualIdentity: true,
    },
  })
}
export async function searchBaseItemTypes(db: Poe2Database, search: string) {
  return await db.query.baseItemTypes.findMany({
    limit: 10,
    where: (items, { like }) => like(items.name, sql`'%' || ${search} || '%'`),
    columns: {
      itemClass: false,
    },
    with: {
      itemClass: {
        with: {
          itemClassCategory: true,
        },
      },
    },
  })
}
