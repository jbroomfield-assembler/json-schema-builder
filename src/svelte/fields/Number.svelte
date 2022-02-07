<script>
  import NumberInputFields from "./helpers/number_input.svelte"
  import SelectFields from "./helpers/select.svelte"

  import Checkbox from "../forms/Checkbox.svelte"
  
  export let schema;
  export let valid;
  
  const handleDefineOptionsChange = event => {
    delete schema.default
    if (schema.enum) {
      delete schema.enum
      valid = true
    } else {
      schema.enum ||= [null, null, null]
      delete schema.multipleOf
      delete schema.maximum
      delete schema.exclusiveMaximum
      delete schema.minimum
      delete schema.exclusiveMinimum
      valid = false
    }
  }
</script>

<Checkbox
  label="Define options"
  on:change={handleDefineOptionsChange}
/>

{#if (schema.enum == null)}
  <NumberInputFields bind:schema bind:valid/>
{:else}
  <SelectFields bind:schema bind:valid inputType="number" />
{/if}