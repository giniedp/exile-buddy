import type { findNpcById } from '$data/queries/npcs'

type Record = Awaited<ReturnType<typeof findNpcById>>

export type NpcRecord = Partial<Record>
