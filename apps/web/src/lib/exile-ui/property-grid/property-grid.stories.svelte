<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Component from './property-grid.svelte'

  const { Story } = defineMeta({
    title: 'Exile UI / Property Grid',
    // tags: ['autodocs'],
    argTypes: {},
    component: Component,
    args: {
      data: {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        draft: true,
        address: {
          street: '123 Main St',
          city: 'Springfield',
          state: 'IL',
          zip: '62701',
        },
        tags: ['tag1', 'tag2', 'tag3'],
      },
    },
  })
</script>

<Story name="Property Grid" />
