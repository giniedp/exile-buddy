import type { ColDef, GridOptions, ICellRenderer, ICellRendererParams, IComponent } from 'ag-grid-community'
import svelteCell from './cell.svelte'
import type { ColumnsFor } from './utils'

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

export interface TypedCellRenderFunc<TData, TValue> {
  (params: ICellRendererParams<TData, TValue>): HTMLElement | string
}

export interface TypedCellRenderComp<TData, TValue>
  extends IComponent<ICellRendererParams<TData, TValue>>,
    ICellRenderer<TData> {}

export type TypedCellRenderer<TData, TValue> = TypedCellRenderFunc<TData, TValue> | TypedCellRenderComp<TData, TValue>

export interface TypedColDef<TData, TValue> extends ColDef<TData, TValue> {
  cellRenderer?: TypedCellRenderer<TData, TValue>
}

/**
 * Takes grid options and returns a new grid options object with default options applied.
 */
export function gridOptions<TData>(options: GridOptions<TData>): GridOptions<TData> {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    defaultColDef: {
      ...(DEFAULT_COL_OPTIONS as any),
      ...options.defaultColDef,
    },
  }
}

export interface OptionUtils<TData> {
  cellRenderer<V>(fn: TypedCellRenderer<TData, V>): TypedCellRenderer<TData, V>
  cell: typeof svelteCell
  colDef<V = unknown>(data: TypedColDef<TData, V>): ColDef
  colDefs(list: GridOptions['columnDefs'], schema?: ColumnsFor<TData>): ColDef[]
}

export function colDefs<TData>(
  list: GridOptions<TData>['columnDefs'],
  schema?: ColumnsFor<TData>,
): ColDef<TData, any>[] {
  const result: ColDef<TData, any>[] = [...list]
  for (const key in schema) {
    const column = schema[key]
    if (list.find((col) => 'colId' in col && col.colId === key)) {
      continue
    }
    result.push({
      colId: key,
      headerName: column.name,
      field: key as any,
    })
  }

  return result
}

/**
 * Allows to build grid options with some type safe utils
 */
export function buildOptions<TData>(fn: (util: OptionUtils<TData>) => GridOptions<TData>): GridOptions<TData> {
  return gridOptions(
    fn({
      cellRenderer: (fn) => fn,
      cell: svelteCell,
      colDef: (data) => {
        return {
          colId: data.colId || data.field,
          ...data,
        }
      },
      colDefs,
    }),
  )
}
