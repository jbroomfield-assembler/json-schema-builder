<script>

	import Summary from "./summaries/Summary.svelte";
	import SchemaModal from "./SchemaModal.svelte";

	export let schema = {};
	
	let modalOpen = false

	const openModal = () => modalOpen = true

</script>

<Summary bind:schema on:edit={openModal} on:deleteProperty />

{#if schema.type !== 'object'}
	<SchemaModal bind:schema bind:open={modalOpen} />
{/if}