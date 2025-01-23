import type { LayoutLoad } from './$types'
import * as worker from '$lib/db/index'
import { browser } from '$app/environment'
import { baseItemTypes } from '$lib/db/schema'

export const load = (async ({ fetch, params, route, url }) => {
  const crumbs = getBreadcrumbs(url.pathname).filter((v, i, arr) => i != arr.length - 1)
  const dbFile = await (await (await fetch('/cdn/poe2.db')).blob()).arrayBuffer()

  // const client = createClient({
  //   url: 'file:memory:',
  //   syncUrl: 'file:memory:',
  // })

  if (browser) {
    const db = worker.drizzle()
    const res = await db.select().from(baseItemTypes)
    console.log(db, res)
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
