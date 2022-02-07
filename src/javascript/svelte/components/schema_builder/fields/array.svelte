<script>

  import newSchema from "../../new_schema.js"
  import NumberInput from "../forms/number_input.svelte"
  import Checkbox from "../../../../components/editor/form/checkbox.svelte"
  import Select from "../forms/select.svelte"

  export let schema;
  export let valid;

  const itemTypeOptions = [
    {disabled: "disabled", label: "Item type"},
    "Text",
    "Number",
    "Boolean",
    "Array",
    "Object",
    "Date",
    "Email",
  ]

  const schemaValid = () => {
    const min = schema.minItems,
          max = schema.maxItems;
    if (min != null) {
      if (min < 0) return false
      if (!Number.isInteger(min)) return false
      if (max != null && max < min) return false
    }
    if (max != null) {
      if (max < 1) return false
      if (!Number.isInteger(max)) return false
    }
    return true
  }

  const validateSchema = () => {
    valid = schemaValid()
  }

  const newItemSchema = event => {
    schema.items = newSchema({
      type: event.detail.value,
      id: `${schema["$id"]}/items`
    })
    validateSchema()
  }

  $: schema && validateSchema()

</script>

<Select
  label="Item type"
  options={itemTypeOptions}
  value={schema?.items?.type}
  on:change={newItemSchema}
/>

<NumberInput
  label="Minimum number of items"
  bind:value={schema.minItems}
  min=0
/>

<NumberInput
  label="Maximum number of items"
  bind:value={schema.maxItems}
  min=1
/>

<Checkbox
  label="Items must be unique"
  bind:checked={schema.uniqueItems}
/>