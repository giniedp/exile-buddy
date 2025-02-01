<script lang="ts">
  import { buildOptions, colsForTable, Grid } from '$lib/widgets/datatable'
  import { getTableColumns } from 'drizzle-orm/utils'
  import type { NpcRecord } from './types'
  import { npCs } from '$data'
  import { getImageUrl } from '$lib/utils'
  import { colGender, colName, colPortrait } from './cols'

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

  const options = buildOptions<NpcRecord>((util) => {
    return {
      onRowSelected: (e) => (selection = e.data.id),
      columnDefs: util.colDefs(
        [
          colPortrait(util),
          colName(util),
          colGender(util)
        ],
        getTableColumns(npCs), // used to generate all other columns
      ),
    }
  })
</script>

<Grid {data} {options} selection={selectedRecord} />

