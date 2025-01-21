import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
  const namespace = 'Metadata/Items/'
  const prefix = getPrefix(namespace, params.path)
  const id = getId(namespace, params.path)
  const list: BaseItemType[] = await fetch('/cdn/data/baseitemtypes.json').then((res) => res.json())

  const items = list.filter((it) => it.Id.toLowerCase().startsWith(prefix))

  const item = list.find((it) => it.Id.toLowerCase() === id)
  const categories = getCategories(items, prefix)

  return {
    categories,
    items,
    item,
    id,
  }
}

interface BaseItemType {
  $index: number
  Id: string
}

function getPrefix(namespace: string, path: string): string {
  return (getId(namespace, path) + '/').replaceAll(/\/+/gi, '/')
}

function getId(namespace: string, path: string): string {
  path = path.replace(/\/$/, '')
  return `${namespace}${path}`.toLowerCase()
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
