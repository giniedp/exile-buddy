// a custom drizzle wrapper for sqlocal for drizzle which does the same thing as "sqlocal/drizzle"
// this way we avoid the import of "sqlocal/drizzle" which requires a specific tsconfig setup (module resolution and modyle type)

import { SQLocal } from 'sqlocal'

export class SQLocalDrizzle extends SQLocal {
  public driver: SQLocalDrizzle['exec'] = async (sql, param, method) => {
    return this.exec(sql, param, method)
  }

  public batchDriver: SQLocalDrizzle['execBatch'] = async (queries) => {
    return this.execBatch(queries)
  }
}
