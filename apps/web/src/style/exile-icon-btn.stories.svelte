<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI / Icon Btn',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="exlie-icon-btn">
  <div class="exlie-icon-btn h-12"></div>
</Story>
<Story name="exlie-icon-btn orange">
  <div class="exlie-icon-btn orange h-12"></div>
</Story>
