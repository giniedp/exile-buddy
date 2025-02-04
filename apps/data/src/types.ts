import { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core"
import { relations, schema } from "./generated"

export type Poe2Schema = typeof schema & typeof relations
export type Poe2Database = BaseSQLiteDatabase<'async', unknown, Poe2Schema>

export type Poe2QueryFn = (db: Poe2Database, ...args: any) => Promise<any>
export type Poe2QuerFnParams<T extends Poe2QueryFn> = T extends (db: Poe2Database, ...args: infer P) => any ? P : never
export type Poe2QuerFnResult<T extends Poe2QueryFn> = T extends (db: Poe2Database, ...args: any) => Promise<infer R> ? R : never
export type BoundQueryFn<T extends Poe2QueryFn> = (...args: Poe2QuerFnParams<T>) => Promise<Poe2QuerFnResult<T>>

export interface ConnectionOptions {
  name: string
  databaseUrl: string
  version?: number
  fetch?: typeof fetch | null
}

export type ConnectionFactory = (options: ConnectionOptions) => Promise<Poe2Database>
