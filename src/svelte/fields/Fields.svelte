<script>
  import NumberFields from "./Number.svelte"
  import StringFields from "./String.svelte"
  import BooleanFields from "./Boolean.svelte"
  import NewPropertyFields from "./NewProperty.svelte"
  import NoSchema from "../types/NoSchema.svelte"
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()

  export let schema;
  export let valid;

  const resolve = schema => {
    if (!schema) return NoSchema
    return {
      'number': NumberFields,
      'string': StringFields,
      'boolean': BooleanFields,
      'new-property': NewPropertyFields,
    }[schema.type]
  }

  $: dispatch('change', {schema})
</script>

<svelte:component this={resolve(schema)} bind:schema bind:valid/>