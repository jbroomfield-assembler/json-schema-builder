<script>
  import Checkbox from "../../../forms/Checkbox.svelte"

  export let schema;

  const toggleRequiredProperty = property => {
    const index = schema.required.indexOf(property)
    if (index < 0) {
      schema.required = [
        ...schema.required,
        property,
      ]
    } else {
      schema.required = [
        ...schema.required.slice(0, index),
        ...schema.required.slice(index + 1),
      ]
    }
    schema = schema
  }
</script>

<h2>Required properties</h2>
{#each Object.keys(schema.properties) as property}
  <Checkbox
    label={property}
    checked={schema.required.includes(property)}
    on:change={toggleRequiredProperty(property)}
  />
{/each}