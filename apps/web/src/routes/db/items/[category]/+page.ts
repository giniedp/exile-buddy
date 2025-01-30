import { db } from '$lib/db'
import { normalizeIdString } from '$lib/utils'
import type { PageLoad } from './$types'

export const load = (async ({ params, parent }) => {
  const { categories } = await parent()
  const classIdx = categories.find((cat) => normalizeIdString(cat.id) === params.category).$idx

  const items = db
    .findItemClassCategoriesByIdWithBaseItems(classIdx)
    .then((res) => res.itemClasses.flatMap((it) => it.baseItemTypes))
  return { items }
}) satisfies PageLoad
