import { db } from '$lib/db'
import type { LayoutLoad } from './$types'

export const load = (async () => {
  return {
    items: await db.findNpcs(),
  }
}) satisfies LayoutLoad
