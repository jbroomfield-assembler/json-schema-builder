<script>
  import NumberFields from "./fields/Number.svelte"
  import StringFields from "./fields/String.svelte"
  import BooleanFields from "./fields/Boolean.svelte"
  import ArrayFields from "./fields/Array.svelte"
  import ObjectFields from "./fields/Object.svelte"
  import NewPropertyFields from "./fields/NewProperty.svelte"
  import NoSchema from "./types/NoSchema.svelte"
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()

  export let schema;
  export let valid;

  export let rootArray = true;

  const resolve = schema => {
    if (!schema) return NoSchema
    return {
      'number': NumberFields,
      'string': StringFields,
      'boolean': BooleanFields,
      'array': ArrayFields,
      'object': ObjectFields,
      'new-property': NewPropertyFields,
    }[schema.type]
  }

  $: dispatch('change', {schema})
</script>

<svelte:component this={resolve(schema)} bind:schema bind:valid {rootArray} />