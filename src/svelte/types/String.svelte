<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  import StringFields from "../fields/String.svelte"
  export let schema;
  let valid = true;
</script>

<PrimitiveComponent bind:schema on:deleteProperty {valid}>
  <StringFields bind:schema bind:valid />
</PrimitiveComponent>