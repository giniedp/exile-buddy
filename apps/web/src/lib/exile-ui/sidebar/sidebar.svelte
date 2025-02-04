<script lang="ts" module>
  const navState = new AppNavState()
</script>

<script lang="ts">
  import * as Breadcrumb from '$lib/shadcn/ui/breadcrumb'
  import { Separator } from '$lib/shadcn/ui/separator'
  import * as Sidebar from '$lib/shadcn/ui/sidebar'
  import AppSidebar from '$ui/sidebar/app-sidebar.svelte'
  import { Button } from '$lib/shadcn/ui/button/index.js'
  import { page } from '$app/state'
  import type { Snippet } from 'svelte'
  import { setState } from './context.svelte'
  import { AppNavState } from './state.svelte'
  import { toggleOpen } from '$lib/widgets/command/command.svelte'
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
    <header class="border-base-100 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
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
        <!-- <Button onclick={toggleMode} variant="outline" size="icon">
          <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button> -->
        <Button
          onclick={toggleOpen}
          class="relative inline-flex h-9 w-full items-center justify-start gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          <span>Search ...</span>
          <kbd
            class="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
          >
            <span class="text-xs">⌘</span>
            /</kbd
          >
        </Button>
      </div>
    </header>
    <main class="h-[calc(100dvh-calc(var(--spacing)*16))] overflow-auto">
      {@render children()}
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
