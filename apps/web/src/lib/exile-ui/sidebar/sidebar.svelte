<script lang="ts" module>
  const navState = new AppNavState()
</script>

<script lang="ts">
  import * as Breadcrumb from '$lib/shadcn/ui/breadcrumb'
  import { Separator } from '$lib/shadcn/ui/separator'
  import * as Sidebar from '$lib/shadcn/ui/sidebar'
  import AppSidebar from '$ui/sidebar/app-sidebar.svelte'
  import Sun from 'lucide-svelte/icons/sun'
  import Moon from 'lucide-svelte/icons/moon'
  import { Button } from '$lib/shadcn/ui/button/index.js'
  import { page } from '$app/state'
  import type { Snippet } from 'svelte'
  import { toggleMode } from 'mode-watcher'
  import { setState } from './context.svelte'
  import { AppNavState } from './state.svelte'
  setState(navState)
  type Props = {
    crumbs: { text: string; href: string }[]
    children: Snippet
  }

  let { crumbs, children }: Props = $props()
</script>

<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset class="relative flex flex-col">
    <header class="bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Sidebar.Trigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb.Root>
        <Breadcrumb.List>
          {#each crumbs as crumb}
            <Breadcrumb.Item class="hidden md:block">
              <Breadcrumb.Link class="capitalize" href="{page.url.pathname}/{crumb.href}">{crumb.text}</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator class="hidden md:block" />
          {/each}
          <Breadcrumb.Item>
            <Breadcrumb.Page class="capitalize">{page.url.pathname.split('/').at(-1)}</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <div class="ml-auto flex">
        <Button onclick={toggleMode} variant="outline" size="icon">
          <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
    <main class="p-4 h-[calc(100dvh-calc(var(--spacing)*16))] overflow-auto">
      {@render children()}
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
