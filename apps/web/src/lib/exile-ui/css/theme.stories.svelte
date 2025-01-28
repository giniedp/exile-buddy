<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI /  CSS Components / theme',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="Font Fontin">
  <div class="p-4 bg-black font-poe-fontin">
    <div class="text-xs">Extra Small <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
    <div class="text-sm">Small <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
    <div class="">Normal <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
    <div class="text-lg">Large <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
    <div class="text-xl">Extra Large <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
  </div>
</Story>

<Story name="Font Smallcaps">
  <div class="p-4 bg-black font-poe-smallcaps">
    <div class="text-xs">Extra Small <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
    <div class="text-sm">Small <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
    <div class="">Normal <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
    <div class="text-lg">Large <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
    <div class="text-xl">Extra Large <span class="font-bold">Bold</span> <span class="italic">Italic</span></div>
  </div>
</Story>

<Story name="Text Color">
  <div class="p-4 bg-black">
    <div class="text-poe-unique">unique unique unique</div>
    <div class="text-poe-rare">rare rare rare</div>
    <div class="text-poe-magic">magic magic magic</div>
    <div class="text-poe-normal">normal normal normal</div>
    <div class="text-poe-gem">gem gem gem</div>
    <div class="text-poe-corrupt">corrupt corrupt corrupt</div>
    <div class="text-poe-fire">fire fire fire</div>
    <div class="text-poe-chaos">chaos chaos chaos</div>
  </div>
</Story>
