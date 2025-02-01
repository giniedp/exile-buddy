import { getImageUrl } from "$lib/utils"
import type { OptionUtils } from "$lib/widgets/datatable"
import type { NpcRecord } from "./types"

type Record = NpcRecord

export function colPortrait({ colDef, cellRenderer }: OptionUtils<Record>) {
  return colDef({
    headerName: '',
    field: 'portrait',
    width: 80,
    cellRenderer: cellRenderer(({ data }) => {
      const url = getImageUrl(data.npcPortrait?.portraitFile)
      if (!url) {
        return null
      }
      return `<img src="${url}" alt="Portrait" class="w-12 h-12 object-fill" />`
    }),
  })
}

export function colName({ colDef }: OptionUtils<Record>) {
  return colDef({
    field: 'name',
    width: 250,
  })
}

export function colGender({ colDef }: OptionUtils<Record>) {
  return colDef({
    field: 'gender',
    width: 60
  })
}
