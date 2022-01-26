<script>
  export let propertyName;
  export let propertyType;
</script>

<h3>{propertyName}</h3>
<div class="form-control w-full max-w-xs">
  <label for="{propertyName}-type" class="label">
    <span class="label-text">Type</span>
  </label> 
  <select
    id="{propertyName}-type"
    class="select select-bordered select-primary w-full max-w-xs"
    bind:value={propertyType}
  >
    <option value="string">String</option> 
    <option value="number">Number</option> 
    <option value="boolean">Boolean</option>
  </select>
</div>
  


