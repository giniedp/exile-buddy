<script lang="ts">
  import { baseItemTypes } from '$data'
  import { eqIgnoreCase } from '$lib/utils'
  import { buildOptions, Grid } from '$lib/widgets/datatable'
  import { getTableColumns } from 'drizzle-orm/utils'
  import { colItemClass, colName, colIcon } from './cols'
  import type { ItemRecord, ItemRow } from './types'

  export type Props = {
    data?: ItemRow[]
    selection?: string
    onSelectionChanged?: (id: string) => void
  }

  let { data, selection = $bindable(), onSelectionChanged: onSelectionCb }: Props = $props()
  let selectedRecord = $derived.by(() => {
    if (data && selection) {
      return data.find((d) => eqIgnoreCase(d.id, selection))
    }
    return null
  })

  const options = buildOptions<ItemRecord>((util) => {
    return {
      onRowSelected: (e) => {
        if (e.node.isSelected() && onSelectionCb) onSelectionCb(e.data.id)
      },
      columnDefs: util.colDefs(
        [colIcon(util), colName(util), colItemClass(util)],
        getTableColumns(baseItemTypes), // used to generate all other columns
      ),
      getRowId: (node) => node.data.id,
    }
  })
</script>

<Grid {options} {data} selection={selectedRecord} />
