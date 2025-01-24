import { browser } from '$app/environment'
import { selectBaseItemTypes } from '$data/queries'
import { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core'

export type Adapter = BaseSQLiteDatabase<any, any, any>
export interface DatabaseOptions {
  databaseUrl: string
  fetch: typeof fetch
}

export class Database {
  private db: Promise<Adapter>

  public constructor(options: { databaseUrl: string; fetch: typeof fetch }) {
    if (browser) {
      this.createBrowserAdapter(options)
    } else {
      this.db = Promise.reject(new Error('Not implemented'))
    }
  }

  private createBrowserAdapter(options: DatabaseOptions) {
    this.db = import('$data/sqlocal').then(({ connect }) => {
      return connect({
        name: 'poe2.sqlite3',
        data: options.fetch(options.databaseUrl).then((res) => res.arrayBuffer()),
      })
    })
  }

  public baseItemTypes = this.adapterFn(selectBaseItemTypes)

  private adapterFn<T>(fn: (adapter: Adapter) => T) {
    return async () => {
      return this.db.then((db) => fn(db)).catch((err) => {
        console.error(err)
        return null
      })
    }
  }
}
