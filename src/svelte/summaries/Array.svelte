<script>
  import { getArrayDimension, getItemSchema } from "../../nestedSchemas"
  import Summary from "../Summary.svelte"
  export let schema;
  export let arrayItem;
  let arrayDimension = getArrayDimension(schema)
  let itemSchema, itemType, displayType;
  $: {
    itemSchema = getItemSchema(schema)
    itemType = itemSchema?.type
    displayType = `${arrayDimension > 1 ? `${arrayDimension}-dimensional ` : ''}array of ${itemType}s`
  }
</script>

{#if arrayItem}
  <p><strong>array</strong></p>
{:else}
  <p>
    {schema.title} ({displayType})
  </p>
{/if}

{#if (schema.description != null && schema.description.length > 0)}
  <p>Description: {schema.description}</p>
{/if}

{#if (schema.minItems != null)}
  <p>Minimum number of items: {schema.minItems}</p>
{/if}

{#if (schema.maxItems != null)}
  <p>Maximum number of items: {schema.maxItems}</p>
{/if}

{#if (schema.uniqueItems)}
  <p>Items must be unique</p>
{/if}

<Summary schema={schema.items} arrayItem={true} />