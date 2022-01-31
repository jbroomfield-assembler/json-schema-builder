<script>
  import Modal from "./Modal.svelte"
  import Fields from "./Fields.svelte"
  export let schema = {};
  export let open;
  let valid = true;
  let pristineSchema = JSON.parse(JSON.stringify(schema));

  if (schema.new) {
    delete schema.new
    schema = schema
    open = true
  }

  const handleDone = () => pristineSchema = JSON.parse(JSON.stringify(schema))
  const handleCancel = () => schema = JSON.parse(JSON.stringify(pristineSchema))

</script>

<Modal
  bind:open
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
      class="input input-bordered w-full"
      bind:value={schema.description}
    >
  </div>
  <Fields bind:schema bind:valid />
</Modal>