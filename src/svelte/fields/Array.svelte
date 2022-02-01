<script>

  import buildSchema from "../../buildSchema.js"

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
      if (!Number.isInteger(amx)) return false
    }
    return true
  }

  const validate = () => {
    valid = schemaValid()
  }

  const buildItemSchema = event => {
    schema.items = buildSchema({
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
    on:change={buildItemSchema}
  >
    <option disabled="disabled" value={undefined}>Type</option> 
    <option value="string">String</option> 
    <option value="number">Number</option>
    <option value="boolean">Boolean</option>
    <option value="array">Array</option>
    <option value="object">Object</option>
  </select>
</div>

<div class="form-control">
  <label for="min-items" class="label">
    <span class="label-text">Minimum number of items</span>
  </label> 
  <input
    id="min-items"
    type="number"
    min="0"
    placeholder="Minimum number of items"
    class="input input-bordered"
    bind:value={schema.minItems}
    on:change={validate}
  >
</div>

<div class="form-control">
  <label for="max-items" class="label">
    <span class="label-text">Maximum number of items</span>
  </label> 
  <input
    id="max-items"
    type="number"
    min="1"
    placeholder="Maximum number of items"
    class="input input-bordered"
    bind:value={schema.maxItems}
    on:change={validate}
  >
</div>

<div class="form-control">
  <label class="cursor-pointer label">
    <span class="label-text">Items must be unique</span> 
    <input
      type="checkbox"
      class="checkbox"
      bind:checked={schema.uniqueItems}
    >
  </label>
</div>