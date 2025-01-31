import { setContext, getContext } from 'svelte'
import type { AppNavState } from './state.svelte'

const APP_NAV_STATE_KEY = 'app-nav-sidebar'
export function setState(state: AppNavState) {
  setContext(Symbol.for(APP_NAV_STATE_KEY), state)
}

export function useAppSidebar(): AppNavState {
  return getContext(Symbol.for(APP_NAV_STATE_KEY))
}
