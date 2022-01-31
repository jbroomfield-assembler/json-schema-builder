<script>
  import StringInputFields from "./StringInput.svelte"
  import SelectFields from "./Select.svelte"

  export let schema;
  export let valid;

  const handleDefineOptionsChange = event => {
    if (event.target.checked) {
      schema.enum ||= ["", "", ""]
      schema.default = null
      schema.maxLength = null
      schema.minLength = null
      valid = false
    } else {
      schema.enum = null
      valid = true
    }
  }
</script>

<div class="form-control">
  <label class="cursor-pointer label">
    <span class="label-text">Required</span> 
    <input type="checkbox" class="checkbox" bind:checked={schema.required}>
  </label>
</div>

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