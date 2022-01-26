<script>
	import BooleanComponent from './types/Boolean.svelte'
	import NewPropertyComponent from './types/NewProperty.svelte'
	import NoSchema from './types/NoSchema.svelte'
	import NumberComponent from './types/Number.svelte'
	import ObjectComponent from './types/Object.svelte'
	import StringComponent from './types/String.svelte'
	
	const resolveType = schema => {
		if (!schema) return NoSchema
		return {
			'boolean': BooleanComponent,
			'new-property': NewPropertyComponent,
			'number': NumberComponent,
			'object': ObjectComponent,
			'string': StringComponent,
		}[schema.type]
	}

	export let schema
</script>

<svelte:component this={resolveType(schema)} bind:schema on:deleteProperty />