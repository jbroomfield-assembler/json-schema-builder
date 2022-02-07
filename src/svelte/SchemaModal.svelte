<script>
  import Modal from "./shared/modal.svelte"
  import Fields from "./Fields.svelte"

  import Checkbox from "./forms/checkbox.svelte"

  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let schema = {};
  // export let open;
  export let required = false;
  export let size = 'small'

  let modal;
  export let valid = true;
  let pristineSchema;

  export const open = () => {
    setPristineSchema()
    modal?.open()
  }

  export const close = () => {
    modal?.close()
  }
  
  const setPristineSchema = () => pristineSchema = JSON.parse(JSON.stringify(schema))
  const revertSchema = () => schema = JSON.parse(JSON.stringify(pristineSchema))

  const handleDone = () => {
    modal.close()
    setPristineSchema()
    dispatch("done")
  }

  const handleCancel = () => {
    modal.close()
    revertSchema()
    dispatch("cancel")
  }

  let displayType
  if (schema.type === 'string') {
    displayType = schema.format || 'text'
  } else {
    displayType = schema.type
  }

  $: {
    if (schema?.new && modal) {
      delete schema.new
      schema = schema
      modal.open()
    }
  }

</script>

<Modal bind:this={modal} {size}>
  {#if schema.type != "new-property"}
    <h1>{schema.title}</h1>
    <p>Type: {displayType}</p>
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
  {/if}
  <Fields bind:schema bind:valid />

  <div class="modal-action">
    <button
      class="btn btn-primary"
      disabled={!valid}
      on:click={handleDone}
    >Done</button> 
    <button class="btn" on:click={handleCancel}>Cancel</button>
  </div>
  
</Modal>