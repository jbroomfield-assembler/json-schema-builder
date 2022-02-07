<script>
  import Dropdown from "../../../../components/editor/form/dropdown.svelte"

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

<Dropdown
  label="Default"
  options={defaultOptions}
  on:change={handleChange}
/>