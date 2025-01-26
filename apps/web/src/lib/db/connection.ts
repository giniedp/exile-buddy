import { connectDatabase } from './adapter'
import { PUBLIC_POE2_VERSION } from '$env/static/public'
// import { POE_DB_URL, POE_DB_VERSION } from '$env/static/private'
// TODO: add options from env variables at build time?

export const db = connectDatabase({
  name: 'poe2',
  databaseUrl: `/cdn/poe2.db`,
  version: semverToInt(PUBLIC_POE2_VERSION),
})

function semverToInt(version: string): number {
  return version.split('.').reduce((acc, part) => acc * 100 + parseInt(part), 0)
}
