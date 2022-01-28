<script>
  import Summary from '../Summary.svelte'
  import Modal from '../Modal.svelte'
  export let schema;
  let valid = true;
  let modalOpen
  if (schema.new) {
    modalOpen = true
    delete schema.new
    schema = schema
  } else {
    modalOpen = false
  }
  let pristineSchema = JSON.parse(JSON.stringify(schema));
  const openModal = () => modalOpen = true
  const handleDone = () => pristineSchema = schema
  const handleCancel = () => schema = pristineSchema
  const getArrayDimension = schema => (
    schema.type === 'array' ? 1 + getArrayDimension(schema.items) : 0
  )
  const getItemType = schema => (
    schema.type === 'array' ? getItemType(schema.items) : schema.type
  )
  const arrayDimension = getArrayDimension(schema)
  const displayDimension = arrayDimension === 1 ? '' : `${arrayDimension}-dimensional `
  const itemType = getItemType(schema)
  const displayType = `${displayDimension}array of ${itemType}s`
  let activeTab = 0
  const getValue = (schema, depth, key) => {
    if (depth === 0) {
      return schema[key]
    }
    return getValue(schema.items, depth - 1, key)
  }
  const setValue = (schema, depth, key, value) => {
    if (depth === 0) {
      schema[key] = value
    } else {
      schema.items = setValue(schema.items, depth - 1, key, value)
    }
    return schema
  }
</script>

<Summary {schema} on:deleteProperty on:edit={openModal} {displayType} />
<Modal
  bind:open={modalOpen}
  {valid}
  on:done={handleDone}
  on:cancel={handleCancel}
>

  <h1>{schema.title}</h1>
  <p>Type: {displayType}</p>
  <p>Code: {schema.code}</p>
  <div class="tabs">
    {#each Array(arrayDimension) as _, i}
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        class="tab tab-bordered{activeTab === i ? " tab-active" : ""}"
        on:click={() => activeTab = i}
      >array</a>
    {/each} 
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      class="tab tab-bordered {activeTab === arrayDimension ? " tab-active" : ""}"
      on:click={() => activeTab = arrayDimension}
    >{itemType}</a> 
  </div>

  {#if activeTab < arrayDimension}
    <div class="form-control">
      <label for="max-items" class="label">
        <span class="label-text">Maximum number of items</span>
      </label> 
      <input
        id="max-items"
        type="number"
        min="1"
        placeholder="Maximum number of items"
        class="input input-bordered"
        value={getValue(schema, activeTab, 'maxItems')}
        on:change={event => schema = setValue(schema, activeTab, 'maxItems', event.target.value)}
      >
    </div>
    
    <div class="form-control">
      <label for="min-items" class="label">
        <span class="label-text">Minimum number of items</span>
      </label> 
      <input
        id="min-items"
        type="number"
        min="0"
        placeholder="Minimum number of items"
        class="input input-bordered"
        value={getValue(schema, activeTab, 'minItems')}
        on:change={event => schema = setValue(schema, activeTab, 'minItems', event.target.value)}
      >
    </div>

  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Items must be unique</span> 
      <input
        type="checkbox"
        class="checkbox"
        checked={getValue(schema, activeTab, 'uniqueItems')}
        on:change={event => schema = setValue(schema, activeTab, 'uniqueItems', event.target.checked)}
      >
    </label>
  </div>
  {/if}
</Modal>