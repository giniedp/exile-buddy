<script lang="ts">
  import { PropertyGrid } from '$lib/exile-ui/property-grid'
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/shadcn/ui/avatar'
  import { getImageUrl } from '$lib/utils'
  import type { ItemRecord } from './types'

  export let record: ItemRecord
</script>

<Avatar class="mb-4 aspect-square size-20 rounded-sm">
  <AvatarImage class="object-contain" src={getImageUrl(record?.itemVisualIdentity?.ddsFile)} alt="Portrait" />
  <AvatarFallback class="rounded-sm">{record?.name}</AvatarFallback>
</Avatar>
<PropertyGrid data={record} />
