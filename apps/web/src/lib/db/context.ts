import { contextKey, inject, provide } from '$lib/context'
import { Database } from './database'

export interface DbConfig {
  databaseUrl: string
}

const CTX_KEY_DATABASE = contextKey<Database>('CTX_KEY_DB_CONFIG')

export function injectDatabase() {
  return inject(CTX_KEY_DATABASE)
}

export function provideDatabase(db: Database) {
  return provide(CTX_KEY_DATABASE, db)
}
