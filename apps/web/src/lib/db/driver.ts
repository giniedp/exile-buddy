// driver.ts
import { isConfig } from 'drizzle-orm/utils'
import { construct, SQLiteWasmDatabase } from './core'
import type { InitSQLiteOptions } from '@subframe7536/sqlite-wasm'

export interface SQLiteWasmConfig {
  url?: string
  dbName?: string
}

function drizzle(...params: any[]) {
  if (typeof params[0] === 'string') {
    // Handle URL-only configuration
    return construct({ url: params[0], dbName: 'db.sqlite' }, params[1])
  }

  if (isConfig(params[0])) {
    const { connection, ...drizzleConfig } = params[0]
    if (typeof connection === 'string') {
      return construct({ url: connection, dbName: 'db.sqlite' }, drizzleConfig)
    }
    return construct(connection as SQLiteWasmConfig, drizzleConfig)
  }

  return construct(params[0], params[1])
}

// Add mock support like libSQL
// ;((drizzle: any) => {
//   function mock(config?: any) {
//     return construct({}, config)
//   }
//   drizzle.mock = mock
// })(drizzle)

export { SQLiteWasmDatabase, drizzle }
