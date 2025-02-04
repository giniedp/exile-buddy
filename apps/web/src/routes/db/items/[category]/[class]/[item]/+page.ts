import { db } from '$lib/db'
import { recordIdFromSlug } from '$lib/utils'

export const load = async ({ params, fetch, parent, url }) => {
  const id = recordIdFromSlug(params.item)
  const record = await db.findBaseItemTypeById(id)
  return {
    record,
  }
}
