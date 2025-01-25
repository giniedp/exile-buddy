import { DrizzleConfig } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { getPragma, PRAGMA, setPragma } from '../pragmas'
import { Poe2Database, Poe2Schema } from '../types'

export interface DatabaseOptions {
  databaseUrl: string
  version: number
  fetch: typeof fetch
  config?: DrizzleConfig<Poe2Schema>
}

export interface ConnectOptions {
  name: string
  options: DatabaseOptions
}

export interface ConnectionResult {
  db: Poe2Database
  // HINT: No need to expose features that we don't have a use case for.
  //       Less things to maintain.
  //
  // client: SQLocalDrizzle
  // getDatabaseInfo: SQLocal['getDatabaseInfo']
  /** Incase we need to handle corruption */
  // deleteDatabaseFile: SQLocal['deleteDatabaseFile']
  /** Incase user wants to export file */
  // getDatabaseFile: SQLocal['getDatabaseFile']
  // isConnected: Promise<boolean>
}

export type DatabaseBinray = File | Blob | ArrayBuffer | ReadableStream<Uint8Array>

export async function connect({
  name,
  options: { config, version, databaseUrl, fetch },
}: ConnectOptions): Promise<ConnectionResult | null> {
  // HINT: i prefer not to destructure a class instance.
  const client =
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

  const db = drizzle(client.driver, config)

  const userVersion = await getPragma(db, 'user_version')
  // TODO: the type from get is wrong here, its supposed to map the result to a single result
  // const [user_version] = await db.get<number[]>(PRAGMA.user_version.get())
  // await getPragma(db, 'user_version')

  if (databaseUrl && (userVersion !== version)) {
    console.debug(`[POEDB] Fetch new version: Current ${userVersion} -> Next ${version}`)
    const data = await fetch(databaseUrl).then((res) => res.arrayBuffer())
    await client.overwriteDatabaseFile(data)

    // TODO add a table to handle these version updates with timestamps
    await setPragma(db, 'user_version', version)
    const newVersion = await db.get<number[]>(PRAGMA.user_version.get())
    console.debug(`[POEDB] Version updated to ${newVersion}`)
  }
  // HINT: handle errors on the outside
  return { db }
}
