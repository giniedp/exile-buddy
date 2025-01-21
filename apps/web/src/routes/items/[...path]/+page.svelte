<script lang="ts">
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<div class="flex flex-col">
  <div class="flex flex-row">
    <!-- <ul class="menu bg-base-200 rounded-box w-56">
      {#each data.categories as category}
        <li><a href="{page.url.pathname}/{category}">{category}</a></li>
      {/each}
    </ul> -->

    <div class="flex-1">
      <!-- {#if !data.item}
        <Datatable data={data.items} {columns} />
      {/if} -->
    </div>
  </div>
</div>
