<script>

  import buildSchema from "../../buildSchema.js"

  export let schema;
  
  let itemType = null

  const buildItemSchema = () => {
    schema.items = buildSchema({
      type: itemType,
      id: `${schema["$id"]}/items`
    })
  }
</script>

<div class="form-control">
  <label for="new-property-type" class="label">
    <span class="label-text">Type</span>
  </label> 
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    class="select select-bordered w-full max-w-xs"
    bind:value={itemType}
    on:change={buildItemSchema}
  >
    <option disabled="disabled" value={null}>Type</option> 
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
  >
</div>

<div class="form-control">
  <label class="cursor-pointer label">
    <span class="label-text">Items must be unique</span> 
    <input
      type="checkbox"
      class="checkbox"
      bind:checked={schema.minItems}
    >
  </label>
</div>