import { createDatabase, Database } from '$lib/db/database2'
import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'
import { schema, relations } from '$data/generated'
import { findBaseItemTypes } from '$data/queries'
// export const prerender = true
// export const ssr = false

export const load = (async ({ fetch, params, route, url }) => {
  if (browser) {
    try {
      const db = createDatabase(
        {
          databaseUrl: '/cdn/poe2.db',
          fetch,
          version: 3,
        }
      )

      const r1 = await db.findBaseItemTypes()
      console.log(r1)
      const r2 = await db.query(findBaseItemTypes)
      console.log(r2)
    } catch (e) {}
  }

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
