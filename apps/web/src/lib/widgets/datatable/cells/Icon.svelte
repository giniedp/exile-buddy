<script lang="ts">
  import { cn } from '$lib/shadcn/utils'
  import type { HTMLImgAttributes } from 'svelte/elements'

  let { class: className, ...rest }: HTMLImgAttributes = $props()
</script>

<div class="flex h-full w-full place-content-center place-items-center">
  <img {...rest} class={cn('max-h-full', className)} />
</div>
