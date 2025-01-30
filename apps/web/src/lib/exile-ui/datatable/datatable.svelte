<script lang="ts" module>
  import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
  ModuleRegistry.registerModules([AllCommunityModule])
</script>

<script lang="ts" generics="TData, TValue">
  import { baseItemTypes } from '$data'
  import { getTableColumns } from 'drizzle-orm'
  import type { Action } from 'svelte/action'
  import { createGrid, type ColDef } from 'ag-grid-community'
  import Icon from './Icon.svelte'
  import { mount, type ComponentProps } from 'svelte'
  import { cellRendererFactory } from './cellrenderfactory'

  type Props<TData, TValue> = {
    columns?: ColDef[]
    data: TData[]
  }

  let {
    data,
    columns = Object.entries(getTableColumns(baseItemTypes)).map(([key, value]) => ({
      field: key,
      headerName: value.name,
      sortable: true,
      filter: true,
      ...(value.name === baseItemTypes.itemVisualIdentity.name && {
        valueFormatter: (params) => params.value.ddsFile.toLowerCase().replace('dds', 'webp'),
        cellRenderer: cellRendererFactory((cell, params) => {
          const props: ComponentProps<typeof Icon> = $state({
            src: `/cdn/${params.valueFormatted}`,
            style: `max-height: ${params.node.rowHeight}px;`,
          })

          const component = mount(Icon, {
            target: cell.eGui,
            props,
          })

          cell.refresh = (params) => {
            props.src = `/cdn/${params.valueFormatted}`
            return true
          }
          return component
        }),
      }),
    })),
  }: Props<TData, TValue> = $props()

  const action: Action<HTMLDivElement> = (node) => {
    $effect(() => {
      createGrid(node, { rowData: data, columnDefs: columns, rowHeight: 80 })
    })
  }
</script>

<div class="w-full h-full" use:action></div>
