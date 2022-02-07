<script>
  export let schema;
</script>

{#if schema.default != undefined}
  <p>Default: {schema.default}</p>
{/if}