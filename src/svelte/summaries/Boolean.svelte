<script>
  export let schema;
  export let arrayItem;
</script>

{#if arrayItem}
  <p><strong>Items: boolean</strong></p>
{:else}
  <p>
    {schema.title} (boolean)
  </p>
{/if}

{#if (schema.description != null && schema.description.length > 0)}
  <p>Description: {schema.description}</p>
{/if}

{#if !arrayItem}
  <p>Required: {schema.required}</p>
{/if}

<p>Default: {schema.default}</p>