<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  import NumberInputFields from "./NumberInputFields.svelte"
  import NumberSelectFields from "./NumberSelectFields.svelte"
  import SelectFields from "./SelectFields.svelte"
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

  const validEnum = schema => {
    if (schema.enum == null) return true
    if (schema.enum.length === 0) return false
    if (schema.enum.includes(null)) return false
    return (new Set(schema.enum)).size === schema.enum.length
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