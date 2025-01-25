import { getPragma } from '../pragmas'
import { Poe2Database } from '../types'

export async function version(db: Poe2Database) {
  return getPragma(db, 'user_version')
}

export async function threads(db: Poe2Database) {
  return getPragma(db, 'threads')
}
