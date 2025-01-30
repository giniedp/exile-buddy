<script lang="ts">
  import * as Sidebar from '$lib/shadcn/ui/sidebar'
  import * as Collapsible from '$lib/shadcn/ui/collapsible'
  import { ChevronRight } from 'lucide-svelte'
  import type { NavItem } from './types'

  let {
    label,
    items,
  }: {
    label?: string
    items: NavItem[]
  } = $props()
</script>

<Sidebar.Group>
  {#if label}
    <Sidebar.GroupLabel>{label}</Sidebar.GroupLabel>
  {/if}
  <Sidebar.Menu>
    {#each items as mainItem (mainItem.href)}
      <Collapsible.Root open={mainItem.isActive} class="group/collapsible">
        {#snippet child({ props })}
          <Sidebar.MenuItem {...props}>
            {#if !mainItem.items?.length}
              <a href={mainItem.href}>
                <Sidebar.MenuButton {...props} bind:isActive={mainItem.isActive}>
                  {#snippet tooltipContent()}
                    {mainItem.title}
                  {/snippet}
                  {#if mainItem.icon}
                    <mainItem.icon />
                  {/if}

                  <span>{mainItem.title}</span>
                </Sidebar.MenuButton>
              </a>
            {:else}
              <Collapsible.Trigger>
                {#snippet child({ props })}
                  <!-- <a href={mainItem.href}> -->
                  <Sidebar.MenuButton {...props} bind:isActive={mainItem.isActive}>
                    {#snippet tooltipContent()}
                      {mainItem.title}
                    {/snippet}
                    {#if mainItem.icon}
                      <mainItem.icon />
                    {/if}

                    <span>{mainItem.title}</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </Sidebar.MenuButton>
                  <!-- </a> -->
                {/snippet}
              </Collapsible.Trigger>
            {/if}

            <Collapsible.Content>
              {#if mainItem.items}
                <Sidebar.MenuSub>
                  {#each mainItem.items as subItem (subItem.href)}
                    <Sidebar.MenuSubItem>
                      <Sidebar.MenuSubButton isActive={subItem.isActive}>
                        {#snippet child({ props })}
                          <a href={subItem.href} {...props}>
                            <span>{subItem.title}</span>
                          </a>
                        {/snippet}
                      </Sidebar.MenuSubButton>
                    </Sidebar.MenuSubItem>
                  {/each}
                </Sidebar.MenuSub>
              {/if}
            </Collapsible.Content>
          </Sidebar.MenuItem>
        {/snippet}
      </Collapsible.Root>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
