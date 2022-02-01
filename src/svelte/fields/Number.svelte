<script>
  import NumberInputFields from "./helpers/NumberInput.svelte"
  import SelectFields from "./helpers/Select.svelte"

  import Checkbox from "../forms/Checkbox.svelte"
  
  export let schema;
  export let valid;
  
  const handleDefineOptionsChange = event => {
    if (event.target.checked) {
      schema.enum ||= [null, null, null]
      schema.default = null
      schema.multipleOf = null
      schema.maximum = null
      schema.exclusiveMaximum = null
      schema.minimum = null
      schema.exclusiveMinimum = null
      valid = false
    } else {
      schema.enum = null
      valid = true
    }
  }
</script>

<Checkbox
  label="Required"
  bind:checked={schema.required}
/>

<Checkbox
  label="Define options"
  on:change={handleDefineOptionsChange}
/>

{#if (schema.enum == null)}
  <NumberInputFields bind:schema bind:valid/>
{:else}
  <SelectFields bind:schema bind:valid inputType="number" />
{/if}