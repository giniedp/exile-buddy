import type { BaseItemTypes } from '$lib/data/baseitemtypes'
import type { ItemClassCategories } from '$lib/data/itemclasscategories'
import type { ItemClasses } from '$lib/data/itemclasses'
// import { getBaseItemById, getCategories } from '$lib/db'
import { ItemCategorization } from '$lib/items.svelte'
import type { LayoutLoad } from './$types'

export const load = (async ({ fetch, params, url }) => {
  const namespace = 'Metadata/Items' as const
  const baseItemType: BaseItemTypes[] = await fetch('/cdn/data/baseitemtypes.json').then((res) => res.json())
  const itemClasses: ItemClasses[] = await fetch('/cdn/data/itemclasses.json').then((res) => res.json())
  const itemClassCategories: ItemClassCategories[] = await fetch('/cdn/data/itemclasscategories.json').then((res) =>
    res.json(),
  )

  // console.log(await getBaseItemById(baseItemType[0].Id))
  // console.log(await getCategories())

  const catorgorization = new ItemCategorization(itemClasses, itemClassCategories).setCtx(namespace, baseItemType)
  const categories = catorgorization.getCategories(params.category!, url.pathname)

  return {
    categories,
  }
}) satisfies LayoutLoad
