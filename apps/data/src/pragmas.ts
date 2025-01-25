import { SqliteRemoteDatabase } from "drizzle-orm/sqlite-proxy"

export type JournalMode = 'DELETE' | 'TRUNCATE' | 'PERSIST' | 'MEMORY' | 'WAL' | 'OFF'
export type SynchronousMode = 'OFF' | 'NORMAL' | 'FULL' | 'EXTRA'
export type TempStore = 'DEFAULT' | 'FILE' | 'MEMORY'
export type Encoding = 'UTF-8' | 'UTF-16' | 'UTF-16le' | 'UTF-16be'
export type LockingMode = 'NORMAL' | 'EXCLUSIVE'

export type PragmaTypes = {
  user_version: number
  journal_mode: JournalMode
  synchronous: SynchronousMode
  foreign_keys: boolean
  threads: number
  temp_store: TempStore
  encoding: Encoding
  cache_size: number
  page_size: number
  locking_mode: LockingMode
}

export async function getPragma<DB extends SqliteRemoteDatabase<any>, K extends keyof PragmaTypes>(db: DB, pragma: K) {
  return db.get<[PragmaTypes[K]]>(`PRAGMA ${pragma}`).then((res) => res?.[0])
}

export function setPragma<DB extends SqliteRemoteDatabase<any>, K extends keyof PragmaTypes, R = PragmaTypes[K]>(db: DB, pragma: K, value: R) {
  return db.run(`PRAGMA ${pragma} = ${value}`)
}

export const PRAGMA = {
  user_version: {
    get: () => 'PRAGMA user_version' as const,
    set: (value: number) => `PRAGMA user_version = ${value}` as const,
    defaultValue: 0 as const,
  },
  journal_mode: {
    get: () => 'PRAGMA journal_mode' as const,
    set: ((mode: JournalMode = 'WAL') => `PRAGMA journal_mode = ${mode}`) as {
      (mode: 'WAL'): `PRAGMA journal_mode = WAL`
      (mode: 'DELETE'): `PRAGMA journal_mode = DELETE`
      (mode: 'TRUNCATE'): `PRAGMA journal_mode = TRUNCATE`
      (mode: 'PERSIST'): `PRAGMA journal_mode = PERSIST`
      (mode: 'MEMORY'): `PRAGMA journal_mode = MEMORY`
      (mode: 'OFF'): `PRAGMA journal_mode = OFF`
    },
    defaultValue: 'WAL' as const,
  } as const,
  synchronous: {
    get: () => 'PRAGMA synchronous' as const,
    set: ((mode: SynchronousMode = 'NORMAL') => `PRAGMA synchronous = ${mode}`) as {
      (mode: 'NORMAL'): `PRAGMA synchronous = NORMAL`
      (mode: 'OFF'): `PRAGMA synchronous = OFF`
      (mode: 'FULL'): `PRAGMA synchronous = FULL`
      (mode: 'EXTRA'): `PRAGMA synchronous = EXTRA`
    },
    defaultValue: 'NORMAL' as const,
  } as const,
  foreign_keys: {
    get: () => 'PRAGMA foreign_keys' as const,
    set: ((enabled: boolean) =>
      enabled ? ('PRAGMA foreign_keys = ON' as const) : ('PRAGMA foreign_keys = OFF' as const)) as {
      (enabled: true): 'PRAGMA foreign_keys = ON'
      (enabled: false): 'PRAGMA foreign_keys = OFF'
    },
    defaultValue: true as const,
  } as const,
  threads: {
    get: () => 'PRAGMA threads' as const,
    set: (count: number = 4) => `PRAGMA threads = ${count}` as const,
    defaultValue: 4 as const,
  } as const,
  temp_store: {
    get: () => 'PRAGMA temp_store' as const,
    set: (store: TempStore = 'MEMORY') => `PRAGMA temp_store = ${store}` as const,
    defaultValue: 'MEMORY' as const,
  } as const,
  encoding: {
    get: () => 'PRAGMA encoding' as const,
    set: (encoding: Encoding = 'UTF-8') => `PRAGMA encoding = ${encoding}` as const,
    defaultValue: 'UTF-8' as const,
  } as const,
  cache_size: {
    get: () => 'PRAGMA cache_size' as const,
    set: (kb: number = -2000) => `PRAGMA cache_size = ${kb}` as const,
    defaultValue: -2000 as const,
  } as const,
  page_size: {
    get: () => 'PRAGMA page_size' as const,
    set: (bytes: number = 4096) => `PRAGMA page_size = ${bytes}` as const,
    defaultValue: 4096 as const,
  } as const,
  locking_mode: {
    get: () => 'PRAGMA locking_mode' as const,
    set: (mode: LockingMode = 'NORMAL') => `PRAGMA locking_mode = ${mode}` as const,
    defaultValue: 'NORMAL' as const,
  } as const,
} as const

