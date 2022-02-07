<script>
  import Component from "../component.svelte";
  import SchemaModal from "../schema_modal.svelte";
  import Fields from "../fields.svelte";

  import newSchema from "../new_schema.js"

  export let schema = {};
  
  let modal;
  let modalSize = "small";
  let newPropertySchema = {};
  let newPropertySchemaValid = false;
  
  const openModal = () => {
    newPropertySchema = newSchema({type: 'new-property'})
    modal.open()
  }

  const addProperty = () => {
    newPropertySchema.properties.id = `${schema["$id"]}/properties/${newPropertySchema.properties.code}`
    schema.properties[newPropertySchema.properties.code] = newSchema(newPropertySchema.properties)
    newPropertySchema = {}
  }

  const handleCancel = () => newPropertySchema = {}

  const handleSetRequired = (key, required) => {
    const index = schema.required.indexOf(key)
    if (required) {
      if (index < 0) {
        schema.required = [
          ...schema.required,
          key,
        ]
      }
    } else if (index >= 0) {
      schema.required = [
        ...schema.required.slice(0, index),
        ...schema.required.slice(index + 1),
      ]
    }
    schema = schema;
  }

  const handleDeleteProperty = event => {
    delete schema.properties[event.detail.code]
    schema = schema
  }
</script>

<button class="btn btn-primary w-36" on:click={openModal}>Add Property</button>

{#each Object.keys(schema.properties) as key (key)}
  {#if schema.properties[key]}
    <Component
      bind:schema={schema.properties[key]}
      required={schema.required.includes(key)}
      on:setRequired={event => handleSetRequired(key, event.detail.required)}
      on:deleteProperty={handleDeleteProperty}
    />
  {/if}
{/each}

<SchemaModal
  bind:this={modal}
  bind:schema={newPropertySchema}
  bind:valid={newPropertySchemaValid}
  size={modalSize}
  on:done={addProperty}
  on:cancel={handleCancel}
/>