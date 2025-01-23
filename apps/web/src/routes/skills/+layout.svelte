<script lang="ts">
  import { setSubItems } from '$lib/shadcn/app-sidebar.svelte'

  let { data, children } = $props()

  $effect(() => setSubItems('Trees', []))
</script>

{@render children()}
