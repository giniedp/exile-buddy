<script lang="ts" module>
  import AudioWaveform from 'lucide-svelte/icons/audio-waveform'
  import Command from 'lucide-svelte/icons/command'
  import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end'
  import NavMain from '$lib/shadcn//nav-main.svelte'

  export type NavMainItems = ComponentProps<typeof NavMain>['items']
  let items: NavMainItems = $state([])
  let label: string = $state('')

  export function setSubItems(lbl: string, link: NavMainItems) {
    label = lbl
    items = link
  }

  // This is sample data.
  const data = $state({
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '',
    },
    teams: [
      {
        name: 'Acme Inc',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: Command,
        plan: 'Free',
      },
    ],
  })
</script>

<script lang="ts">
  import NavUser from '$lib/shadcn//nav-user.svelte'
  import NavSub from './nav-sub.svelte'
  import TeamSwitcher from '$lib/shadcn//team-switcher.svelte'
  import * as Sidebar from '$lib/shadcn/ui/sidebar/index.js'
  import type { ComponentProps } from 'svelte'
  import ListTodo from 'lucide-svelte/icons/list-todo'
  import ListTree from 'lucide-svelte/icons/list-tree'
  import { page } from '$app/state'

  let { ref = $bindable(null), collapsible = 'icon', ...restProps }: ComponentProps<typeof Sidebar.Root> = $props()
  const navMain: NavMainItems = $derived([
    {
      title: 'Items',
      url: '/items',
      icon: ListTodo,
      isActive: page.url.pathname.startsWith('/items'),
    },
    {
      title: 'Skills',
      url: '/skills',
      icon: ListTree,
      isActive: page.url.pathname.startsWith('/skills'),
    },
  ])
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header>
    <TeamSwitcher teams={data.teams} />
  </Sidebar.Header>
  <Sidebar.Content
    class="group-data-[collapsible=icon]:[scrollbar-width:none] group-data-[collapsible=icon]:overflow-auto"
  >
    <NavMain items={navMain} />
    <NavSub {label} {items} />
  </Sidebar.Content>
  <Sidebar.Footer>
    <NavUser user={data.user} />
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
