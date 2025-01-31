<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import NpcDetail from './npc-detail.svelte'

  const { Story } = defineMeta({
    title: 'Widgets / Npcs / Detail',
    tags: ['autodocs'],
    argTypes: {},
    component: NpcDetail,
    args: {
      record: {
        id: '',
        name: 'John Doe',
        shortName: 'JD',
        gender: 'M',
        npcPortrait: null,
      },
    },
  })
</script>

<Story name="Detail" />
<Story
  name="With Image"
  args={{
    record: {
      id: '',
      name: 'John Doe',
      shortName: 'JD',
      gender: 'M',
      npcPortrait: {
        $idx: 0,
        name: '',
        portraitFile: 'https://picsum.photos/200/300'
      },
    },
  }}
/>
