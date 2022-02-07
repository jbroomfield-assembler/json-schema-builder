<script>

	import newSchema from '../new_schema.js'
	
	import Component from './component.svelte'
	
	export let title = 'Info';
	export let code = 'info';
	export let parentCode = 'playingGroup';

	let schema = newSchema({
		type: 'data-model',
		title,
		code,
		parentCode,
})

</script>

{#if schema}
	<Component bind:schema />
{/if}

<div><pre>{JSON.stringify(schema, null, '\t')}</pre></div>