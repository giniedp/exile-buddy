import { entityKind } from './entity'
import { type run } from '@subframe7536/sqlite-wasm'
import { DefaultLogger } from './logger.js'
import { createTableRelationsHelpers, extractTablesRelationalConfig } from 'drizzle-orm/relations'
import { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core'
import { SQLiteAsyncDialect } from 'drizzle-orm/sqlite-core'
import { SQLiteWasmSession } from '$lib/db/session'
import type { SQLiteWasmConfig } from './driver'

export type ResultSet = Awaited<ReturnType<typeof run>>
export type SQLiteCompatibleType = ResultSet[number][string]

export declare class SQLiteWasmDatabase<
  TSchema extends Record<string, unknown> = Record<string, never>,
> extends BaseSQLiteDatabase<'async', ResultSet, TSchema> {
  static readonly [entityKind] = 'SQLiteWasmDatabase'
}

export function construct(config: SQLiteWasmConfig, drizzleConfig: any = {}) {
  const dialect = new SQLiteAsyncDialect({ casing: drizzleConfig.casing })

  let logger
  if (drizzleConfig.logger === true) {
    logger = new DefaultLogger()
  } else if (drizzleConfig.logger !== false) {
    logger = drizzleConfig.logger
  }

  let schema
  if (drizzleConfig.schema) {
    const tablesConfig = extractTablesRelationalConfig(drizzleConfig.schema, createTableRelationsHelpers)
    schema = {
      fullSchema: drizzleConfig.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap,
    }
  }

  // Create a worker for SQLite WASM
  const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })

  const session = new SQLiteWasmSession(worker, dialect, schema, config, { logger }, void 0)

  const db = new SQLiteWasmDatabase('async', dialect, session, schema)
  return db
}
