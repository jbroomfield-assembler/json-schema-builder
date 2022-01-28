<script>
  export let schema;
</script>

<p>{schema.title} (boolean)</p>

{#if (schema.description != null && schema.description.length > 0)}
  <p>Description: {schema.description}</p>
{/if}

<p>Required: {schema.required}</p>

<p>Default: {schema.default}</p>