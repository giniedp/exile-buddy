<script lang="ts">
  import '../app.css'
  import { ModeWatcher } from 'mode-watcher'
  import type { LayoutProps } from './$types'
  import Sidebar from '$ui/sidebar/sidebar.svelte'
  import Command from '$lib/widgets/command/command.svelte'

  let { data, children }: LayoutProps = $props()
</script>

<ModeWatcher />
<Command />
<Sidebar crumbs={data.crumbs}>
  {@render children()}
</Sidebar>
