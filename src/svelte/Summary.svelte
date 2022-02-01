<script>
  import NoSchema from "./types/NoSchema.svelte";
  import StringSummary from "./summaries/String.svelte";
  import NumberSummary from "./summaries/Number.svelte";
  import BooleanSummary from "./summaries/Boolean.svelte";
  import ArraySummary from "./summaries/Array.svelte";
  import ObjectSummary from "./summaries/Object.svelte";
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

<div class="my-2 p-4 card bg-base-200 card-bordered border-black">
  <div class="card-body">

    <h2 class="card-title">{schema.title} ({schema.type})</h2>
    {#if (schema.code)}
      <p>Code: {schema.code}</p>
    {/if}
    {#if (schema.description)}
      <p>Description: {schema.description}</p>
    {/if}

    <div class="my-2">
      <button class="btn btn-warning" on:click={edit}>Edit</button>
      {#if !schema["$schema"] && !arrayItem}
        <button class="btn btn-error" on:click={deleteProperty}>Delete</button>
      {/if}
    </div>

    <svelte:component this={resolve(schema)} bind:schema {arrayItem} />
    
  </div>
</div>