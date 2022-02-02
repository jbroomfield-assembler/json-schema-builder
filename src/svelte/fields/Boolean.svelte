<script>
  import Checkbox from "../forms/Checkbox.svelte"
  import Select from "../forms/Select.svelte"

  export let schema;

  const defaultOptions = [
    {value: undefined, label: "-----"},
    {value: false, label: "False"},
    {value: true, label: "True"},
  ]

  const handleChange = event => {
    schema.default = {
      undefined: undefined,
      true: true,
      false: false,
    }[event.detail.value]
  }
</script>

<Select
  label="Default"
  options={defaultOptions}
  on:change={handleChange}
/>