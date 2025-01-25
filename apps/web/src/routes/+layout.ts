import { db } from '$lib/db'
import type { LayoutLoad } from './$types'

export const load = (async ({ params, route, url }) => {
  const version = await db.version().catch(console.error)
  const items = await db.findBaseItemTypes().catch(console.error)
  console.log({ version, items })
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
