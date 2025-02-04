<script lang="ts">
  import { goto } from '$app/navigation'
  import { recordIdFromSlug, recordIdToSlug } from '$lib/utils'
  import { NpcTable } from '$lib/widgets/npcs'
  import * as Resizable from '$lib/shadcn/ui/resizable'
  import { untrack } from 'svelte'

  let { data, children } = $props()
  let selection = $derived(recordIdFromSlug(data.id))
  let pane: Resizable.Pane = $state()
  let paneGroup: Resizable.PaneGroup = $state()

  $effect(() => {
    if (data.id) {
      untrack(() => {
        pane?.resize(30)
      })
    } else untrack(() => pane?.resize(0))
  })
</script>

<Resizable.PaneGroup direction="horizontal" bind:this={paneGroup}>
  <Resizable.Pane>
    <NpcTable data={data.items} {selection} onSelectionChanged={(id) => goto(`/db/npcs/${recordIdToSlug(id)}`)} />
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane defaultSize={30} bind:this={pane}>
    <div class="h-full overflow-auto">
      {@render children()}
    </div>
  </Resizable.Pane>
</Resizable.PaneGroup>
