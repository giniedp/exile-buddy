<script lang="ts">

  export let value: any = null
  const isArray = Array.isArray
</script>

<span
  class:text-success={typeof value === 'string'}
  class:text-error={typeof value === 'number'}
  class:text-secondary={isArray(value)}
  class:text-info={typeof value === 'boolean'}
  class:bold={typeof value === 'boolean'}
>
  {JSON.stringify(value)}
</span>
