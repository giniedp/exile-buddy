import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: '$data/drizzle',
  schema: '$data/src/generated/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:static/cdn/poe2.db',
  },
})
