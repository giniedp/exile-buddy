import type { BaseItemTypes } from '$lib/data/baseitemtypes.js'

export const load = async ({ params, fetch, parent, url }) => {
  const baseItemTypes: BaseItemTypes[] = await fetch('/cdn/data/baseitemtypes.json').then((res) => res.json())

  const items = baseItemTypes.filter((it) => it.InheritsFrom.toLowerCase().includes(url.pathname))

  return {
    items,
  }
}
