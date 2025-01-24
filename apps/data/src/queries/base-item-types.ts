import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core'
import { ExtractTablesWithRelations, TablesRelationalConfig, eq } from 'drizzle-orm'
import { schema, relations } from '../generated'
type DBSchema = typeof schema & typeof relations

export async function selectBaseItemTypesById<TResultKind extends 'sync' | 'async', TRunResult>(
  db: BaseSQLiteDatabase<TResultKind, TRunResult, DBSchema>,
  id: string,
) {
  return await db.select().from(schema.baseItemTypes).where(eq(schema.baseItemTypes.id, id))
}

export async function queryAllBaseItemTypes<TResultKind extends 'sync' | 'async', TRunResult>(
  db: BaseSQLiteDatabase<TResultKind, TRunResult, DBSchema>,
) {
  return await db.query.baseItemTypes.findMany({})
}

export async function queryBaseItemTypesById<TResultKind extends 'sync' | 'async', TRunResult>(
  db: BaseSQLiteDatabase<TResultKind, TRunResult, DBSchema>,
  id: string,
) {
  return await db.query.baseItemTypes.findFirst({
    where: (items, { eq }) => eq(items.id, id),
    with: {
      armourTypes: true,
      attributeRequirements: true,
      uncutGemAdditionalTiers: true,
      delveCraftingModifiers: true,
      itemClass: {
        with: {
          itemClassCategory: true,
        },
      },
      itemVisualIdentity: true,
      itemInherentSkills: true,
    },
  })
}
