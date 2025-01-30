import { db } from '$lib/db'
import type { PageLoad } from './$types'

export const load = (async ({ params, parent }) => {
  const { classes } = await parent()
  const classIdx = classes.find((it) => it.id.toLowerCase().replaceAll(' ', '') === params.class).$idx

  console.time('items')
  const items = db.findBaseItemTypeByClassIdx(classIdx)
  console.timeEnd('items')
  return { items }
}) satisfies PageLoad
