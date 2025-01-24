import { getContext, setContext } from 'svelte'

export interface ContextKey<T> {
  //
}

export function contextKey<T>(key: any): ContextKey<T> {
  return key as ContextKey<T>
}

export function inject<T>(key: ContextKey<T>) {
  return getContext<T>(key)
}

export function provide<T>(key: ContextKey<T>, value: T) {
  return setContext(key, value)
}
