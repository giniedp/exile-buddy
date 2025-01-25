import { browser } from '$app/environment'
import { DatabaseOptions } from '$data/sqlocal'
import { BoundQueryFn, Poe2Database, Poe2QuerFnParams, Poe2QuerFnResult, Poe2QueryFn } from '$data/types'
import * as queries from '$data/queries'

const foo: Pick<typeof queries, 'findBaseItemTypes' | 'findBaseItemTypeById'> = queries
export type Database = ReturnType<typeof createDatabase>
export function createDatabase(options: DatabaseOptions) {

  const db$ = createAdapter(options)

  async function query<Q extends Poe2QueryFn>(fn: Q, ...rest: Poe2QuerFnParams<Q>): Promise<Poe2QuerFnResult<Q>>  {
    return db$.then((db) => fn(db, ...rest))
  }

  return {
    // db$ actually don't need to be exposed,
    query,
    ...bindCollection(db$, queries)
  }
}

async function createAdapter(options: DatabaseOptions) {
  if (browser) {
    return createBrowserAdapter(options)
  }
  return Promise.reject(new Error('Not implemented'))
}

async function createBrowserAdapter(options: DatabaseOptions) {
  return import('$data/sqlocal')
  .then(({ connect }) => {
    return connect({
      name: 'poe2.sqlite3',
      options,
    })
  }).then(({ db}) => db)
}

type QueryCollection<T> = {
  [K in keyof T]: T[K] extends Poe2QueryFn ? T[K] : never
}

type BoundQueryCollection<T> = {
  [K in keyof T]: T[K] extends Poe2QueryFn ? BoundQueryFn<T[K]> : never
}

function bindCollection<T>(db: Promise<Poe2Database>, queries: QueryCollection<T>): BoundQueryCollection<T> {
  const result: any = {}
  for (const key in queries) {
    result[key] = bind(db, queries[key] as any)
  }
  return result
}

function bind<Q extends Poe2QueryFn>(db: Promise<Poe2Database>, query: Q): BoundQueryFn<Q> {
  return (...args: any) => db.then((it) => query(it, ...args))
}
