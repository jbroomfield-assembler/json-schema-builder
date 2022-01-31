<script>
  import NoSchema from "./NoSchema.svelte";
  import StringSummary from "./String.svelte";
  import NumberSummary from "./Number.svelte";
  import BooleanSummary from "./Boolean.svelte";
  import ArraySummary from "./Array.svelte";
  import ObjectSummary from "./Object.svelte";
  import { createEventDispatcher } from 'svelte';
  export let schema;
  export let arrayItem = false;
  const dispatch = createEventDispatcher();

  const edit = () => {
    dispatch('edit')
  }

  const deleteProperty = () => {
    dispatch('deleteProperty', {
      code: schema.code,
    })
  }

  const resolve = schema => {
    if (!schema || !schema.type) return NoSchema
    return {
      'string': StringSummary,
      'number': NumberSummary,
      'boolean': BooleanSummary,
      'array': ArraySummary,
      'object': ObjectSummary,
    }[schema.type]
  }

</script>

<svelte:component this={resolve(schema)} bind:schema {arrayItem} />

{#if !arrayItem && schema && !schema["$schema"]}
  <div class="my-2">
    <button class="btn btn-warning" on:click={edit}>Edit</button>
    <button class="btn btn-error" on:click={deleteProperty}>Delete</button>
  </div>
{/if}