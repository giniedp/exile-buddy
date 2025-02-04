<script lang="ts" generics="T extends Object">
  import type { HTMLAttributes } from 'svelte/elements'
  import { resolveProperties, type SnippetsFor } from './properties'
  import Cell from './property-cell.svelte'
  import Self from './property-grid.svelte'
  import { cn } from '$lib/shadcn/utils'

  type Props = {
    data: T
    snippets?: Partial<SnippetsFor<T>>
  } & HTMLAttributes<HTMLTableElement>

  let { data = null, snippets = {}, ...rest }: Props = $props()
</script>

<table {...rest} class={cn('table-xs table font-mono', rest.class)}>
  <tbody>
    {#each resolveProperties(data, snippets) as { key, value, snippet }}
      <tr>
        <td class="align-top">{key}</td>
        <td>
          {#if snippet}
            {@render snippet(value, data)}
          {:else if typeof value === 'object'}
            <Self data={value} />
          {:else}
            <Cell {value} />
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
