<script>

	import Summary from "./Summary.svelte";
	import SchemaModal from "./SchemaModal.svelte";

	export let schema = {};
	export let arrayItem = false;
	
	let modalOpen = false

	const openModal = () => modalOpen = true

	let tabs = null;
	if (schema.type === "object") {
		tabs = ["Basic", "Required", "Dependent Required"]
	}

</script>

<Summary bind:schema {arrayItem} on:edit={openModal} on:deleteProperty />

<SchemaModal bind:schema bind:open={modalOpen} {tabs} />
