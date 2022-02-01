<script>
  import TextInput from "../forms/TextInput.svelte"

  export let schema;
  export let valid;

  const validateSchema = () => {
    valid = !(Object.values(schema.properties).includes(''))
  }
</script>

<TextInput
  label="Label"
  bind:value={schema.properties.title}
  on:change={validateSchema}
/>

<TextInput
  label="Code"
  bind:value={schema.properties.code}
  on:change={validateSchema}
/>

<div class="form-control">
  <label for="new-property-type" class="label">
    <span class="label-text">Type</span>
  </label> 
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    class="select select-bordered w-full max-w-xs"
    bind:value={schema.properties.type}
    on:change={validateSchema}
  >
    <option disabled="disabled" value="">Type</option> 
    <option value="string">String</option> 
    <option value="number">Number</option>
    <option value="boolean">Boolean</option>
    <option value="array">Array</option>
    <option value="object">Object</option>
  </select>
</div>