<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  import BooleanFields from "./BooleanFields.svelte"
  export let schema;
</script>

<PrimitiveComponent bind:schema on:deleteProperty valid={true}>
  <BooleanFields bind:schema/>
</PrimitiveComponent>