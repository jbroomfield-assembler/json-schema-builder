<script>
  import Modal from "../../shared/modal.svelte"
  import Fields from "./fields.svelte"

  import TextInput from "../../../components/editor/form/text.svelte"
  import Checkbox from "../../../components/editor/form/checkbox.svelte"

  import getTypeDisplay from "./helpers/getTypeDisplay";

  import { createEventDispatcher } from "svelte"
  
  const dispatch = createEventDispatcher()

  export let schema = {};
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

  
  const typeDisplay = getTypeDisplay(schema)

  $: {
    if (schema?.new && modal) {
      delete schema.new
      schema = schema
      open()
    }
  }

</script>

<Modal bind:this={modal} {size}>
  {#if schema.type != "new-property"}
    <h1>{schema.title}</h1>
    <p>Type: {typeDisplay}</p>
    <p>Code: {schema.code}</p>

    <TextInput
      label="Description"
      placeholder="Description"
      bind:value={schema.description}
    />

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