<script lang="ts" generics="TData">
  import type { GridOptions } from 'ag-grid-community'
  import { grid, gridData, gridSelection } from './grid-action.svelte'

  type Props = {
    options: GridOptions<TData>
    data: TData[]
    selection: TData
  }
  let { options, data, selection }: Props = $props()

</script>

<div class="h-full w-full" use:grid={options} use:gridData={data} use:gridSelection={selection}></div>
