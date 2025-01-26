import { db } from '$lib/db'
import type { ClientInit } from '@sveltejs/kit'

export const init: ClientInit = async () => {
  /** This lets it initially setup the db, without it here it gets compiled out */
  db
}
