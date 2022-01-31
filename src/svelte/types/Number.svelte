<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  import NumberFields from "../fields/Number.svelte"
  export let schema;
  let valid = true;
</script>

<PrimitiveComponent bind:schema on:deleteProperty {valid}>
  <NumberFields bind:schema bind:valid />
</PrimitiveComponent>