import './registry'
import { createGrid, type GridApi, type GridOptions } from 'ag-grid-community'
import { getContext, setContext } from 'svelte'

export function getGrid() {
  return getContext<GridApi>('grid')
}

function setGrid(api: GridApi) {
  setContext('grid', api)
}

export function grid(el: HTMLDivElement, options: GridOptions) {
  let api: GridApi = createGrid(el, options)
  setGrid(api)

  return {
    update: (options: GridOptions) => api.updateGridOptions(options),
    destroy: () => {
      api?.destroy()
      api = null
      setGrid(null)
    },
  }
}

export function gridData<TData>(el: HTMLDivElement, data: TData[]) {
  const api = getGrid()
  api.setGridOption('rowData', data)

  return {
    update: (data: TData[]) => api.setGridOption('rowData', data),
  }
}

export function gridSelection<TData>(el: HTMLDivElement, selection: TData) {
  const api = getGrid()
  setSelected(api, selection)

  return {
    update: (selection: TData) => {
      setSelected(api, selection)
    },
  }
}

function setSelected<TData extends { id: string }>(api: GridApi<TData>, selection: TData) {
  const node = api.getRowNode(selection?.id)
  if (!node) return
  node.setSelected(true)

  api.ensureNodeVisible(node)
}
