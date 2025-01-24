import { DrizzleConfig } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { SQLocalDrizzle } from './sqlocal-drizzle'

export interface ConnectOptions {
  name: string
  data: DatabaseBinray | Promise<DatabaseBinray>
  drizzle?: DrizzleConfig
}

export interface ConnectionResult {
  db: ReturnType<typeof drizzle>
  isConnected: Promise<boolean>
}

export type DatabaseBinray = File | Blob | ArrayBuffer | ReadableStream<Uint8Array>

export async function connect(options: ConnectOptions): Promise<ReturnType<typeof drizzle> | null> {
  const sqLocal = new SQLocalDrizzle({
    databasePath: options.name,
    onInit: (sql) => {
      return [
        sql`PRAGMA foreign_keys = ON`,
        sql`PRAGMA journal_mode = WAL`,
        sql`PRAGMA synchronous = NORMAL`,
        sql`PRAGMA threads=4`,
        sql`PRAGMA optimize=0x10002`,
      ]
    },
  })
  const db = drizzle(sqLocal.driver, options.drizzle)
  return Promise.resolve(options.data)
    .then((data) => sqLocal.overwriteDatabaseFile(data))
    .then(() => db)
    .catch((err) => {
      console.error(err)
      return null
    })
}
