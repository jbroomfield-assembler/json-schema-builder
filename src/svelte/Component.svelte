<script>

	import Summary from "./Summary.svelte";
	import SchemaModal from "./SchemaModal.svelte";

	export let schema = {};
	export let arrayItem;
	
	let modalOpen = false

	const openModal = () => modalOpen = true

</script>

<Summary bind:schema {arrayItem} on:edit={openModal} on:deleteProperty />

<SchemaModal bind:schema bind:open={modalOpen} />
