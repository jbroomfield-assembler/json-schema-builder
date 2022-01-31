<script>

  import Fields from "./Fields.svelte"
  import ArrayAttributesFields from "./ArrayAttributes.svelte"

  export let schema;
  // export let valid;
  export let rootArray = true;

  const getArrayDimension = schema => (
    schema.type === 'array' ? 1 + getArrayDimension(schema.items) : 0
  )

  const getItemSchema = schema => (
    schema.type === 'array' ? getItemSchema(schema.items) : schema
  )

  const setItemSchema = (itemSchema, _schema = schema) => {
    if (_schema.items.type === 'array') {
      _schema = setItemSchema(itemSchema, _schema.items)
    } else {
      _schema.items = itemSchema
    }
    return _schema
  }

  const arrayDimension = getArrayDimension(schema)
  const displayDimension = arrayDimension === 1 ? '' : `${arrayDimension}-dimensional `
  let itemSchema = getItemSchema(schema)
  const itemType = itemSchema && itemSchema.type
  const displayType = `${displayDimension}array of ${itemType}s`
  let activeTab = 0
  const getValue = (schema, depth, key) => {
    if (depth === -1) {
      return schema
    }
    if (depth === 0) {
      return schema[key]
    }
    return getValue(schema.items, depth - 1, key)
  }
  const setValue = (schema, depth, key, value) => {
    if (depth === -1) {
      schema = value
    } else if (depth === 0) {
      schema[key] = value
    } else {
      schema.items = setValue(schema.items, depth - 1, key, value)
    }
    schema = schema
    return schema
  }

  const handleItemSchemaChange = event => {
    schema = setValue(schema, arrayDimension - 1, 'items', event.detail.schema)
  } 

</script>


{#if (rootArray)}
  <div class="tabs">
    {#each Array(arrayDimension) as _, i}
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        class="tab tab-bordered"
        class:tab-active={activeTab === i}
        on:click={() => activeTab = i}
      >array</a>
    {/each} 
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      class="tab tab-bordered"
      class:tab-active={activeTab === arrayDimension}
      on:click={() => activeTab = arrayDimension}
    >{itemType}</a> 
  </div>
  <Fields
    schema={getValue(schema, activeTab - 1, 'items')}
    rootArray={false}
  />
{:else}
  <ArrayAttributesFields bind:schema />
{/if}