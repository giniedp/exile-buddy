import { getImageUrl } from '$lib/utils'
import type { OptionUtils } from '$lib/widgets/datatable'
import type { ItemRecord } from './types'

type Record = ItemRecord

export function colIcon({ colDef, cellRenderer }: OptionUtils<Record>) {
  return colDef({
    headerName: '',
    field: 'itemVisualIdentity',
    width: 80,
    cellRenderer: cellRenderer(({ data }) => {
      const url = getImageUrl(data.itemVisualIdentity?.ddsFile)
      if (!url) {
        return null
      }
      return `<img src="${url}" alt="Icon" class="w-12 h-12 object-fill" />`
    }),
    cellClass: 'place-content-center',
  })
}

export function colName({ colDef }: OptionUtils<Record>) {
  return colDef({
    field: 'name',
    width: 250,
  })
}

export function colItemClass({ colDef }: OptionUtils<Record>) {
  return colDef({
    field: 'itemClass',
    width: 60,
    valueFormatter: (e) => e.data.itemClass.name,
  })
}
