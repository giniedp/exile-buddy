<script lang="ts" generics="TData">
  import { cn } from '$lib/shadcn/utils'
  import type { GridOptions } from 'ag-grid-community'
  import type { HTMLAttributes } from 'svelte/elements'
  import { grid, gridData, gridSelection } from './grid-action.svelte'

  type Props = {
    options: GridOptions<TData>
    data?: TData[]
    selection?: TData
  } & HTMLAttributes<HTMLElement>

  let { options, data, selection, class: className, ...rest }: Props = $props()
</script>

<div
  {...rest}
  class={cn('w-full', 'h-full', className)}
  use:grid={options}
  use:gridData={data}
  use:gridSelection={selection}
></div>
