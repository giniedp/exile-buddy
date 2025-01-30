<script lang="ts">
  import type { LayoutProps } from './$types'
  import { page } from '$app/state'
  import { Button } from '$lib/shadcn/ui/button'

  let { data, children }: LayoutProps = $props()
</script>

<div class="grid grid-flow-col gap-6">
  <!-- {#each data.classes as { id, name } (id)}
    <Button
      variant={page.params.class == id.toLowerCase().replaceAll(' ', '') ? 'default' : 'secondary'}
      class="flex place-content-center"
      href="/items/{page.params.category}/{id.toLowerCase().replaceAll(' ', '')}"
    >
      {name}
    </Button>
  {/each} -->
</div>
{@render children?.()}
