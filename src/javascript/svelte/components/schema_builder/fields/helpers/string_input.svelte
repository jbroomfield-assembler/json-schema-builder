<script>
  import TextInput from "../../../../../components/editor/form/text.svelte"
  import NumberInput from "../../../../../components/editor/form/number.svelte"
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

  const validateSchema = () => {
    if (schema.default === "") {
      schema.default = undefined
      schema = schema
    }
    valid = (
      validMaxLength(schema) &&
      validMinLength(schema) &&
      validDefault(schema)
    )
  }

  $: schema && validateSchema()

</script>

<TextInput
  label="Default"
  placeholder="Default"
  bind:value={schema.default}
/>

<NumberInput
  label="Minimum length"
  placeholder="Minimum length"
  min=0
  bind:value={schema.minLength}
/>

<NumberInput
  label="Maximum length"
  placeholder="Maximum length"
  min=1
  bind:value={schema.maxLength}
/>

<TextInput
  label="Pattern"
  placeholder="Pattern"
  bind:value={schema.pattern}
/>