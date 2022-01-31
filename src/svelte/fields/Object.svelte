<script>
  export let schema;
  export let valid;

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

  const validate = () => {
    valid = validMin() && validMax()
  }

</script>

<div class="form-control">
  <label class="cursor-pointer label">
    <span class="label-text">Allow additional properties</span> 
    <input type="checkbox" class="checkbox" bind:checked={schema.additionalProperties}>
  </label>
</div>

<div class="form-control">
  <label for="min-propertiesf" class="label">
    <span class="label-text">Minimum number of properties</span>
  </label> 
  <input
    id="min-properties"
    type="number"
    min="0"
    placeholder="Minimum number of properties"
    class="input input-bordered"
    bind:value={schema.minProperties}
    on:change={validate}
  >
</div>

<div class="form-control">
  <label for="max-properties" class="label">
    <span class="label-text">Maximum number of properties</span>
  </label> 
  <input
    id="max-properties"
    type="number"
    min="1"
    placeholder="Maximum number of properties"
    class="input input-bordered"
    bind:value={schema.maxProperties}
    on:change={validate}
  >
</div>