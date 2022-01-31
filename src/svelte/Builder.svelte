<script>

	import buildSchema from '../buildSchema.js'
	import purgeSchema from '../purgeSchema'
	
	import Component from './Component.svelte'
	
	let schema = buildSchema({
		type: 'object',
		root: true,
		title: 'Data Model',
		code: 'dataModel',
})

</script>

{#if schema}
	<Component bind:schema />
{/if}

<div><pre>{JSON.stringify(schema, null, '\t')}</pre></div>
<br>-----<br><br>
<div><pre>{JSON.stringify(purgeSchema(schema), null, '\t')}</pre></div>