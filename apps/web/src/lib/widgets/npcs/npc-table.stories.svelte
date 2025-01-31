<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import NpcTable from './npc-table.svelte'
  import Detail from './npc-detail.svelte'
  const { Story } = defineMeta({
    title: 'Widgets / Npcs / Table',
    // tags: ['autodocs'],
    argTypes: {},
    component: NpcTable,
    args: {
      component: Detail,
      //componentProps: { text: 'Whatever' },
    },
  })
</script>

<Story name="Table"/>
