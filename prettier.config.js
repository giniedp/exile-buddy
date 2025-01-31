/** @type {import('prettier').Config} */
const baseConfig = {
  trailingComma: 'all',
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 120,
  bracketSpacing: true,
  tailwindStylesheet: './apps/web/app.css',
  tailwindConfig: './apps/web/tailwind.config.js',
  tailwindFunctions: ['cn', 'clsx'],
  plugins: ['prettier-plugin-embed', 'prettier-plugin-sql', 'prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}

/** @type {import('prettier-plugin-embed').PluginEmbedOptions} */
const embedConfig = {
  embeddedSqlTags: ['sql'],
}

/** @type {import('prettier-plugin-sql').SqlBaseOptions} */
const sqlConfig = {
  language: 'sqlite',
  keywordCase: 'upper',
}

/** @type {import('prettier-plugin-svelte').PluginConfig} */
const svelteConfig = {
  svelteStrictMode: true,
}

export default { ...baseConfig, ...sqlConfig, ...embedConfig, ...svelteConfig }
