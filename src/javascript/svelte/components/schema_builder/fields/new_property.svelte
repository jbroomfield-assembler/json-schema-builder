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
  options={typeOptions}
  bind:value={schema.properties.type}
/>