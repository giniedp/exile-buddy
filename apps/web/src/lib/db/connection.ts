import { connectDatabase } from './database2'
// import { POE_DB_URL, POE_DB_VERSION } from '$env/static/private'
// TODO: add options from env variables at build time?

export const db = connectDatabase({
  name: 'poe2',
  databaseUrl: `/cdn/poe2.db`,
  version: 3,
})
