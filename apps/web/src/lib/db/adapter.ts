import { browser } from '$app/environment'
import { ConnectionOptions } from '$data'
import { BoundQueryFn, Poe2Database, Poe2QuerFnParams, Poe2QuerFnResult, Poe2QueryFn } from '$data/types'
import * as queries from '$data/queries'

export type Database = ReturnType<typeof connectDatabase>

export function connectDatabase(options: ConnectionOptions) {
  const db$ = createAdapter(options)
  return {
    // db$ actually don't need to be exposed,
    query: proxy(db$),
    ...bindCollection(db$, queries),
  }
}

async function createAdapter(options: ConnectionOptions) {
  if (browser) {
    return import('$data/adapter/sqlocal').then(({ connectSqlocal }) => connectSqlocal(options))
  }

  return import('$data/adapter/libsql').then(({ connectLibSql }) => connectLibSql(options))

  // here we shold have an adapter that works on the server side with the same given file
  return Promise.reject(new Error('Database ist not available on server side'))
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

function proxy(db: Promise<Poe2Database>) {
  return async <Q extends Poe2QueryFn>(fn: Q, ...rest: Poe2QuerFnParams<Q>): Promise<Poe2QuerFnResult<Q>> => {
    return db.then((db) => fn(db, ...rest))
  }
}
