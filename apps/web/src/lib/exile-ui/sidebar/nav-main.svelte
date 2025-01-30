<script lang="ts">
  import * as Sidebar from '$lib/shadcn/ui/sidebar/index.js'
  import type { NavItem } from './types'

  let {
    items,
  }: {
    items: NavItem[]
  } = $props()
</script>

<Sidebar.Group>
  <!-- <Sidebar.GroupLabel>Database</Sidebar.GroupLabel> -->
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {#each items as { title, isActive, icon: Icon, href }}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton {isActive}>
            {#snippet tooltipContent()}
              {title}
            {/snippet}
            {#snippet child({ props })}
              <a {href} class="flex gap-2 place-items-center" {...props}>
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
