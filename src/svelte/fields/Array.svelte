<script>

  import newSchema from "../../newSchema.js"
  import NumberInput from "../forms/NumberInput.svelte"
  import Checkbox from "../forms/Checkbox.svelte"

  export let schema;
  export let valid;

  const schemaValid = () => {
    const min = schema.minItems,
          max = schema.maxItems;
    if (min != null) {
      if (min < 0) return false
      if (!Number.isInteger(min)) return false
      if (max != null && max < min) return false
    }
    if (max != null) {
      if (max < 1) return false
      if (!Number.isInteger(max)) return false
    }
    return true
  }

  const validate = () => {
    valid = schemaValid()
  }

  const newItemSchema = event => {
    schema.items = newSchema({
      type: event.target.value,
      id: `${schema["$id"]}/items`
    })
    validate()
  }
</script>

<div class="form-control">
  <label for="new-property-type" class="label">
    <span class="label-text">Type</span>
  </label> 
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    class="select select-bordered w-full max-w-xs"
    value={schema?.items?.type}
    on:change={newItemSchema}
  >
    <option disabled="disabled" value={undefined}>Type</option> 
    <option value="string">String</option> 
    <option value="number">Number</option>
    <option value="boolean">Boolean</option>
    <option value="array">Array</option>
    <option value="object">Object</option>
  </select>
</div>

<NumberInput
  label="Minimum number of items"
  bind:value={schema.minItems}
  min=0
  on:change={validate}
/>

<NumberInput
  label="Maximum number of items"
  bind:value={schema.maxItems}
  min=1
  on:change={validate}
/>

<Checkbox
  label="Items must be unique"
  bind:checked={schema.uniqueItems}
/>