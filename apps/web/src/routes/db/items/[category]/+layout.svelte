<script lang="ts">
  import { untrack, type Snippet } from 'svelte'
  import type { LayoutData } from './$types'
  import { ItemTable } from '$lib/widgets/items'
  import { recordIdFromSlug, recordIdToSlug } from '$lib/utils'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import * as Resizable from '$lib/shadcn/ui/resizable'

  let { data, children }: { data: LayoutData; children: Snippet } = $props()
  let selection = $derived(recordIdFromSlug(data.id))
  let detailPane: Resizable.Pane = $state()
  let paneGroup: Resizable.PaneGroup = $state()

  $effect(() => {
    if (data.id) {
      untrack(() => {
        detailPane?.resize(30)
      })
    } else untrack(() => detailPane?.resize(0))
  })
</script>

<Resizable.PaneGroup direction="horizontal" bind:this={paneGroup}>
  <Resizable.Pane defaultSize={70}>
    {#if data.items}
      <ItemTable
        data={data.items}
        {selection}
        onSelectionChanged={(id) =>
          goto(`/db/items/${page.params.category}/${page.params.class ?? page.params.category}/${recordIdToSlug(id)}`)}
      />
    {/if}
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane bind:this={detailPane}>
    <div class="h-full overflow-auto">
      {@render children()}
    </div>
  </Resizable.Pane>
</Resizable.PaneGroup>
