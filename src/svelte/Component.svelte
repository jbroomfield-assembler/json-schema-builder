<script>

	import Summary from "./summary.svelte";
	import SchemaModal from "./schema_modal.svelte";

	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let schema = {};
	export let arrayItem = false;
	export let required = null;
	
	let modal;

	const openModal = () => modal?.open()

	$: dispatch("setRequired", { required })

</script>

<Summary bind:schema {arrayItem} on:edit={openModal} on:deleteProperty {required} />

<SchemaModal bind:this={modal} bind:schema bind:required />
