import { browser } from '$app/environment'
import { DatabaseOptions } from '$data/sqlocal'
import { Poe2Database, Poe2QuerFnParams, Poe2QuerFnResult, Poe2QueryFn } from '$data/types'

export interface Database {
  readonly db$: Promise<Poe2Database>
  query<Q extends Poe2QueryFn>(fn: Q, ...rest: Poe2QuerFnParams<Q>): Promise<Poe2QuerFnResult<Q>>
  //
  // readonly db: Poe2Database
  // readonly ready: Promise<boolean>
}

export function createDatabase(options: DatabaseOptions): Database {

  let db$ = createAdapter(options)
  // let db: Poe2Database = null
  // let ready = db$.then((it) => {
  //   db = it
  //   return true
  // })

  async function query<Q extends Poe2QueryFn>(fn: Q, ...rest: Poe2QuerFnParams<Q>): Promise<Poe2QuerFnResult<Q>>  {
    return db$.then((db) => fn(db, ...rest))
  }

  return {
    db$,
    query,
    // ready,
    // get db() {
    //   if (!db) {
    //     throw new Error('Database not ready')
    //   }
    //   return db
    // }
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
