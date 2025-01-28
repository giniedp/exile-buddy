<script lang="ts">
  import { setSubItems, states, type NavMainItems } from '$lib/shadcn/app-sidebar.svelte'

  let { data, children } = $props()
  $effect(() => setSubItems('Categories', data.categories satisfies NavMainItems))
</script>

{@render children()}
