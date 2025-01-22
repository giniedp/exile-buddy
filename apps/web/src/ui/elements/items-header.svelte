<script lang="ts">
  type Variant = 'white' | 'rare' | 'unique' | 'magic' | 'currency' | 'gem' | 'quest'
  export let isDouble = false
  export let variant: Variant = 'white'
  export let children: () => any = null
</script>

<div class="exile-item-header {variant}" class:double={isDouble}>
  {@render children?.()}
</div>


