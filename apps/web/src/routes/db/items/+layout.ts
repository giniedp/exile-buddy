import { db } from '$lib/db'
import { normalizeIdString } from '$lib/utils'
import type { LayoutLoad } from './$types'

export const load = (async ({ params }) => {
  const categories = await db.findItemClassCategories().then((it) =>
    it.map((cat) => {
      return {
        $idx: cat.$idx,
        id: cat.id,
        title: cat.itemClasses.length === 1 ? cat.itemClasses[0].name : (cat.text ?? cat.id),
        href: `/db/items/${normalizeIdString(cat.id)}`,
        isActive: params.category === normalizeIdString(cat.id),
        ...(cat.itemClasses.length > 1 && {
          items: cat.itemClasses.map((it) => ({
            $idx: it.$idx,
            id: it.id,
            title: it.name,
            href: `/db/items/${normalizeIdString(cat.id)}/${normalizeIdString(it.id)}`,
            isActive: params.class === normalizeIdString(it.id),
          })),
        }),
      }
    }),
  )

  return {
    categories,
  }
}) satisfies LayoutLoad
