import { browser } from '$app/environment'
import { DatabaseOptions } from '$data/sqlocal'
import { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core'
import { Tv } from 'lucide-svelte'

export type Adapter<TSchema extends Record<string, unknown> = Record<string, never>> = BaseSQLiteDatabase<
  any,
  any,
  TSchema
>

type QueryFunction<TSchema extends Record<string, unknown> = Record<string, never>, TParam = any, TResult = any> = (
  db: Adapter<TSchema>,
  ...rest: TParam[]
) => Promise<TResult>

type QueriesAsMembers<
  TSchema extends Record<string, unknown> = Record<string, never>,
  TQueries extends Record<string, unknown> = Record<string, never>,
> = {
  [K in keyof TQueries]: () => Promise<TQueries[K] | null>
}

export class Database<
  TSchema extends Record<string, unknown> = Record<string, never>,
  TQueries extends Record<string, QueryFunction<TSchema>> = Record<string, never>,
> {
  private db: Promise<Adapter<TSchema>>

  public constructor(
    options: DatabaseOptions<TSchema>,
    private queries?: TQueries,
  ) {
    /** UGHHH THIS WORKS BUT I CANT GET THE TYPES TO IMPL AND I WANT THIS GENERIC INCASE WE PUT ANOTHER DB */
    for (const [key, queryFn] of Object.entries(queries)) {
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

  public async with(query: keyof TQueries): Promise<ReturnType<TQueries[typeof query]>> {
    //TODO figure out type
    return this.adapterFn(this.queries[query])
  }
  private async createBrowserAdapter(options: DatabaseOptions<TSchema>) {
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

  private adapterFn<TQueryName extends keyof TQueries, T>(
    fn: (adapter: Adapter<TSchema>, ...rest: T[]) => ReturnType<TQueries[TQueryName]>,
    ...rest: any[]
  ) {
    return new Promise<ReturnType<TQueries[TQueryName]>>((resolve, reject) => {
      this.db
        .then((db) => fn(db, ...rest))
        .then((res) => resolve(res))
        .catch((e) => reject(e))
    })
  }
}
