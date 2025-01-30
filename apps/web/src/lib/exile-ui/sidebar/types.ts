import type { Component } from 'svelte'

export type NavItem = {
  title: string
  href: string
  icon?: Component
  items?: NavItem[]
  isActive?: boolean
  data?: any
}

export type RouteInfo = {
  name: string
  logo?: Component
  href: string
  navigation?: NavItem[]
}
