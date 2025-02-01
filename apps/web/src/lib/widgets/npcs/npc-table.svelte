<script lang="ts">
  import { npCs } from '$data'
  import { colsForTable, Grid, gridOptions } from '$lib/widgets/datatable'
  import { getTableColumns } from 'drizzle-orm'
  import type { NpcRecord } from './types'

  export type Props = {
    data?: NpcRecord[]
    selection?: string
  }

  let { data, selection = $bindable() }: Props = $props()
  let selectedRecord = $derived.by(() => {
    if (data && selection) {
      return data.find((d) => d.id.toLowerCase() === selection.toLowerCase())
    }
    return null
  })

  const options = gridOptions<NpcRecord>({
    onRowSelected: (e) => selection = e.data.id,
    columnDefs: colsForTable<NpcRecord>(getTableColumns(npCs)),
  })
</script>

<Grid {data} {options} selection={selectedRecord} />
