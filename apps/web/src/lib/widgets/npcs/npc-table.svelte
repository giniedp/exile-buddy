<script lang="ts">
  import { npCs } from '$data'
  import { eqIgnoreCase } from '$lib/utils'
  import { buildOptions, Grid } from '$lib/widgets/datatable'
  import { getTableColumns } from 'drizzle-orm/utils'
  import { colGender, colName, colPortrait } from './cols'
  import type { NpcRecord } from './types'

  export type Props = {
    data?: NpcRecord[]
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

  const options = buildOptions<NpcRecord>((util) => {
    return {
      onSelectionChanged: (e) => {
        selection = e.api.getSelectedRows()[0]?.id?.toLowerCase()
        if (onSelectionCb) onSelectionCb(selection)
      },
      columnDefs: util.colDefs(
        [colPortrait(util), colName(util), colGender(util)],
        getTableColumns(npCs), // used to generate all other columns
      ),
    }
  })
</script>

<Grid {data} {options} selection={selectedRecord} />
