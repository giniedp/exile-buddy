import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'
import { isOpfsSupported } from '@subframe7536/sqlite-wasm'

export const load = (async ({ fetch, params, route, url }) => {
  const crumbs = getBreadcrumbs(url.pathname).filter((v, i, arr) => i != arr.length - 1)
  const dbFile = (await (await fetch('/cdn/poe2.db')).blob()).stream()

  // TODO rewrite into db/state and initialize in init hook
  if (browser) {
    if (await isOpfsSupported()) {
      const { db, overwriteDatabaseFile } = await import('$lib/db')
      await overwriteDatabaseFile(dbFile)
    } else {
      console.log('No OPFS')
    }
  }
  return {
    crumbs,
  }
}) satisfies LayoutLoad

interface BreadcrumbType {
  text: string
  href: string
}

function getBreadcrumbs(path: string): BreadcrumbType[] {
  return path
    .split('/')
    .reverse()
    .map((token, index): BreadcrumbType => {
      return {
        text: token,
        href: './' + '../'.repeat(index),
      }
    })
    .reverse()
    .filter((it) => !!it.text)
}
