<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI / Item Separator',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="exile-item-separator">
  <div class="exile-item-separator"></div>
  <div class="exile-item-separator magic"></div>
  <div class="exile-item-separator rare"></div>
  <div class="exile-item-separator unique"></div>
  <div class="exile-item-separator currency"></div>
  <div class="exile-item-separator gem"></div>
  <div class="exile-item-separator quest"></div>
</Story>
