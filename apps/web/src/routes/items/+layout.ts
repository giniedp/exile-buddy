import { db } from '$lib/db'
import type { LayoutLoad } from './$types'

export const load = (async ({ params, url }) => {
  const categories = await db.findItemClassCategories().then((it) =>
    it.map((cat) => ({
      $idx: cat.$idx,
      id: cat.id,
      title: cat.text ?? cat.id,
      url: `/items/${cat.id.toLowerCase().replaceAll(' ', '')}`,
      isActive: params.category && params.category == `/items/${cat.id.toLowerCase().replaceAll(' ', '')}`,
    })),
  )

  return {
    categories,
  }
}) satisfies LayoutLoad
