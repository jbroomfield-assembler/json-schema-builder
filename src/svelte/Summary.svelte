<script>
  import StringSummary from "./summaries/string.svelte";
  import NumberSummary from "./summaries/number.svelte";
  import BooleanSummary from "./summaries/boolean.svelte";
  import ArraySummary from "./summaries/array.svelte";
  import ObjectSummary from "./summaries/object.svelte";
  import { createEventDispatcher } from 'svelte';
  export let schema;
  export let arrayItem = false;
  export let required = null;
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
    return {
      'string': StringSummary,
      'number': NumberSummary,
      'boolean': BooleanSummary,
      'array': ArraySummary,
      'object': ObjectSummary,
    }[schema.type]
  }

  let displayType
  if (schema.type === 'string') {
    displayType = schema.format || 'text'
  } else {
    displayType = schema.type
  }

</script>

<div class="my-2 p-4 card bg-base-200 card-bordered border-black">
  <div class="card-body">

    <h2 class="card-title">{schema.title} ({displayType})</h2>

    {#if (schema.code)}
      <p>Code: {schema.code}</p>
    {/if}
    
    {#if (schema.description)}
      <p>Description: {schema.description}</p>
    {/if}

    {#if (required)}
      <p>Required.</p>
    {/if}

    <svelte:component this={resolve(schema)} bind:schema />

    <div class="my-2">
      <button class="btn btn-warning" on:click={edit}>Edit</button>
      {#if !schema["$schema"] && !arrayItem}
        <button class="btn btn-error" on:click={deleteProperty}>Delete</button>
      {/if}
    </div>
    
  </div>
</div>