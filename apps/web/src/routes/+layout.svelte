<script lang="ts">
  import { page } from '$app/state'
  import AppSidebar from '$lib/shadcn/app-sidebar.svelte'
  import * as Breadcrumb from '$lib/shadcn/ui/breadcrumb'
  import { Separator } from '$lib/shadcn/ui/separator'
  import * as Sidebar from '$lib/shadcn/ui/sidebar'
  import '../app.css'

  let { data, children } = $props()
  interface BreadcrumbType {
    text: string
    href: string
  }

  function getBreadcrumbs(path: string): BreadcrumbType[] {
    return path
      .split('/')
      .reverse()
      .map((token, index): BreadcrumbType => {
        return {
          text: token,
          href: './' + '../'.repeat(index),
        }
      })
      .reverse()
      .filter((it) => !!it.text)
  }

  const crumbs = $derived(getBreadcrumbs(page.url.pathname).filter((v, i, arr) => i != arr.length - 1))
</script>

<Sidebar.Provider>
  <AppSidebar items={data.categories.map((cat) => ({ title: cat, url: `/items/${cat}` }))} />
  <Sidebar.Inset>
    <header
      class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
    >
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb.Root>
          <Breadcrumb.List>
            {#each crumbs as crumb}
              <Breadcrumb.Item class="hidden md:block">
                <Breadcrumb.Link class="capitalize" href="{page.url.pathname}/{crumb.href}"
                  >{crumb.text}</Breadcrumb.Link
                >
              </Breadcrumb.Item>
              <Breadcrumb.Separator class="hidden md:block" />
            {/each}
            <Breadcrumb.Item>
              <Breadcrumb.Page class="capitalize">{page.url.pathname.split('/').at(-1)}</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <!-- <div class="grid auto-rows-min gap-4 md:grid-cols-3">
        <div class="bg-muted/50 aspect-video rounded-xl"></div>
        <div class="bg-muted/50 aspect-video rounded-xl"></div>
        <div class="bg-muted/50 aspect-video rounded-xl"></div>
      </div> -->
      <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min overflow-auto">
        {@render children()}
      </div>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
