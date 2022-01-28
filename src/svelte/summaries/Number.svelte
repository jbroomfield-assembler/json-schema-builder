<script>
  export let schema;
  export let arrayItem;
</script>

{#if arrayItem}
  <p><strong>Items: number</strong></p>
{:else}
  <p>
    {schema.title} (number)
  </p>
{/if}

{#if (schema.description != null && schema.description.length > 0)}
  <p>Description: {schema.description}</p>
{/if}

{#if !arrayItem}
  <p>Required: {schema.required}</p>
{/if}

{#if (schema.default != null)}
  <p>Default: {schema.default}</p>
{/if}

{#if schema.enum == null}

  {#if (schema.multipleOf != null)}
    <p>Multiples of {schema.multipleOf}</p>
  {/if}

  {#if (schema.minimum != null)}
    <p>Minimum: {schema.minimum}</p>
  {:else if (schema.exclusiveMinimum != null)}
    <p>Exclusive minimum: {schema.exclusiveMinimum}</p>
  {/if}

  {#if (schema.maximum != null)}
    <p>Maximum: {schema.maximum}</p>
  {:else if (schema.exclusiveMaximum != null)}
    <p>Exclusive maximum: {schema.exclusiveMaximum}</p>
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