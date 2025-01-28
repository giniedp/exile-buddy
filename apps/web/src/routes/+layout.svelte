<script lang="ts">
  import { page } from '$app/state'
  import * as Breadcrumb from '$lib/shadcn/ui/breadcrumb'
  import { Separator } from '$lib/shadcn/ui/separator'
  import * as Sidebar from '$lib/shadcn/ui/sidebar'
  import '../app.css'
  import AppSidebar from '$lib/shadcn/app-sidebar.svelte'
  import { ModeWatcher, toggleMode } from 'mode-watcher'
  import Sun from 'lucide-svelte/icons/sun'
  import Moon from 'lucide-svelte/icons/moon'
  import { Button } from '$lib/shadcn/ui/button/index.js'

  let { data, children } = $props()
</script>

<ModeWatcher />
<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header class="bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10">
      <Sidebar.Trigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb.Root>
        <Breadcrumb.List>
          {#each data.crumbs as crumb}
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
    <main class="flex flex-1 flex-col gap-4 p-4">
      {@render children()}
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
