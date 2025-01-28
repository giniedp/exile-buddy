import { db } from '$lib/db'
import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load = (async ({ params, data, parent }) => {
  const { categories } = await parent()
  const category = categories.find((cat) => cat.url.endsWith(params.category))

  console.log(category)

  if (!category) return error(404)

  const classes = await db.findItemClassesByCategory(category.$idx)
  console.log(classes)
  return { classes }
}) satisfies LayoutLoad
