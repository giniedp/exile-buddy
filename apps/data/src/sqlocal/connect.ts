import { DrizzleConfig } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { SQLocalDrizzle } from 'sqlocal/drizzle'
import type { SQLocal } from 'sqlocal'
import { PRAGMA } from '../pragmas'

export type DrizzleClient<TSchema extends Record<string, unknown> = Record<string, unknown>> = ReturnType<
  typeof drizzle<TSchema>
>

export interface DatabaseOptions<TSchema extends Record<string, unknown> = Record<string, unknown>> {
  databaseUrl: string
  version: number
  fetch: typeof fetch
  config?: DrizzleConfig<TSchema>
}

export interface ConnectOptions<TSchema extends Record<string, unknown> = Record<string, unknown>> {
  name: string
  options: DatabaseOptions<TSchema>
}

export interface ConnectionResult<TSchema extends Record<string, unknown> = Record<string, unknown>> {
  db: DrizzleClient<TSchema>
  getDatabaseInfo: SQLocal['getDatabaseInfo']
  /** Incase we need to handle corruption */
  deleteDatabaseFile: SQLocal['deleteDatabaseFile']
  /** Incase user wants to export file */
  getDatabaseFile: SQLocal['getDatabaseFile']
  // isConnected: Promise<boolean>
}

export type DatabaseBinray = File | Blob | ArrayBuffer | ReadableStream<Uint8Array>

export async function connect<TSchema extends Record<string, unknown> = Record<string, unknown>>({
  name,
  options: { config, version, databaseUrl, fetch },
}: ConnectOptions<TSchema>): Promise<ConnectionResult<TSchema> | null> {
  const { driver, overwriteDatabaseFile, getDatabaseInfo, sql, getDatabaseFile, deleteDatabaseFile } =
    new SQLocalDrizzle({
      databasePath: name,
      onInit: (sql) => {
        return [
          sql`PRAGMA foreign_keys = ON`,
          sql`PRAGMA journal_mode = WAL`,
          sql`PRAGMA synchronous = NORMAL`,
          sql`PRAGMA threads = 4`,
          sql`PRAGMA optimize = 0x10002`,
          // TODO create if not exists some sort of table for version checking etc
        ]
      },
    })

  try {
    const db = drizzle(driver, config)
    console.log(db)

    // TODO: the type from get is wrong here, its supposed to map the result to a single result
    const [user_version] = await db.get<number[]>(PRAGMA.user_version.get())

    if (databaseUrl && user_version < version) {
      const data = await fetch(databaseUrl).then((res) => res.arrayBuffer())
      console.log('POE DB Version Mismatch: Current %d -> New %d', user_version, version)

      /** Can use later for some sort of fallback if overwrite or version error */
      // const file = await getDatabaseFile()

      await overwriteDatabaseFile(data)

      // TODO add a table to handle these version updates with timestamps
      await db.run(PRAGMA.user_version.set(version))
      const [new_version] = await db.get<number[]>(PRAGMA.user_version.get())

      console.log('POE DB Version Updated -> %d', new_version)
    }
    return { db, deleteDatabaseFile, getDatabaseInfo, getDatabaseFile }
  } catch (e) {
    console.log(e)
    return null
  }
}
