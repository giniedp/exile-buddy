<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI / Item Header',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="exile-item-header">
  <div class="exile-item-header h-12"></div>
  <div class="exile-item-header double h-16"></div>
</Story>

<Story name="exile-item-header magic">
  <div class="exile-item-header magic h-12"></div>
  <div class="exile-item-header magic double h-16"></div>
</Story>

<Story name="exile-item-header rare">
  <div class="exile-item-header rare h-12"></div>
  <div class="exile-item-header rare double h-16"></div>
</Story>

<Story name="exile-item-header unique">
  <div class="exile-item-header unique h-12"></div>
  <div class="exile-item-header unique double h-16"></div>
</Story>

<Story name="exile-item-header currency">
  <div class="exile-item-header currency h-12"></div>
  <div class="exile-item-header currency double h-16"></div>
</Story>

<Story name="exile-item-header gem">
  <div class="exile-item-header gem h-12"></div>
  <div class="exile-item-header gem double h-16"></div>
</Story>

<Story name="exile-item-header quest">
  <div class="exile-item-header quest h-12"></div>
  <div class="exile-item-header quest double h-16"></div>
</Story>

