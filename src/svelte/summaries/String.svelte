<script>
  export let schema
</script>

<p>
  {schema.title} (string)
</p>

{#if (schema.description != null && schema.description.length > 0)}
  <p>Description: {schema.description}</p>
{/if}

{#if (schema.maxLength != null)}
  <p>Maximum length: {schema.maxLength}</p>
{/if}

{#if (schema.minLength != null)}
  <p>Minimum length: {schema.minLength}</p>
{/if}