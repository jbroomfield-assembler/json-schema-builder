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
</script>

<Summary {schema} on:deleteProperty on:edit={openModal} />
<Modal
  bind:open={modalOpen}
  {valid}
  on:done={handleDone}
  on:cancel={handleCancel}
>
  <h1>{schema.title}</h1>
  <p>Type: array{schema.items != null ? ` of ${schema.items.type}s` : ''}</p>
  <p>Code: {schema.code}</p>
</Modal>