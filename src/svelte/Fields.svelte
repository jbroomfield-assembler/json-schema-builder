<script>
  import NumberFields from "./types/NumberFields.svelte"
  import StringFields from "./types/StringFields.svelte"
  import NoSchema from "./types/NoSchema.svelte"
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()

  export let schema;
  export let valid;

  const resolveType = schema => {
    if (!schema) return NoSchema
    return {
      'number': NumberFields,
      'string': StringFields,
    }[schema.type]
  }

  $: dispatch('change', {schema})
</script>

<svelte:component this={resolveType(schema)} bind:schema bind:valid/>