<script>
  export let schema;
  export let arrayItem;
</script>

{#if !arrayItem}
  <p>Required: {schema.required}</p>
{/if}

<p>Default: {schema.default}</p>