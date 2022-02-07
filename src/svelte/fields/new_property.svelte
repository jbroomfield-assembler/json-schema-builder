<script>
  import TextInput from "../forms/TextInput.svelte"
  import Select from "../forms/Select.svelte"
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
    "Text",
    "Number",
    "Boolean",
    "Array",
    "Object",
    "Date",
    "Email",
  ]
</script>

<h1>New Property</h1>

<TextInput
  label="Label"
  bind:value={schema.properties.title}
/>

<TextInput
  label="Code"
  bind:value={schema.properties.code}
/>

<Select
  label="type"
  options={typeOptions}
  bind:value={schema.properties.type}
/>