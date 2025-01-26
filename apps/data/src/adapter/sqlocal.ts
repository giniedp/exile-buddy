import { SQLocal } from 'sqlocal'
import { ConnectionOptions, Poe2Database, Poe2Schema } from '../types'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { getPragma, PRAGMA, setPragma } from '../pragmas'
import { poe2schema } from '../constants'

export async function connectSqlocal(options: ConnectionOptions): Promise<Poe2Database> {
  const client = new SQLocalDrizzle({
    databasePath: options.name,
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

  const db = drizzle<Poe2Schema>(client.driver, {
    schema: poe2schema,
  })

  await checkVersionAndUpdate(client, db, options)

  return db
}

async function checkVersionAndUpdate(client: SQLocalDrizzle, db: Poe2Database, options: ConnectionOptions) {
  const userVersion = await getPragma(db, 'user_version')

  const databaseUrl = options.databaseUrl
  const version = options.version
  const fetchFn = options.fetch || fetch
  if (databaseUrl && (!version || version !== userVersion)) {
    console.debug(`[POEDB] Fetch new version: Current ${userVersion} -> Next ${version}`)
    const data = await fetchFn(databaseUrl).then((res) => res.arrayBuffer())
    await client.overwriteDatabaseFile(data)

    // TODO add a table to handle these version updates with timestamps
    await setPragma(db, 'user_version', version)
    const newVersion = await db.get<number[]>(PRAGMA.user_version.get())
    console.debug(`[POEDB] Version updated to ${newVersion}`)
  }
}

export class SQLocalDrizzle extends SQLocal {
  public driver: SQLocalDrizzle['exec'] = async (sql, param, method) => {
    return this.exec(sql, param, method)
  }

  public batchDriver: SQLocalDrizzle['execBatch'] = async (queries) => {
    return this.execBatch(queries)
  }
}
