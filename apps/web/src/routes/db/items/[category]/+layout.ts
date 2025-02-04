import { db } from '$lib/db'
import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load = (async ({ params, parent }) => {
  const { categories } = await parent()
  const category = categories.find((cat) => cat.href.endsWith(params.category))

  if (!category) return error(404)

  const classes = await db.findItemClassesByCategory(category.$idx)

  const classIdx = classes.find(
    (it) => it.id.toLowerCase().replaceAll(' ', '') === (params.class ?? params.category),
  )?.$idx

  // console.time('items')
  const items = classIdx && (await db.findBaseItemTypeByClassIdx(classIdx))
  // console.timeEnd('items')
  return { classes, items, id: params.item }
}) satisfies LayoutLoad
