<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  export let schema;

  const validMaxLength = schema => {
    if (schema.maxLength == null) return true
    if (schema.maxLength < 1) return false
    return Number.isInteger(schema.maxLength)
  }

  const validMinLength = schema => {
    if (schema.minLength == null) return true
    if (schema.minLength < 0) return false
    if (schema.maxLength != null && schema.minLength > schema.maxLength) return false
    return Number.isInteger(schema.maxLength)
  }

  const validDefault = schema => {
    if (schema.default == null) return true
    if (schema.maxLength != null && schema.default.length > schema.maxLength) return false
    if (schema.minLength != null && schema.default.length < schema.minLength) return false
    return true
  }

  const valid = schema => {
    return (
      validMaxLength(schema) &&
      validMinLength(schema) &&
      validDefault(schema)
    )
  }

</script>

<PrimitiveComponent bind:schema on:deleteProperty valid={valid(schema)}>
  
  <div class="form-control">
    <label for="default" class="label">
      <span class="label-text">Default</span>
    </label> 
    <input id="default" type="text" placeholder="Default" class="input input-bordered" bind:value={schema.default}>
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
      >
    </div>

  <div class="form-control">
    <label for="min-length" class="label">
      <span class="label-text">Minimum length</span>
    </label> 
    <input
      id="min-length"
      type="number"
      placeholder="Minimum length"
      class="input input-bordered"
      bind:value={schema.minLength}
    >
  </div>

  <div class="form-control">
    <label for="min-length" class="label">
      <span class="label-text">Minimum length</span>
    </label> 
    <input
      id="min-length"
      type="number"
      placeholder="Minimum length"
      class="input input-bordered"
      bind:value={schema.minLength}
    >
  </div>

</PrimitiveComponent>