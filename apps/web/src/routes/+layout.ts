import type { LayoutLoad } from './$types'
import { getBreadcrumbs } from '$lib/utils'

export const load = (async ({ route, url }) => {
  const crumbs = getBreadcrumbs(url.pathname).filter((v, i, arr) => i != arr.length - 1)

  return {
    crumbs,
  }
}) satisfies LayoutLoad
