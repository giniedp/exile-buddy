<script lang="ts">
  import { buildOptions, Grid } from '$lib/widgets/datatable'
  import { getTableColumns } from 'drizzle-orm/utils'
  import type { NpcRecord } from './types'
  import { npCs } from '$data'
  import { colGender, colName, colPortrait } from './cols'
  import { goto } from '$app/navigation'
  import { recordIdToSlug } from '$lib/utils'
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
      onRowSelected: (e) => {
        if (!e.node.isSelected()) return
        goto(`/db/npcs/${recordIdToSlug(e.data.id)}`)
      },
      columnDefs: util.colDefs(
        [colPortrait(util), colName(util), colGender(util)],
        getTableColumns(npCs), // used to generate all other columns
      ),
    }
  })
</script>

<Grid {data} {options} selection={selectedRecord} />
