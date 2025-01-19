<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<div class="flex flex-col">

  <div class="breadcrumbs text-sm">
    <ul>
      <li><a href="/items">Items</a></li>
      {#each data.crumbs as crumb}
        <li><a href="{data.pathname}/{crumb.href}">{crumb.text}</a></li>
      {/each}
    </ul>
  </div>

  <div class="flex flex-row">
    <ul class="menu bg-base-200 rounded-box w-56">
      {#each data.categories as category}
        <li><a href="{data.pathname}/{category}">{category}</a></li>
      {/each}
    </ul>

    <div class="flex-1">
      <div class="mockup-code">
        <pre><code class="">{JSON.stringify(data.item, null, 2)}</code></pre>
      </div>

    </div>
  </div>
</div>



