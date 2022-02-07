<script>
  import NumberFields from "./fields/number.svelte"
  import StringFields from "./fields/string.svelte"
  import BooleanFields from "./fields/boolean.svelte"
  import ArrayFields from "./fields/array.svelte"
  import ObjectFields from "./fields/object.svelte"
  import NewPropertyFields from "./fields/new_property.svelte"

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()

  export let schema;
  export let valid;

  const resolve = schema => {
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

{#if (schema?.type)}
  <svelte:component this={resolve(schema)} bind:schema bind:valid />
{/if}