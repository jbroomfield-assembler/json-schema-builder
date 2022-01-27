<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  import NumberInputFields from "./NumberInputFields.svelte"
  import SelectFields from "./SelectFields.svelte"
  export let schema;

  const validMultipleOf = schema => (
    schema.multipleOf == null || schema.multipleOf > 0
  )

  const validMaxMin = schema => {
    const max = schema.maximum,
          exMax = schema.exclusiveMaximum,
          min = schema.minimum,
          exMin = schema.exclusiveMinimum,
          multipleOf = schema.multipleOf,
          nextMultiple = x => {
            if (x % multipleOf === 0) return x + multipleOf
            return Math.ceil(x / multipleOf) * multipleOf
          }
    if (max != null) {
      if (min != null) {
        if (max < min) return false
        if (multipleOf == null) return true
        if (max % multipleOf === 0 || min % multipleOf === 0) return true
        return nextMultiple(min) < max
      }
      if (exMin != null) {
        if (max <= exMin) return false
        if (multipleOf == null) return true
        if (max % multipleOf === 0) return true
        return nextMultiple(exMin) < max
      }
    } else if (exMax != null) {
      if (min != null) {
        if (exMax <= min) return false
        if (multipleOf == null) return true
        if (min % multipleOf == 0) return true
        return nextMultiple(min) < exMax
      }
      if (exMin != null) {
        if (exMax <= exMin) return false
        if (multipleOf == null) return true
        return nextMultiple(exMin) < exMax
      }
    }
    return true
  }

  const validDefault = schema => {
    const def = schema.default, multipleOf = schema.multipleOf,
          max = schema.maximum, exMax = schema.exclusiveMaximum,
          min = schema.minimum, exMin = schema.exclusiveMinimum
    if (def == null) return true
    if (multipleOf != null && def % multipleOf !== 0) return false
    if (max != null && def > max) return false
    if (exMax != null && def >= exMax) return false
    if (min != null && def < min) return false
    if (exMin != null && def <= exMin) return false
    return true
  }

  const validEnum = schema => {
    const options = schema.enum
    if (options == null) return true
    if (options.length === 0) return false
    if (options.includes(null)) return false
    return (new Set(options)).size === options.length
  }

  const valid = schema => {
    return (
      validMultipleOf(schema) &&
      validMaxMin(schema) &&
      validDefault(schema) &&
      validEnum(schema)
    )
  }

  const handleDefineOptionsChange = event => {
    if (event.target.checked) {
      schema.enum ||= [null, null, null]
      schema.default = null
      schema.multipleOf = null
      schema.maximum = null
      schema.exclusiveMaximum = null
      schema.minimum = null
      schema.exclusiveMinimum = null
    }
  }
</script>

<PrimitiveComponent bind:schema on:deleteProperty valid={valid(schema)}>
  
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Define options</span> 
      <input
        type="checkbox"
        class="checkbox"
        on:change={handleDefineOptionsChange}
      >
    </label>
  </div>

  {#if (schema.enum == null)}
    <NumberInputFields bind:schema />
  {:else}
    <SelectFields bind:schema inputType="number" />
  {/if}

</PrimitiveComponent>