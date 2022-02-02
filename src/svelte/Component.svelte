<script>

	import Summary from "./Summary.svelte";
	import SchemaModal from "./SchemaModal.svelte";

	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let schema = {};
	export let arrayItem = false;
	export let required = null;
	
	let modalOpen = false

	const openModal = () => modalOpen = true

	$: dispatch("setRequired", { required })

</script>

<Summary bind:schema {arrayItem} on:edit={openModal} on:deleteProperty {required} />

<SchemaModal bind:schema bind:open={modalOpen} bind:required />
