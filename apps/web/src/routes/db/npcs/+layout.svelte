<script lang="ts">
  import { goto } from '$app/navigation'
  import { recordIdFromSlug, recordIdToSlug } from '$lib/utils'
  import { NpcTable } from '$lib/widgets/npcs'
  let { data, children } = $props()
  let selection = $state(recordIdFromSlug(data.id))
  $effect(() => {
    if (selection) {
      goto(`/db/npcs/${recordIdToSlug(selection)}`)
    }
  })
</script>

<div class="flex h-full flex-row overflow-hidden">
  <div class="flex flex-auto flex-col overflow-auto">
    <NpcTable data={data.items} bind:selection={selection} />
  </div>
  <div>
    {@render children()}
  </div>
</div>
