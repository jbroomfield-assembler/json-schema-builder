<script>
  import NumberInput from "../../forms/NumberInput.svelte";
  export let schema;
  export let valid;

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

  const validateSchema = () => {
    valid = (
      validMultipleOf(schema) &&
      validMaxMin(schema) &&
      validDefault(schema)
    )
  }

  $: schema && validateSchema()

</script>

<NumberInput
  label="Default"
  bind:value={schema.default}
/>

<NumberInput
  label="Multiples of"
  min=1
  bind:value={schema.multipleOf}
/>

<NumberInput
  label="Minimum"
  bind:value={schema.minimum}
  on:change={() => schema.exlusiveMinimum = undefined}
/>

<NumberInput
  label="Exclusive minimum"
  bind:value={schema.exclusiveMinimum}
  on:change={() => schema.minimum = undefined}
/>

<NumberInput
  label="Maximum"
  bind:value={schema.maximum}
  on:change={() => schema.exlusiveMaximum = undefined}
/>

<NumberInput
  label="Exclusive maximum"
  bind:value={schema.exclusiveMaximum}
  on:change={() => schema.maximum = undefined}
/>