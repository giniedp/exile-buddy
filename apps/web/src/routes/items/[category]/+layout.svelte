<script lang="ts">
  import * as Tabs from '$lib/shadcn/ui/tabs'
  import { getSubItems } from '$lib/shadcn/app-sidebar.svelte'
  import type { LayoutProps } from './$types'
  import { page } from '$app/state'

  let { data, children }: LayoutProps = $props()

  const items = getSubItems()
  $inspect(data.classes)
  // items[1].title = 'HA'
</script>

<div class="grid grid-flow-col gap-6">
  {#if data.classes.length > 1}
    <a class="btn" href="/items/{page.params.category}">All</a>
    {#each data.classes as { id, name } (id)}
      <a class="btn" href="/items/{page.params.category}/{id.toLowerCase().replaceAll(' ', '')}">
        {name}
      </a>
    {/each}
  {:else}
    <div class="btn">
      {data.classes[0].name}
    </div>
  {/if}
</div>
{@render children?.()}
