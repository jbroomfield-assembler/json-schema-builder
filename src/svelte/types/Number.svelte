<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  export let schema;

  const validMultipleOf = schema => {
    if (schema.multipleOf == null) return true
    return schema.multipleOf > 0
  }

  const validMaxMin = schema => {
    const max = schema.maximum,
          exMax = schema.exclusiveMaximum,
          min = schema.minimum,
          exMin = schema.exclusiveMinimum,
          mult = schema.multipleOf,
          nextMult = x => {
            if (x % mult === 0) return x + mult
            return Math.ceil(x / mult) * mult
          }
    if (max != null) {
      if (min != null) {
        if (max < min) return false
        if (mult == null) return true
        if (max % mult === 0 || min % mult === 0) return true
        return nextMult(min) < max
      }
      if (exMin != null) {
        if (max <= exMin) return false
        if (mult == null) return true
        if (max % mult === 0) return true
        return nextMult(exMin) < max
      }
    } else if (exMax != null) {
      if (min != null) {
        if (exMax <= min) return false
        if (mult == null) return true
        if (min % mult == 0) return true
        return nextMult(min) < exMax
      }
      if (exMin != null) {
        if (exMax <= exMin) return false
        if (mult == null) return true
        return nextMult(exMin) < exMax
      }
    }
    return true
  }

  const validDefault = schema => {
    if (schema.default == null) return true
    if (schema.multipleOf && schema.default % schema.multipleOf !== 0) return false
    if (schema.maximum && schema.default > schema.maximum) return false
    if (schema.exclusiveMaximum && schema.default >= schema.exclusiveMaximum) return false
    if (schema.minimum && schema.default < schema.minimum) return false
    if (schema.exclusiveMinimum && schema.default <= schema.exclusiveMinimum) return false
    return true
  }

  const valid = schema => {
    return (
      validMultipleOf(schema) &&
      validMaxMin(schema) &&
      validDefault(schema)
    )
  }
</script>

<PrimitiveComponent bind:schema on:deleteProperty valid={valid(schema)}>
  
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
    >
  </div>

</PrimitiveComponent>