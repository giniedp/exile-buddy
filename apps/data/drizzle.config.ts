import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/generated/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:../web/static/cdn/poe2.db',
  },
})
