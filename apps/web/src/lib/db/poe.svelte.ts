import { SQLocalDrizzle } from '$data/sqlocal'
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { withReplicas } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

let db

type ClientConfig = ConstructorParameters<typeof SQLocalDrizzle>[0]

const DEFAULT_CONFIG = {
  databasePath: 'poe2.sqlite3',
  onInit: (sql) => {
    return [
      sql`PRAGMA foreign_keys = ON`,
      sql`PRAGMA journal_mode = WAL`,
      sql`PRAGMA synchronous = NORMAL`,
      sql`PRAGMA threads=4`,
      sql`PRAGMA optimize=0x10002`,
    ]
  },
} satisfies ClientConfig

async function init(
  config: ClientConfig = DEFAULT_CONFIG,
  stream: File | ReadableStream = undefined,
  version?: number,
): Promise<boolean> {
  if (!(await isOpfsSupported())) {
    console.log('FALSE')
    return false
  }
  console.log('HERE')

  const { driver, overwriteDatabaseFile } = new SQLocalDrizzle(config)
  let db = drizzle(driver)
  const currentVersion = await db.run(sql`PRAGMA schema.user_version`)
  console.log(currentVersion)
  // if(stream && currentVersion < version) {

  // }
  return true
}

function isIdbSupported() {
  return 'locks' in navigator
}

async function inner() {
  if (navigator?.storage?.getDirectory) {
    console.log('NO GET DIR')
    return false
  }

  try {
    const { getFileHandle, removeEntry } = await navigator.storage.getDirectory()
    const { createSyncAccessHandle } = await getFileHandle('_CHECK', { create: true })
    const { close } = await createSyncAccessHandle()
    close()
    removeEntry('_CHECK')
  } catch {
    return false
  }
  return true
}

async function isOpfsSupported(): Promise<boolean> {
  if ('importScripts' in globalThis) {
    return await inner()
  }
  try {
    if (typeof Worker === 'undefined' || typeof Promise === 'undefined') {
      return false
    }

    const url = URL.createObjectURL(new Blob([`(${inner})().then(postMessage)`], { type: 'text/javascript' }))
    return await new Promise((resolve) => {
      const worker = new Worker(url, { type: 'module' })

      worker.onmessage = ({ data }: { data: boolean }) => {
        cleanup()
        console.log('DATA:', data)
        resolve(data)
      }

      worker.onerror = () => {
        cleanup()
        resolve(false)
      }

      function cleanup() {
        worker.terminate()
        URL.revokeObjectURL(url)
      }
    })
  } catch {
    console.log('ERROR')
    return false
  }
}
function isModuleWorkerSupport() {
  let supports = false
  try {
    new Worker('data:,', {
      // @ts-expect-error check assign
      get type() {
        supports = true
      },
    }).terminate()
  } finally {
    return supports
  }
}

export { db, init }
