<script>
  import NumberFields from "./types/NumberFields.svelte"
  import StringFields from "./types/StringFields.svelte"

  export let schema;
  export let valid;

  const resolveType = schema => {
    if (!schema) return 'NO SCHEMA'
    return {
      'number': NumberFields,
      'string': StringFields,
    }
  }
</script>

<svelte:component this={resolveType(schema)} bind:schema bind:valid/>