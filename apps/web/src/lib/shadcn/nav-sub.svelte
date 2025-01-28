<script lang="ts" module>
</script>

<script lang="ts">
  import * as Sidebar from '$lib/shadcn/ui/sidebar'
  import * as Collapsible from '$lib/shadcn/ui/collapsible'
  import { ChevronRight } from 'lucide-svelte'
  import { page } from '$app/state'

  let {
    label,
    items,
  }: {
    label?: string
    items: {
      title: string
      url: string
      // this should be `Component` after lucide-svelte updates types
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon?: any
      isActive?: boolean
      items?: {
        title: string
        url: string
        icon?: any
        isActive?: boolean
      }[]
    }[]
  } = $props()

  $effect(() => {
    page.params.category
  })
</script>

<Sidebar.Group>
  {#if label}
    <Sidebar.GroupLabel>{label}</Sidebar.GroupLabel>
  {/if}
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {@render recurse(items)}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>

{#snippet recurse(ele: typeof items)}
  {#each ele as { title, isActive, icon: Icon, url, items: subItems } (url)}
    {#if subItems?.length}
      <Collapsible.Root open={isActive} class={'group/collapsible'}>
        {#snippet child({ props })}
          <Sidebar.MenuItem {...props} class="group-data-[collapsible=icon]:[&_li]:!-ml-4">
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuButton {...props}>
                  {#snippet tooltipContent()}
                    {title}
                  {/snippet}
                  {#if Icon}
                    <Icon />
                  {/if}
                  <span>{title}</span>
                  <ChevronRight
                    class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </Sidebar.MenuButton>
              {/snippet}
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div class="ml-4">
                {@render recurse(subItems)}
              </div>
            </Collapsible.Content>
          </Sidebar.MenuItem>
        {/snippet}
      </Collapsible.Root>
    {:else}
      <Sidebar.MenuItem>
        <Sidebar.MenuButton {isActive}>
          {#snippet tooltipContent()}
            {title}
          {/snippet}
          {#snippet child({ props })}
            <a href={url} class="flex gap-2 place-items-center" {...props}>
              {#if Icon}
                <Icon />
              {/if}
              {title}
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    {/if}
  {/each}
{/snippet}
