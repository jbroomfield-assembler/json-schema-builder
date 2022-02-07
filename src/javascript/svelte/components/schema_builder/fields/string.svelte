<script>
  import StringInputFields from "./helpers/string_input.svelte"
  import SelectFields from "./helpers/select.svelte"

  import Checkbox from "../../../../components/editor/form/checkbox.svelte"

  export let schema;
  export let valid;

  const handleDefineOptionsChange = event => {
    delete schema.default
    if (schema.enum) {
      delete schema.enum
      valid = true
    } else {
      schema.enum ||= [null, null, null]
      delete schema.default
      delete schema.maxLength
      delete schema.minLength
      valid = false
    }
  }
</script>

<Checkbox
  label="Define options"
  on:change={handleDefineOptionsChange}
/>

{#if (schema.enum == null)}
  <StringInputFields bind:schema bind:valid />
{:else}
  <SelectFields bind:schema bind:valid inputType="text" />
{/if}