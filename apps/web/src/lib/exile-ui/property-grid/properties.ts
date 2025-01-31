import type { Snippet } from "svelte"

export interface Property<V, T> {
  key: string
  value: V
  snippet: Snippet<[V, T]>
}

export type SnippetsFor<T> = {
  [K in keyof T]?: Snippet<[T[K], T]>
}

export function resolveProperties<T extends Object>(item: T, snippets: SnippetsFor<T>) {
  if (item == null) {
    return []
  }
  if (typeof item !== 'object') {
    throw new Error('Expected an object or array')
  }
  return Object.entries(item).map(([key, value]) => {
    return {
      key,
      value,
      snippet: snippets[key as keyof T] || null
    }
  })
}
