<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  import StringInputFields from "./StringInputFields.svelte"
  import SelectFields from "./SelectFields.svelte"
  export let schema;
  let valid;

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

<PrimitiveComponent bind:schema on:deleteProperty {valid}>
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
</PrimitiveComponent>