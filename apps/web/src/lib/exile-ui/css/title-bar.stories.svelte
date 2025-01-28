<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI / CSS Components / poe-*-title-bar',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="Default">
  <div class="poe-title-bar h-12 min-w-96 flex items-center justify-center text-white relative font-poe-fontin">
    Title Text
    <button class="btn btn-circle btn-sm poe-icon-btn-close absolute right-3" aria-label="Close"></button>
  </div>
</Story>

<Story name="account">
  <div class="poe-account-title-bar h-12 min-w-96">

  </div>
</Story>
