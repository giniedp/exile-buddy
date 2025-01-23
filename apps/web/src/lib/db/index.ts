import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { drizzle } from 'drizzle-orm/sqlite-proxy'

const { driver, overwriteDatabaseFile } = new SQLocalDrizzle({
  databasePath: 'poe2.sqlite3',
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
const db = drizzle(driver)

export { overwriteDatabaseFile, db }
