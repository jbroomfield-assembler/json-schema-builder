<script>
  import Dropdown from "../../../../components/editor/form/dropdown.svelte"
  
  export let schema;

  let options = [];

  const setOptions = () => {
    options = [];
    if (schema.enum != null) {
      if (!schema.default) {
        options.push({disabled: "disabled", selected: "selected", label: "Options"})
      }
      schema.enum.forEach(option => {
        const newOption = {label: option}
        if (option === schema.default) {
          newOption.selected = "selected"
        }
        options.push(newOption)
      })
    }
  }

  $: schema && setOptions()

    
  
</script>

{#if (schema.default != null)}
  <p>Default: {schema.default}</p>
{/if}

{#if schema.enum == null}

  {#if (schema.multipleOf != null)}
    <p>Multiples of {schema.multipleOf}</p>
  {/if}

  {#if (schema.minimum != null)}
    <p>Minimum: {schema.minimum}</p>
  {:else if (schema.exclusiveMinimum != null)}
    <p>Exclusive minimum: {schema.exclusiveMinimum}</p>
  {/if}

  {#if (schema.maximum != null)}
    <p>Maximum: {schema.maximum}</p>
  {:else if (schema.exclusiveMaximum != null)}
    <p>Exclusive maximum: {schema.exclusiveMaximum}</p>
  {/if}

{:else}

  <Dropdown
    label="Options"
    {options}
  />

{/if}