<script>
  import NoSchema from "./summaries/NoSchema.svelte"
  import StringSummary from "./summaries/String.svelte"
  import NumberSummary from "./summaries/Number.svelte"
  import BooleanSummary from "./summaries/Boolean.svelte"
  import ArraySummary from "./summaries/Array.svelte"
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

  const resolveSummary = schema => {
    if (!schema || !schema.type) return NoSchema
    return {
      'string': StringSummary,
      'number': NumberSummary,
      'boolean': BooleanSummary,
      'array': ArraySummary,
    }[schema.type]
  }

</script>

<svelte:component this={resolveSummary(schema)} {schema} {arrayItem} />

{#if !arrayItem}
  <div class="my-2">
    <button class="btn btn-warning" on:click={edit}>Edit</button>
    <button class="btn btn-error" on:click={deleteProperty}>Delete</button>
  </div>
{/if}