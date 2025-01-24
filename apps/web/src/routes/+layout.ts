import { Database } from '$lib/db'
import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'

export const prerender = true
export const ssr = false

export const load = (async ({ fetch, params, route, url }) => {
  const db = new Database({
    databaseUrl: '/cdn/poe2.db',
    fetch,
  })
  const items = await db.baseItemTypes()
  console.log('items', items?.length)

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
