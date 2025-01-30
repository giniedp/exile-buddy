<script lang="ts">
  import Datatable from '$ui/datatable/datatable.svelte'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

{#await data.items then items}
  <!-- {@const keys = Object.keys(items[0])}
        {@const columns = keys.map((key) => ({ id: key, header: key }))} -->

  {console.time('wx-grid')}
  <Datatable data={items} />
  {console.timeEnd('wx-grid')}
{/await}
