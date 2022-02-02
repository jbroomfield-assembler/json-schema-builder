<script>
  import Select from "../forms/Select.svelte"

  export let schema;
  export let arrayItem;
</script>

{#if !arrayItem}
  <p>Required: {schema.required}</p>
{/if}

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
    options={[
      {disabled: "disabled", selected: "selected", label: "Options"},
      ...schema.enum.map(option => ({label: option}))
    ]}
  />

{/if}