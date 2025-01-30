<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements'

  let props: HTMLImgAttributes = $props()
</script>

<div class="flex place-items-center place-content-center">
  <img {...props} />
</div>
