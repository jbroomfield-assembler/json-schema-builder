<script>

	import newSchema from '../newSchema.js'
	
	import Component from './component.svelte'
	
	let schema = newSchema({
		type: 'data-model',
		title: 'Info',
		code: 'info',
		parentCode: 'playingGroup',
})

</script>

{#if schema}
	<Component bind:schema />
{/if}

<div><pre>{JSON.stringify(schema, null, '\t')}</pre></div>