<script>
  export let schema;
</script>

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