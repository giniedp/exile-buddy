import { db } from '$lib/db'
import { recordIdFromSlug } from '$lib/utils'
import type { PageLoad } from './$types'

export const load = (async ({ params }) => {
  const id = recordIdFromSlug(params.id)
  const record = await db.findNpcById(id)
  return {
    record,
  }
}) satisfies PageLoad
