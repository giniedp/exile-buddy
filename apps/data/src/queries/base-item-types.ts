import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core'
import { baseItemTypes } from '../generated/schema'

export function selectBaseItemTypes(db: BaseSQLiteDatabase<any, any, any>) {
  return db.select().from(baseItemTypes)
}
