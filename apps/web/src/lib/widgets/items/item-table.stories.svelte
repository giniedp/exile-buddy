<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ItemTable from './item-table.svelte'
  import Detail from './item-detail.svelte'
  const { Story } = defineMeta({
    title: 'Widgets / Items / Table',
    // tags: ['autodocs'],
    argTypes: {},
    component: ItemTable,
    args: {
      component: Detail,
      //componentProps: { text: 'Whatever' },
    },
  })
</script>

<Story name="Table" />
