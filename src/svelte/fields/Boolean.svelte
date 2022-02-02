<script>
  import Checkbox from "../forms/Checkbox.svelte"

  export let schema;

  const handleChange = event => {
    schema.default = {
      true: true,
      false: false,
    }[event.target.value]
  }
</script>

<div class="form-control">
  <label for="default" class="label">
    <span class="label-text">Default</span>
  </label> 
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    id="default"
    class="select select-bordered w-full max-w-xs"
    on:change={handleChange}
  >
    <option value="false">False</option>
    <option value="true">True</option> 
  </select>
</div>