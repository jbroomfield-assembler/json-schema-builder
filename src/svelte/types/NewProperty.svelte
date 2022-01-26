<script>
    export let schema
</script>

<div class="form-control">
	<label for="new-property-label" class="label">
		<span class="label-text">Label</span>
	</label> 
	<input id="new-property-label" type="text" placeholder="Label" class="input input-bordered" bind:value={schema.properties.title}>
</div>

<div class="form-control">
	<label for="new-property-code" class="label">
		<span class="label-text">Code</span>
	</label> 
	<input id="new-property-code" type="text" placeholder="Code" class="input input-bordered" bind:value={schema.properties.code}>
</div>

<div class="form-control">
	<label for="new-property-type" class="label">
		<span class="label-text">Type</span>
	</label> 
	<select class="select select-bordered w-full max-w-xs" bind:value={schema.properties.type}>
		<option disabled="disabled" value="">Type</option> 
		<option value="string">String</option> 
		<option value="number">Number</option> 
		<option value="boolean">Boolean</option>
		<option value="object">Object</option>
	</select>
</div>
