<script>
    export let schema
		const handleTypeChange = event => {
			if (event.target.value === 'array') {
				schema.properties.itemType ||= ''
				schema.properties.arrayDimension = 1
			} else {
				delete schema.properties.itemType
				schema.properties.arrayDimension = 0
				schema = schema
			}
		}

		const handleItemTypeChange = (event, i) => {
			if (event.target.value === 'array') {
				schema.properties.itemType = ''
				schema.properties.arrayDimension = i + 1
			} else {
				schema.properties.itemType = event.target.value
				schema.properties.arrayDimension = i
			}
		}
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
	<!-- svelte-ignore a11y-no-onchange -->
	<select
		class="select select-bordered w-full max-w-xs"
		bind:value={schema.properties.type}
		on:change={handleTypeChange}
	>
		<option disabled="disabled" value="">Type</option> 
		<option value="string">String</option> 
		<option value="number">Number</option>
		<option value="boolean">Boolean</option>
		<option value="array">Array</option>
		<option value="object">Object</option>
	</select>
</div>

{#each Array(schema.properties.arrayDimension) as _, i}
	<div class="form-control">
		<label for="new-property-type" class="label">
			<span class="label-text">Item type</span>
		</label> 
		<!-- svelte-ignore a11y-no-onchange -->
		<select
			class="select select-bordered w-full max-w-xs"
			value={i < schema.properties.arrayDimension - 1 ? "array" : schema.properties.itemType}
			on:change={event => handleItemTypeChange(event, i+1)}
		>
			<option disabled="disabled" value="">Item type</option> 
			<option value="string">String</option> 
			<option value="number">Number</option>
			<option value="boolean">Boolean</option>
			<option value="array">Array</option>
			<option value="object">Object</option>
		</select>
	</div>
{/each}
