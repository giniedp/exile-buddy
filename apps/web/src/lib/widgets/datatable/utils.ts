import type { ColDef } from 'ag-grid-community'
import type { SQLiteColumn } from 'drizzle-orm/sqlite-core'

export type ColumnsFor<T> = {
  [K in keyof T]: SQLiteColumn
}

export type ColDefOverride<T> = {
  [K in keyof T]: ColDef<T, T[K]>
}

export function colsForTable<TData>(
  columns: ColumnsFor<TData>,
  overrides?: ColDefOverride<TData>,
): ColDef<TData, any>[] {
  const result: ColDef<TData, any>[] = []
  for (const key in columns) {
    const column = columns[key]
    const override = overrides?.[key]
    result.push({
      colId: key,
      headerName: column.name,
      field: key,
      ...override,
    })
  }

  return result
}
