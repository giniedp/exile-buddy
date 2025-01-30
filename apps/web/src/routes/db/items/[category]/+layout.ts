import { db } from '$lib/db'
import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load = (async ({ params, parent }) => {
  const { categories } = await parent()
  const category = categories.find((cat) => cat.href.endsWith(params.category))

  if (!category) return error(404)

  const classes = await db.findItemClassesByCategory(category.$idx)
  return { classes }
}) satisfies LayoutLoad
