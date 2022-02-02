<script>
  import Checkbox from "../forms/Checkbox.svelte"
  import NumberInput from "../forms/NumberInput.svelte"

  export let schema;
  export let valid;
  export let activeTab;

  const validMin = () => {
    const min = schema.minProperties
    if (min == null) return true
    if (min < 0) return false
    return Number.isInteger(min)
  }

  const validMax = () => {
    const max = schema.maxProperties
    if (max == null) return true
    if (max < 1) return false
    return Number.isInteger(max)
  }

  const validateSchema = () => {
    valid = validMin() && validMax()
  }

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

{#if activeTab === 0}
  <Checkbox
    label="Allow additional properties"
    bind:checked={schema.additionalProperties}
  />

  <NumberInput
    label="Minimum number of properties"
    min=0
    bind:value={schema.minProperties}
    on:change={validateSchema}
  />

  <NumberInput
    label="Minimum number of properties"
    min=1
    bind:value={schema.minProperties}
    on:change={validateSchema}
  />
{:else if activeTab === 1}
  <h2>Required properties</h2>
  {#each Object.keys(schema.properties) as property}
    <Checkbox
      label={property}
      checked={schema.required.includes(property)}
      on:change={toggleRequiredProperty(property)}
    />
  {/each}
{/if}