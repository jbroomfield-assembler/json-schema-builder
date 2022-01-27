<script>
	import BooleanComponent from './types/Boolean.svelte'
	import NewPropertyComponent from './types/NewProperty.svelte'
	import NewArrayComponent from './types/NewArray.svelte'
	import NoSchema from './types/NoSchema.svelte'
	import NumberComponent from './types/Number.svelte'
	import ObjectComponent from './types/Object.svelte'
	import StringComponent from './types/String.svelte'
	import ArrayComponent from './types/Array.svelte'
	
	const resolveType = schema => {
		if (!schema) return NoSchema
		return {
			'boolean': BooleanComponent,
			'new-property': NewPropertyComponent,
			'new-array': NewArrayComponent,
			'number': NumberComponent,
			'object': ObjectComponent,
			'string': StringComponent,
			'array': ArrayComponent
		}[schema.type]
	}

	export let schema
</script>

<svelte:component this={resolveType(schema)} bind:schema on:deleteProperty />