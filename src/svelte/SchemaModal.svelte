<script>
  import Modal from "./Modal.svelte"
  import Fields from "./Fields.svelte"

  import Checkbox from "./forms/Checkbox.svelte"

  export let schema = {};
  export let open;
  export let required;
  let valid = true;
  let pristineSchema;
  
  const setPristineSchema = () => pristineSchema = JSON.parse(JSON.stringify(schema))
  const revertSchema = () => schema = JSON.parse(JSON.stringify(pristineSchema))

  $: {
    if (schema.new) {
      delete schema.new
      schema = schema
      open = true
    }
  }

  $: if (open) setPristineSchema()

</script>

<Modal
  bind:open
  {valid}
  on:done={setPristineSchema}
  on:cancel={revertSchema}
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

  {#if required != null}
    <Checkbox
      label="Required"
      bind:checked={required}
    />
  {/if}

  <Fields bind:schema bind:valid />
</Modal>