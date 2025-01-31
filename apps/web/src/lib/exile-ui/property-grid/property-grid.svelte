<script lang="ts" generics="T extends Object">
  import { resolveProperties, type SnippetsFor } from './properties'
  import Cell from './property-cell.svelte'

  export let data: T = null
  export let snippets: Partial<SnippetsFor<T>> = {}
</script>

<table class="table-xs table font-mono">
  <tbody>
    {#each resolveProperties(data, snippets) as { key, value, snippet }}
      <tr>
        <td class="align-top">{key}</td>
        <td>
          {#if snippet}
            {@render snippet(value, data)}
          {:else if typeof value === 'object'}
            <svelte:self data={value} />
          {:else}
            <Cell {value} />
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
