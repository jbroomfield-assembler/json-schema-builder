<script>
  import Select from "../forms/Select.svelte"

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

{#if (schema.default != null && schema.default.length > 0)}
  <p>Default: {schema.default}</p>
{/if}

{#if schema.enum == null}

  {#if (schema.minLength != null)}
    <p>Minimum length: {schema.minLength}</p>
  {/if}

  {#if (schema.maxLength != null)}
    <p>Maximum length: {schema.maxLength}</p>
  {/if}

{:else}

  <Select
    label="Options"
    {options}
  />

{/if}