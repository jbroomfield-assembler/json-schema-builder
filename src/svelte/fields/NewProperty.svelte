<script>
  import TextInput from "../forms/TextInput.svelte"
  import Select from "../forms/Select.svelte"
  export let schema;
  export let valid;

  const validateSchema = () => {
    valid = !(Object.values(schema.properties).includes(''))
  }

  const typeOptions = [
    {
      disabled: "disabled",
      value: "",
      label: "Type",
    },
    "String",
    "Number",
    "Boolean",
    "Array",
    "Object",
  ]
</script>

<TextInput
  label="Label"
  bind:value={schema.properties.title}
  on:change={validateSchema}
/>

<TextInput
  label="Code"
  bind:value={schema.properties.code}
  on:change={validateSchema}
/>

<Select
  label="type"
  options={typeOptions}
  bind:value={schema.properties.type}
  on:change={validateSchema}
/>