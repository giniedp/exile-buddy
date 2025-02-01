<script lang="ts">
  import { recordIdFromSlug } from '$lib/utils'
  import { NpcTable } from '$lib/widgets/npcs'
  let { data, children } = $props()
  let selection = $state(recordIdFromSlug(data.id))
</script>

<div class="flex h-full flex-row overflow-hidden">
  <div class="flex flex-auto flex-col overflow-auto">
    <NpcTable data={data.items} {selection} />
  </div>
  <div>
    {@render children()}
  </div>
</div>
