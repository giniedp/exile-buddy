<script lang="ts">
  import { PropertyGrid } from '$lib/exile-ui/property-grid'
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/shadcn/ui/avatar'
  import { getImageUrl } from '$lib/utils'
  import type { NpcRecord } from './types'

  export let record: NpcRecord
</script>

<Avatar class="size-full rounded-sm mb-4 aspect-square">
  <AvatarImage class="object-cover" src={getImageUrl(record?.npcPortrait?.portraitFile)} alt="Portrait" />
  <AvatarFallback class="rounded-sm">{record?.shortName}</AvatarFallback>
</Avatar>
<PropertyGrid data={record} />
