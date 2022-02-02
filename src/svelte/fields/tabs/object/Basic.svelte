<script>
  import Checkbox from "../../../forms/Checkbox.svelte"
  import NumberInput from "../../../forms/NumberInput.svelte"

  export let schema;
</script>

<Checkbox
  label="Allow additional properties"
  bind:checked={schema.additionalProperties}
/>

<NumberInput
  label="Minimum number of properties"
  min=0
  bind:value={schema.minProperties}
/>

<NumberInput
  label="Maximum number of properties"
  min=1
  bind:value={schema.maxProperties}
/>