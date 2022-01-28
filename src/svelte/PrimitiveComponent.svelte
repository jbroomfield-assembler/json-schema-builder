<script>
  import Summary from './Summary.svelte'
  import Modal from './Modal.svelte'
  export let schema;
  export let valid = true;
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
  <p>Type: {schema.type}</p>
  <p>Code: {schema.code}</p>
  <div class="form-control">
    <label for="description" class="label">
      <span class="label-text">Description</span>
    </label> 
    <input
      id="description"
      type="text"
      placeholder="Description"
      class="input input-bordered"
      bind:value={schema.description}
    >
  </div>
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Required</span> 
      <input type="checkbox" class="checkbox" bind:checked={schema.required}>
    </label>
  </div>
  <slot></slot>
</Modal>