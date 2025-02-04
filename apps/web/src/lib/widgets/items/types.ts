import type { findBaseItemTypeByClassIdx, findBaseItemTypeById } from '$data/queries/base-item-types'

type Record = Awaited<ReturnType<typeof findBaseItemTypeById>>
export type ItemRecord = Partial<Record>

type Row = Awaited<ReturnType<typeof findBaseItemTypeByClassIdx>>[number]
export type ItemRow = Partial<Row>
