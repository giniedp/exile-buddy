import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch, url }) => {
  const namespace = 'Metadata/Items'
  const prefix = getPrefix(namespace, params.path)
  const id = getId(namespace, params.path)
  const list: BaseItemType[] = await fetch('/cdn/data/baseitemtypes.json').then((res) => res.json())

  console.log({ prefix, id})
  const items = list.filter((it) => it.Id.toLowerCase().startsWith(prefix))
  const item = list.find((it) => it.Id.toLowerCase() === id)
  const categories = getCategories(items, prefix)
  const crumbs = getBreadcrumbs(params.path)
  console.log(item)
  return {
    pathname: url.pathname.replace(/\/$/, ''),
    categories,
    crumbs,
    item,
    id
  }
}

interface BaseItemType {
  $index: number
  Id: string
}

function getPrefix(namespace: string, path: string): string {
  return (getId(namespace, path)  + '/').replaceAll(/\/+/gi, '/')
}

function getId(namespace: string, path: string): string {
  path = path.replace(/\/$/, '')
  return `${namespace}/${path}`.toLowerCase()
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

interface Breadcrumb {
  text: string
  href: string
}

function getBreadcrumbs(path: string): Breadcrumb[] {
  return path
    .split('/')
    .reverse()
    .map((token, index): Breadcrumb => {
      return {
        text: token,
        href: './' + '../'.repeat(index),
      }
    })
    .reverse()
    .filter((it) => !!it.text)
}
