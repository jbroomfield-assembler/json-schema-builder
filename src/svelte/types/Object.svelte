<script>
	import Component from '../Component.svelte';
  import Modal from '../Modal.svelte';
  import buildSchema from '../../buildSchema';
  export let schema;
  let newPropertySchema
  const newPropertySchemaValid = (newPropertySchema) => (
    newPropertySchema &&
    !(Object.values(newPropertySchema.properties).includes('')) &&
    newPropertySchema.itemType !== ''
  )
  let modalOpen = false
  const openModal = () => {
    newPropertySchema = buildSchema({type: 'new-property'})
    modalOpen = true
  }

	const addProperty = () => {
    schema.properties[newPropertySchema.properties.code] = buildSchema(newPropertySchema.properties)
    newPropertySchema = undefined
	}
  const handleCancel = () => newPropertySchema = null
  const handleDeleteProperty = event => {
    delete schema.properties[event.detail.code]
    schema = schema
  }
</script>

<Modal
  bind:open={modalOpen}
  valid={newPropertySchemaValid(newPropertySchema)}
  on:done={addProperty}
  on:cancel={handleCancel}
>
  <Component bind:schema={newPropertySchema} />
</Modal>

<div class="p-10 card bg-base-200">
  <button
    class="btn btn-primary w-36" on:click={openModal}>Add Property</button>
	{#each Object.keys(schema.properties) as key (key)}
		<Component bind:schema={schema.properties[key]} on:deleteProperty={handleDeleteProperty} />
	{/each}
</div>

<div><pre>{JSON.stringify(newPropertySchema, null, '\t')}</pre></div>
<br>-----<br><br>