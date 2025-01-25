import { drizzle } from 'drizzle-orm/libsql'
import { ConnectionOptions, Poe2Database, Poe2Schema } from '../types'
import { poe2schema } from '../constants'

export async function connectLibSql(options: ConnectionOptions): Promise<Poe2Database>  {
  return drizzle<Poe2Schema>({
    schema: poe2schema,
    connection: {
      url: options.databaseUrl
    }
  })
}
