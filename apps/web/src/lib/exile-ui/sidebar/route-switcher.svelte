<script lang="ts">
  import * as DropdownMenu from '$lib/shadcn/ui/dropdown-menu/index.js'
  import * as Sidebar from '$lib/shadcn/ui/sidebar/index.js'
  import { useSidebar } from '$lib/shadcn/ui/sidebar/index.js'
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down'
  import Plus from 'lucide-svelte/icons/plus'
  import { useAppSidebar } from './context.svelte'

  // This should be `Component` after lucide-svelte updates types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { routes }: { routes: { name: string; logo: any; href: string }[] } = $props()
  const sidebar = useSidebar()
  const appSidebar = useAppSidebar()

  const activeRoute = $derived(appSidebar.getRouteNavigation())
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            {...props}
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div
              class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
            >
              {#if activeRoute}
                <activeRoute.logo class="size-4" />
              {/if}
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {activeRoute?.name}
              </span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        align="start"
        side={sidebar.isMobile ? 'bottom' : 'right'}
        sideOffset={4}
      >
        <!-- <DropdownMenu.Label class="text-muted-foreground text-xs">Routes</DropdownMenu.Label> -->
        {#each routes as route, index (route.name)}
          <a href={route.href}>
            <DropdownMenu.Item class="gap-2 p-2">
              <div class="flex size-6 items-center justify-center rounded-sm border border-base-100">
                <route.logo class="size-4 shrink-0" />
              </div>
              {route.name}
              <DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </a>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
