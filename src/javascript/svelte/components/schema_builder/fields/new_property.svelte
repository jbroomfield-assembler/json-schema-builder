<script>
  import TextInput from "../../../../components/editor/form/text.svelte"
  import Dropdown from "../../../../components/editor/form/dropdown.svelte"
  export let schema;
  export let valid;

  const schemaValid = () => {
    for (const property of Object.values(schema.properties)) {
      if (!(property && property.length > 0)) return false
    }
    return true
  }

  const validateSchema = () => {
    valid = schemaValid()
  }

  $: schema && validateSchema()

  const typeOptions = [
    {
      disabled: "disabled",
      value: "",
      label: "Type",
    },
    {label: "Text", value: "text"},
    {label: "Number", value: "number"},
    {label: "Boolean", value: "boolean"},
    {label: "Array", value: "array"},
    {label: "Object", value: "object"},
    {label: "Date", value: "date"},
    {label: "Email", value: "email"},
  ]
</script>

<h1>New Property</h1>

<TextInput
  label="Label"
  placeholder="Label"
  bind:value={schema.properties.title}
/>

<TextInput
  label="Code"
  placeholder="Code"
  bind:value={schema.properties.code}
/>

<Dropdown
  label="Type"
  items={typeOptions}
  bind:value={schema.properties.type}
/>