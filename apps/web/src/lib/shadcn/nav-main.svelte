<script lang="ts">
  import * as Sidebar from '$lib/shadcn/ui/sidebar/index.js'

  let {
    items,
  }: {
    items: {
      title: string
      url: string
      // this should be `Component` after lucide-svelte updates types
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon?: any
      isActive?: boolean
    }[]
  } = $props()
</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>Database</Sidebar.GroupLabel>
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {#each items as { title, isActive, icon: Icon, url }}
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
      {/each}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>
