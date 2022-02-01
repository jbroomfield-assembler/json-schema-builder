<script>
  import { getArrayDimension, getItemSchema } from "../../nestedSchemas"
  import Component from "../Component.svelte"
  export let schema;
  let arrayDimension = getArrayDimension(schema)
  let itemSchema, itemType, displayType;
  $: {
    itemSchema = getItemSchema(schema)
    itemType = itemSchema?.type
    displayType = `${arrayDimension > 1 ? `${arrayDimension}-dimensional ` : ''}array of ${itemType}s`
  }
</script>

{#if (schema.minItems != null)}
  <p>Minimum number of items: {schema.minItems}</p>
{/if}

{#if (schema.maxItems != null)}
  <p>Maximum number of items: {schema.maxItems}</p>
{/if}

{#if (schema.uniqueItems)}
  <p>Items must be unique</p>
{/if}

{#if (schema.items.type)}
  <Component schema={schema.items} arrayItem={true} />
{/if}