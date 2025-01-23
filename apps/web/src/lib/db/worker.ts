import { initSQLite, isOpfsSupported, withExistDB } from '@subframe7536/sqlite-wasm'
import { useOpfsStorage } from '@subframe7536/sqlite-wasm/opfs'
import type { WorkerMessage } from './session'

const url = 'https://cdn.jsdelivr.net/npm/@subframe7536/sqlite-wasm@0.5.0/dist/wa-sqlite.wasm'
let db: Awaited<ReturnType<typeof initSQLite>> | undefined

onmessage = async (e: MessageEvent<WorkerMessage>) => {
  if (!(await isOpfsSupported())) {
    return
  }

  if (!db) {
    const poe = await fetch('/cdn/poe2.db')
      .then((res) => res.blob())
      .then((res) => res.stream())

    db = await initSQLite(useOpfsStorage('poe2.db', withExistDB(poe, { url })))
  }

  const { type, id, query, params } = e.data
  postMessage('', '/', [db.sqlite])
  let result

  switch (type) {
    case 'run': {
      result = await db.run(query, params)
      break
    }
    case 'get':
    case 'all':
    case 'values': {
    }
  }
}
