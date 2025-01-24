import { Database } from '$lib/db'
import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'
import { schema, relations } from '$data/generated'
import * as queries from '$data/queries'

// export const prerender = true
// export const ssr = false

export const load = (async ({ fetch, params, route, url }) => {
  if (browser) {
    try {
      const db = new Database({
        databaseUrl: '/cdn/poe2.db',
        fetch,
        version: 3,
        config: { schema: { ...schema, ...relations } },
        queries,
      })

      //@ts-expect-error
      const res = await db.queryAllBaseItemTypes()
      console.log(res)
    } catch (e) {}
  }
  // const items = await db.baseItemTypes()
  // console.log('items', items?.length)

  const crumbs = getBreadcrumbs(url.pathname).filter((v, i, arr) => i != arr.length - 1)

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
