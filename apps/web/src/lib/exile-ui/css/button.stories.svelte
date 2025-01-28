<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI / CSS Components / poe-btn-*',
    tags: ['autodocs'],
  })
</script>

<Story name="generic ">
  <button class="btn btn-lg poe-btn-generic" aria-label="Button"> Button </button>
</Story>
<Story name="green">
  <button class="btn btn-lg poe-btn-green" aria-label="Button"> Button </button>
</Story>
<Story name="orange">
  <button class="btn btn-lg poe-btn-orange" aria-label="Button"> Button </button>
</Story>
<Story name="red">
  <button class="btn btn-lg poe-btn-red" aria-label="Button"> Button </button>
</Story>

<Story name="icon orange">
  <button class="btn btn-lg poe-icon-btn-orange" aria-label="Button"> </button>
</Story>
<Story name="icon close">
  <button class="btn btn-lg btn-circle poe-icon-btn-close" aria-label="Button"> </button>
</Story>
