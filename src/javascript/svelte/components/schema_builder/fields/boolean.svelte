<script>
  import Checkbox from "../../../../components/editor/form/checkbox.svelte"
  import Select from "../forms/select.svelte"

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