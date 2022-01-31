<script>
  export let schema;
  export let valid;

  const validMaxLength = schema => {
    const max = schema.maxLength
    if (max == null) return true
    if (max < 1) return false
    return Number.isInteger(max)
  }

  const validMinLength = schema => {
    const min = schema.minLength, max = schema.maxLength
    if (min == null) return true
    if (min < 0) return false
    if (max != null && min > max) return false
    return Number.isInteger(min)
  }

  const validDefault = schema => {
    const def = schema.default,
          max = schema.maxLength, min = schema.minLength
    if (def == null) return true
    if (max != null && def.length > max) return false
    if (min != null && def.length < min) return false
    return true
  }

  const validate = () => {
    if (schema.default === "") {
      schema.default = null
      schema = schema
    }
    valid = (
      validMaxLength(schema) &&
      validMinLength(schema) &&
      validDefault(schema)
    )
  }
</script>

<div class="form-control">
  <label for="default" class="label">
    <span class="label-text">Default</span>
  </label> 
  <input
    id="default"
    type="text"
    placeholder="Default"
    class="input input-bordered"
    bind:value={schema.default}
    on:change={() => validate(schema)}
  >
</div>

<div class="form-control">
  <label for="min-length" class="label">
    <span class="label-text">Minimum length</span>
  </label> 
  <input
    id="min-length"
    type="number"
    min="0"
    placeholder="Minimum length"
    class="input input-bordered"
    bind:value={schema.minLength}
    on:change={() => validate(schema)}
  >
</div>

<div class="form-control">
  <label for="max-length" class="label">
    <span class="label-text">Maximum length</span>
  </label> 
  <input
    id="max-length"
    type="number"
    min="1"
    placeholder="Maximum length"
    class="input input-bordered"
    bind:value={schema.maxLength}
    on:change={() => validate(schema)}
  >
</div>