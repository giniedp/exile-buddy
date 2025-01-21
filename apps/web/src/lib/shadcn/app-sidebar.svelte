<script lang="ts" module>
  import AudioWaveform from 'lucide-svelte/icons/audio-waveform'
  import BookOpen from 'lucide-svelte/icons/book-open'
  import Bot from 'lucide-svelte/icons/bot'
  import ChartPie from 'lucide-svelte/icons/chart-pie'
  import Command from 'lucide-svelte/icons/command'
  import Frame from 'lucide-svelte/icons/frame'
  import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end'
  import Map from 'lucide-svelte/icons/map'
  import Settings2 from 'lucide-svelte/icons/settings-2'
  import SquareTerminal from 'lucide-svelte/icons/square-terminal'

  // This is sample data.
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
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
  }
</script>

<script lang="ts">
  import NavMain from '$lib/shadcn//nav-main.svelte'
  import NavUser from '$lib/shadcn//nav-user.svelte'
  import TeamSwitcher from '$lib/shadcn//team-switcher.svelte'
  import * as Sidebar from '$lib/shadcn/ui/sidebar/index.js'
  import type { ComponentProps } from 'svelte'

  let {
    ref = $bindable(null),
    collapsible = 'icon',
    items,
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> & { items: ComponentProps<typeof NavMain>['items'][0]['items'] } = $props()

  const navMain = [
    {
      title: 'Items',
      url: '/items',
      icon: SquareTerminal,
      isActive: true,
      items,
    },

    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ]
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header>
    <TeamSwitcher teams={data.teams} />
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={navMain} />
  </Sidebar.Content>
  <!-- <Sidebar.Footer>
    <NavUser user={data.user} />
  </Sidebar.Footer> -->
  <Sidebar.Rail />
</Sidebar.Root>
