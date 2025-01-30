<script lang="ts">
  import '../app.css'
  import { ModeWatcher } from 'mode-watcher'
  import type { LayoutProps } from './$types'
  import Sidebar from '$ui/sidebar/sidebar.svelte'

  let { data, children }: LayoutProps = $props()
</script>

<ModeWatcher />
<Sidebar crumbs={data.crumbs}>
  {@render children()}
</Sidebar>
