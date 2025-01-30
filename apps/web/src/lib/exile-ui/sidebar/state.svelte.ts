import { page } from '$app/state'
import type { Component } from 'svelte'
import { AudioWaveform, GalleryVerticalEnd, ListTodo, ListTree } from 'lucide-svelte'
import type { NavItem, RouteInfo } from './types'

export type NavigationBuilder = {
  title: string
  path: string
  icon?: Component
  data?: any
}
export type RouteInfoBuilder = {
  name: string
  logo: Component
  path: string
  navigation?: NavigationBuilder[]
}

class RouteInfoState implements RouteInfo {
  public navigation? = $state<NavItem[]>([])
  constructor(
    public name: string,
    public href: string,
    public logo?: Component,
    navigation?: NavItem[],
  ) {
    this.navigation = navigation ?? []

    // $effect(() => {
    //   console.log('here')
    // })
  }
}

export function createRouteInfo(builder: RouteInfoBuilder, parent: string = ''): RouteInfo {
  const href = buildFullPath(parent, builder.path)

  return new RouteInfoState(
    builder.name,
    href,
    builder.logo,
    builder.navigation && buildNavItems(builder.navigation, href),
  )
  return {
    name: builder.name,
    logo: builder.logo,
    href,
    ...(builder.navigation && { navigation: buildNavItems(builder.navigation, href) }),
  }
}

function normalizePath(path: string): string {
  path = path.replace(/^\/+|\/+$/g, '')
  return path
}

function buildFullPath(parent: string, path: string): string {
  const normalizedParent = normalizePath(parent)
  const normalizedPath = normalizePath(path)
  return `/${[normalizedParent, normalizedPath].filter(Boolean).join('/')}`
}

function buildNavItems(items: NavigationBuilder[], parent: string): NavItem[] {
  return items.map((item) => {
    const fullPath = buildFullPath(parent, item.path)

    const navItem: NavItem = {
      title: item.title,
      href: fullPath,
      icon: item.icon,
      // isActive: page.url.pathname.startsWith(fullPath),
      ...(item.data && { data: item.data }),
    }

    if (item.data) console.log(item.data)

    return navItem
  })
}

const databaseRouteInfo = createRouteInfo({
  name: 'Database',
  path: 'db',
  logo: GalleryVerticalEnd as unknown as Component,
  navigation: [
    {
      title: 'Items',
      path: 'items',
      icon: ListTodo as unknown as Component,
      data: 'categories',
    },
    {
      title: 'Skills',
      path: 'skills',
      icon: ListTree as unknown as Component,
    },
  ],
}) satisfies RouteInfo

const buildsRouteInfo = createRouteInfo({
  name: 'Builds',
  path: 'builds',
  logo: AudioWaveform as unknown as Component,
}) satisfies RouteInfo

export class AppNavState {
  private routes = $state<RouteInfo[]>([databaseRouteInfo, buildsRouteInfo])

  getRouteNavigation(href: string): RouteInfo {
    const info = this.routes.find((route) => href.startsWith(route.href))

    $effect.pre(() => {
      if (!info?.navigation) return
      for (const nav of info.navigation) {
        if (!page.url.pathname.startsWith(nav.href) || !nav.data) continue
        nav.items = page.data[nav.data]
      }
    })
    return info
  }

  getRootRoutes() {
    return this.routes.map(({ name, logo, href }) => ({ name, logo, href }))
  }
}
