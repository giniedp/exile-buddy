<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI /  CSS Components / poe-panel-*',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="Border">
  <div class="p-4 bg-black min-w-96">
    <div class="poe-panel-border min-h-96"></div>
  </div>
</Story>

<Story name="Ornate">
  <div class="p-4 bg-black min-w-96">
    <div class="poe-panel-ornate min-h-96"></div>
  </div>
</Story>
