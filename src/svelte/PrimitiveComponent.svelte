<script>
  import Summary from './Summary.svelte'
  import Modal from './Modal.svelte'
  export let schema;
  export let valid = true;
  let pristineSchema = JSON.parse(JSON.stringify(schema));
  let modalOpen
  if (schema.new) {
    modalOpen = true
    delete schema.new
    schema = schema
  } else {
    modalOpen = false
  }
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
  <p>Type: {schema.type}</p>
  <p>Code: {schema.code}</p>
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Required</span> 
      <input type="checkbox" class="checkbox" bind:checked={schema.required}>
    </label>
  </div>
  <slot></slot>
</Modal>