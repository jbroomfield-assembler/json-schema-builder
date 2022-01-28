<script>
  export let schema;
  export let valid

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

  const validate = schema => (
    validMultipleOf(schema) &&
    validMaxMin(schema) &&
    validDefault(schema)
  )
</script>

<div class="form-control">
  <label for="default" class="label">
    <span class="label-text">Default</span>
  </label> 
  <input
    id="default"
    type="number"
    placeholder="Default"
    class="input input-bordered"
    bind:value={schema.default}
    on:change={() => valid = validate(schema)}
  >
</div>

<div class="form-control">
  <label for="multiple-of" class="label">
    <span class="label-text">Multiple of</span>
  </label> 
  <input
    id="multiple-of"
    type="number"
    min="1"
    placeholder="Multiple of"
    class="input input-bordered"
    bind:value={schema.multipleOf}
    on:change={() => valid = validate(schema)}
  >
</div>

<div class="form-control">
  <label for="max" class="label">
    <span class="label-text">Maximum</span>
  </label> 
  <input
    id="max"
    type="number"
    placeholder="Maximum"
    class="input input-bordered"
    bind:value={schema.maximum}
    on:change={() => schema.exclusiveMaximum = null}
    on:change={() => valid = validate(schema)}
  >
</div>

<div class="form-control">
  <label for="ex-max" class="label">
    <span class="label-text">Exclusive maximum</span>
  </label> 
  <input
    id="max"
    type="number"
    placeholder="Exclusive maximum"
    class="input input-bordered"
    bind:value={schema.exclusiveMaximum}
    on:change={() => schema.maximum = null}
    on:change={() => valid = validate(schema)}
  >
</div>

<div class="form-control">
  <label for="min" class="label">
    <span class="label-text">Minimum</span>
  </label> 
  <input
    id="min"
    type="number"
    placeholder="Minimum"
    class="input input-bordered"
    bind:value={schema.minimum}
    on:change={() => schema.exclusiveMinimum = null}
    on:change={() => valid = validate(schema)}
  >
</div>

<div class="form-control">
  <label for="ex-min" class="label">
    <span class="label-text">Exclusive minimum</span>
  </label> 
  <input
    id="ex-min"
    type="number"
    placeholder="Exclusive minimum"
    class="input input-bordered"
    bind:value={schema.exclusiveMinimum}
    on:change={() => schema.minimum = null}
    on:change={() => valid = validate(schema)}
  >
</div>