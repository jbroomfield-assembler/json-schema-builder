<script>
  import StringInputFields from "./helpers/StringInput.svelte"
  import SelectFields from "./helpers/Select.svelte"

  import Checkbox from "../forms/Checkbox.svelte"

  export let schema;
  export let valid;

  const handleDefineOptionsChange = event => {
    console.log('change', event.target.checked)
    if (event.target.checked) {
      schema.enum ||= ["", "", "",]
      delete schema.default
      delete schema.maxLength
      delete schema.minLength
      valid = false
    } else {
      schema.enum = null
      valid = true
    }
  }
</script>

<div class="form-control">
  <label class="cursor-pointer label">
    <span class="label-text">Define options</span> 
    <input
      type="checkbox"
      class="checkbox"
      on:change={handleDefineOptionsChange}
    >
  </label>
</div>

{#if (schema.enum == null)}
  <StringInputFields bind:schema bind:valid />
{:else}
  <SelectFields bind:schema bind:valid inputType="text" />
{/if}