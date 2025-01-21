import type { LayoutLoad } from './$types'

export const load = (async ({ fetch }) => {
  const namespace = 'Metadata/Items'
  const list: BaseItemType[] = await fetch('/cdn/data/baseitemtypes.json').then((res) => res.json())
  const prefix = getPrefix(namespace, '')
  const categories = getCategories(list, prefix)
  return {
    categories,
  }
}) satisfies LayoutLoad

interface BaseItemType {
  $index: number
  Id: string
}
function getCategories(items: BaseItemType[], prefix: string): string[] {
  const result = new Set<string>()
  for (const it of items) {
    const value = it.Id.toLowerCase().replace(prefix, '').split('/')[0]
    if (value) {
      result.add(value)
    }
  }
  return Array.from(result).sort()
}
function getPrefix(namespace: string, path: string): string {
  return (getId(namespace, path) + '/').replaceAll(/\/+/gi, '/')
}
function getId(namespace: string, path: string): string {
  path = path?.replace(/\/$/, '')
  return `${namespace}/${path}`.toLowerCase()
}
