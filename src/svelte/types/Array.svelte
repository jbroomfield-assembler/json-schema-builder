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
</Modal>