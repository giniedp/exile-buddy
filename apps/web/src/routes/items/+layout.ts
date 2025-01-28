import { browser } from '$app/environment'
import { db } from '$lib/db'
import type { LayoutLoad } from './$types'

export const load = (async ({ params, url }) => {
  const categories = await db.findItemClassCategories()
  const items = await db.findBaseItemTypes()

  if (browser) console.log({ categories, items })

  return {
    categories,
  }
}) satisfies LayoutLoad
