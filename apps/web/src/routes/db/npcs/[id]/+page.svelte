<script lang="ts">
  import type { PageData } from './$types'
  import { NpcDetail } from '$lib/widgets/npcs'
  let { data }: { data: PageData } = $props()
</script>

<div class="flex-none">
  <NpcDetail record={data.record} />
</div>
