<script>

  import newSchema from "../helpers/new_schema.js"
  import NumberInput from "../../../../components/editor/form/number.svelte"
  import Checkbox from "../../../../components/editor/form/checkbox.svelte"
  import Dropdown from "../../../../components/editor/form/dropdown.svelte"

  export let schema;
  export let valid;

  const itemTypeOptions = [
    {disabled: "disabled", label: "Item type"},
    {label: "Text", value: "text"},
    {label: "Number", value: "number"},
    {label: "Boolean", value: "boolean"},
    {label: "Array", value: "array"},
    {label: "Object", value: "object"},
    {label: "Date", value: "date"},
    {label: "Email", value: "email"},
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
    const type = event.detail.itemType
    if (type) {
      schema.items = newSchema({
        type,
        id: `${schema["$id"]}/items`
      })
    } else {
      schema.items = {}
    }
    validateSchema()
  }

  $: schema && validateSchema()

</script>

<Dropdown
  label="Item type"
  key="itemType"
  items={itemTypeOptions}
  value={schema.items.type}
  on:change={newItemSchema}
/>

<NumberInput
  label="Minimum number of items"
  placeholder="Minimum number of items"
  bind:value={schema.minItems}
  min=0
/>

<NumberInput
  label="Maximum number of items"
  placeholder="Maximum number of items"
  bind:value={schema.maxItems}
  min=1
/>

<Checkbox
  label="Items must be unique"
  bind:checked={schema.uniqueItems}
/>