<script lang="ts">
  import { page } from '$app/state'
  import Datatable from '$lib/datatable.svelte'

  let { data } = $props()
</script>

<div class="flex flex-col">
  <div class="flex flex-row">
    <!-- <ul class="menu bg-base-200 rounded-box w-56">
      {#each data.categories as category}
        <li><a href="/items/{category}/df">{category}</a></li>
      {/each}
    </ul> -->

    <div class="flex-1 max-w-screen-2xl overflow-auto">
      <!-- {#each items as { Id }}
        {Id}
      {/each} -->
      <!-- <Datatable data={data.items} {columns} /> -->
    </div>
  </div>
</div>
