<script>
  export let schema;
  export let arrayItem;
</script>

{#if !arrayItem}
  <p>Required: {schema.required}</p>
{/if}

{#if (schema.default != null && schema.default.length > 0)}
  <p>Default: {schema.default}</p>
{/if}

{#if schema.enum == null}

  {#if (schema.minLength != null)}
    <p>Minimum length: {schema.minLength}</p>
  {/if}

  {#if (schema.maxLength != null)}
    <p>Maximum length: {schema.maxLength}</p>
  {/if}

{:else}

  <div class="form-control">
    <label for="options" class="label">
      <span class="label-text">Options</span>
    </label> 
    <select
      id="default"
      class="select select-bordered"
    >
      <option disabled="disabled" selected="selected">Options</option> 
      {#each schema.enum as option}
        <option>{option}</option>
      {/each}
    </select>
  </div>

{/if}