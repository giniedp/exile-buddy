
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'UI / Elements / Panel Frame',
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
      content: ``
    },
  })
</script>

<Story name="Skillpanelframe" >
  <div class="p-4 bg-black">

    <div class="nine-slice-pane min-h-[500px] ">
      <span class="edge-t"></span>
      <span class="edge-b"></span>
      <span class="sides"></span>
      <span class="corners-t"></span>
      <span class="corners-b"></span>
    </div>
  </div>

</Story>
