<script>
  import Component from "../Component.svelte";
  import Modal from "../Modal.svelte";
  import Fields from "../Fields.svelte";

  import buildSchema from "../../buildSchema.js"

  export let schema = {};
  
  let newPropertySchema = {};
  let newPropertySchemaValid = false;
  let modalOpen = false;
  
  const openModal = () => {
    newPropertySchema = buildSchema({type: 'new-property'})
    modalOpen = true
  }

  const addProperty = () => {
    newPropertySchema.properties.id = `${schema["$id"]}/properties/${newPropertySchema.properties.code}`
    schema.properties[newPropertySchema.properties.code] = buildSchema(newPropertySchema.properties)
    newPropertySchema = null
  }

  const handleCancel = () => newPropertySchema = null

  const handleDeleteProperty = event => {
    delete schema.properties[event.detail.code]
    schema = schema
  }
</script>


  <button
    class="btn btn-primary w-36" on:click={openModal}>Add Property</button>
	{#each Object.keys(schema.properties) as key (key)}
		<Component bind:schema={schema.properties[key]} on:deleteProperty={handleDeleteProperty} />
	{/each}

<Modal
  bind:open={modalOpen}
  valid={newPropertySchemaValid}
  on:done={addProperty}
  on:cancel={handleCancel}
>
  <Fields bind:schema={newPropertySchema} bind:valid={newPropertySchemaValid} />
</Modal>