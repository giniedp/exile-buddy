<script lang="ts">
  import { setSubItems } from '$lib/shadcn/app-sidebar.svelte'

  let { data, children } = $props()
  $effect(() => setSubItems('Categories', data.categories))
</script>

{@render children()}
