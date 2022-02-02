<script>
  import NumberInputFields from "./helpers/NumberInput.svelte"
  import SelectFields from "./helpers/Select.svelte"

  import Checkbox from "../forms/Checkbox.svelte"
  
  export let schema;
  export let valid;
  
  const handleDefineOptionsChange = event => {
    if (schema.enum) {
      delete schema.enum
      valid = true
    } else {
      schema.enum ||= [null, null, null]
      delete schema.default
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