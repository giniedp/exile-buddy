
import './registry'
import { createGrid, type GridApi, type GridOptions, type IRowNode } from "ag-grid-community"
import { getContext, setContext } from "svelte"

export function getGrid() {
  return getContext<GridApi>('grid')
}

function setGrid(api: GridApi) {
  setContext('grid', api)
}

export function grid(el: HTMLDivElement, options: GridOptions) {
  let api: GridApi = createGrid(el, options)
  setGrid(api)
  $effect(() => {
    api.updateGridOptions(options)
    return () => {
      api?.destroy()
      api = null
      setGrid(null)
    }
  })
}

export function gridData<TData>(el: HTMLDivElement, data: TData[]) {
  const api = getGrid()
  api.setGridOption('rowData', data)
}

export function gridSelection<TData>(el: HTMLDivElement, selection: TData) {
  const api = getGrid()
  let found: IRowNode = null
  api.forEachNode((node) => {
    if (node.data === selection) {
      node.setSelected(true)
      found = node
    } else {
      node.setSelected(false)
    }
  })
  if (found) {
    api.ensureNodeVisible(found)
  }
}
