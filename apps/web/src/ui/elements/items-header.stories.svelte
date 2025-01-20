<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ItemsHeader from './items-header.svelte'

  const { Story } = defineMeta({
    title: 'UI / Elements / ItemsHeader',
    component: ItemsHeader,
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
      isDouble: false,
      variant: 'white',
    },
  })
</script>

<Story name="White" args={{ variant: 'white' }} />
<Story name="Rare" args={{ variant: 'rare' }} />
<Story name="Magic" args={{ variant: 'magic' }} />
<Story name="Unique" args={{ variant: 'unique' }} />
<Story name="Currency" args={{ variant: 'currency' }} />
<Story name="Gem" args={{ variant: 'gem' }} />
<Story name="Quest" args={{ variant: 'quest' }} />
