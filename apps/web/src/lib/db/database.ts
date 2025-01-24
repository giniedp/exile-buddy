import { browser } from '$app/environment'
import { DatabaseOptions } from '$data/sqlocal'
import { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core'

export type Adapter<TSchema extends Record<string, unknown> = Record<string, never>> = BaseSQLiteDatabase<
  any,
  any,
  TSchema
>

type Options<
  TSchema extends Record<string, unknown> = Record<string, never>,
  TQueries extends Record<string, unknown> = Record<string, never>,
> = DatabaseOptions<TSchema> & { queries?: TQueries }

type QueryFunction<TSchema extends Record<string, unknown> = Record<string, never>> = (db: Adapter<TSchema>) => unknown

type QueriesAsMembers<
  TSchema extends Record<string, unknown> = Record<string, never>,
  TQueries extends Record<string, QueryFunction<TSchema>> = Record<string, never>,
> = {
  [K in keyof TQueries]: ReturnType<TQueries[K]> extends Promise<any>
    ? TQueries[K]
    : () => Promise<ReturnType<TQueries[K]> | null>
}

export class Database<
  TSchema extends Record<string, unknown> = Record<string, never>,
  TQueries extends Record<string, unknown> = Record<string, never>,
> {
  private db: Promise<Adapter<TSchema>>

  public constructor(options: Options<TSchema, TQueries>) {
    /** UGHHH THIS WORKS BUT I CANT GET THE TYPES TO IMPL AND I WANT THIS GENERIC INCASE WE PUT ANOTHER DB */
    for (const [key, queryFn] of Object.entries(options.queries)) {
      if (typeof queryFn == 'function') {
        ;(this as any)[key] = (...rest: unknown[]) => this.adapterFn(queryFn as any, ...rest)
      }
    }
    if (browser) {
      this.db = this.createBrowserAdapter(options)
    } else {
      this.db = Promise.reject(new Error('Not implemented'))
    }
  }

  private async createBrowserAdapter(options: Options<TSchema, TQueries>) {
    return new Promise<Adapter<TSchema>>((resolve, reject) => {
      import('$data/sqlocal')
        .then(({ connect }) => {
          return connect<TSchema>({
            name: 'poe2.sqlite3',
            options,
          })
        })
        .then(({ db }) => resolve(db))
        .catch((e) => reject(e))
    })
  }

  private adapterFn<T>(fn: (adapter: Adapter<TSchema>, ...rest: unknown[]) => T, ...rest: unknown[]) {
    return new Promise((resolve, reject) => {
      this.db.then((db) => resolve(fn(db, ...rest))).catch((e) => reject(e))
    })
  }
}
