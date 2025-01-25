<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI / Title Bar',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="exile-title-bar">
  <div class="exile-title-bar h-12 flex items-center justify-center text-white relative font-fontin text-exile-magic">
    Title Text
    <button class="exlie-icon-btn close w-8 absolute right-2" aria-label="Close"></button>
  </div>
</Story>

<Story name="exile-title-bar account">
  <div class="exile-title-bar account h-12">

  </div>
</Story>
