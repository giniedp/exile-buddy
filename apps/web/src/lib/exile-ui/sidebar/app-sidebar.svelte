<script lang="ts" module>
  import NavMain from '$ui/sidebar/nav-main.svelte'
  import NavUser from '$ui/sidebar/nav-user.svelte'
  import NavSub from '$ui/sidebar/nav-sub.svelte'
  import RouteSwitcher from '$ui/sidebar/route-switcher.svelte'
  import * as Sidebar from '$lib/shadcn/ui/sidebar/index.js'
  import type { ComponentProps } from 'svelte'
  import { page } from '$app/state'
  import type { NavItem } from './types'
  import { useAppSidebar } from './context.svelte'
</script>

<script lang="ts">
  const navState = useAppSidebar()
  type Props = ComponentProps<typeof Sidebar.Root>

  let { ref = $bindable(null), collapsible = 'icon', ...restProps }: Props = $props()

  const routeInfo = $derived(navState.getRouteNavigation())
  const rootRoutes = $derived(navState.getRootRoutes())
  const navItems: NavItem[] = $derived(
    routeInfo?.navigation?.find((nav) => page.url.pathname.startsWith(nav.href))?.items ?? [],
  )

  let label = $state('')
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header>
    <RouteSwitcher routes={rootRoutes} />
  </Sidebar.Header>

  <Sidebar.Content
    class="group-data-[collapsible=icon]:[scrollbar-width:none] group-data-[collapsible=icon]:overflow-auto"
  >
    <NavMain items={routeInfo?.navigation ?? []} />
    <NavSub {label} items={navItems} />
  </Sidebar.Content>

  <Sidebar.Footer>
    <NavUser user={{ name: 'shadcn', email: 'm@example.com', avatar: '' }} />
  </Sidebar.Footer>

  <Sidebar.Rail />
</Sidebar.Root>
