<script lang="ts">
  import { ItemDetail } from '$lib/widgets/items'

  let { data } = $props()
</script>

<ItemDetail record={data.record} />
