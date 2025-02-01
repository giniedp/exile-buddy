<script lang="ts">
  export let value: any = null
  const isArray = Array.isArray
</script>

<span
  class={{
    'text-success': typeof value == 'string',
    'text-error': typeof value === 'number',
    'text-secondary': isArray(value),
    'text-info bold': typeof value === 'boolean',
  }}
>
  {JSON.stringify(value)}
</span>
