<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI /  CSS Components / poe-item-separator-*',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="white">
  <div class="min-w-96">
    <div class="poe-item-separator"></div>
    <div class="poe-item-separator-white"></div>
    <div class="poe-item-separator-normal"></div>
  </div>
</Story>

<Story name="magic">
  <div class="min-w-96">
    <div class="poe-item-separator poe-item-separator-magic"></div>
  </div>
</Story>
<Story name="rare">
  <div class="min-w-96">
    <div class="poe-item-separator-rare"></div>
  </div>
</Story>
<Story name="unique">
  <div class="min-w-96">
    <div class="poe-item-separator-unique"></div>
  </div>
</Story>
<Story name="currency">
  <div class="min-w-96">
    <div class="poe-item-separator-currency"></div>
  </div>
</Story>
<Story name="gem">
  <div class="min-w-96">
    <div class="poe-item-separator-gem"></div>
  </div>
</Story>
<Story name="quest">
  <div class="min-w-96">
    <div class="poe-item-separator-quest"></div>
  </div>
</Story>
