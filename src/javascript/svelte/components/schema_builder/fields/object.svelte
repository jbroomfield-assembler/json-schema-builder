<script>
  import Checkbox from "../../../../components/editor/form/checkbox.svelte"
  import NumberInput from "../../../../components/editor/form/number.svelte"

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

  const validateSchema = () => {
    valid = validMin() && validMax()
  }

$: schema && validateSchema()

</script>

<Checkbox
  label="Allow additional properties"
  bind:checked={schema.additionalProperties}
/>

<NumberInput
  label="Minimum number of properties"
  placeholder="Minimum number of properties"
  min=0
  bind:value={schema.minProperties}
/>

<NumberInput
  label="Maximum number of properties"
  placeholder="Minimum number of properties"
  min=1
  bind:value={schema.maxProperties}
/>