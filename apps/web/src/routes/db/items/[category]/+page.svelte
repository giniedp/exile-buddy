<script lang="ts">
  import Datatable from '$ui/datatable/datatable.svelte'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
  $inspect(data.items)
</script>

{#await data.items then items}
  {#if items.length}
    {console.time('wx-grid')}
    <Datatable data={items} />
    {console.timeEnd('wx-grid')}
  {/if}
{/await}
