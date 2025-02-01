import type { ColDef, GridOptions } from 'ag-grid-community'

export const DEFAULT_OPTIONS: GridOptions = {
  animateRows: false,
  rowSelection: {
    mode: 'singleRow',
    enableClickSelection: true,
    checkboxes: false,
  },
}

export const DEFAULT_COL_OPTIONS: ColDef = {
  sortable: true,
  filter: true,
}

export function gridOptions<TData>(options: Partial<GridOptions<TData>>): GridOptions<TData> {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    defaultColDef: {
      ...(DEFAULT_COL_OPTIONS as any),
      ...options.defaultColDef,
    },
  }
}
