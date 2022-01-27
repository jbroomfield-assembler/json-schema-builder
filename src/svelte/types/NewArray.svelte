<script>
  export let schema;
</script>

<h1>New array</h1>

<div class="form-control">
	<label for="new-property-type" class="label">
		<span class="label-text">Item type</span>
	</label> 
	<select
    class="select select-bordered w-full max-w-xs"
    bind:value={schema.properties.itemType}
  >
		<option disabled="disabled" value="">Item type</option> 
		<option value="string">String</option> 
		<option value="number">Number</option>
		<option value="boolean">Boolean</option>
		<option value="array">Array</option>
		<option value="object">Object</option>
	</select>
</div>