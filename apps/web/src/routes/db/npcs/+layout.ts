import { db } from '$lib/db'
import type { LayoutLoad } from './$types'

export const load = (async ({ params } ) => {
  return {
    items: await db.findNpcs(),
    id: params?.id
  }
}) satisfies LayoutLoad
