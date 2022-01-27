<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  import StringInputFields from "./StringInputFields.svelte"
  import StringSelectFields from "./StringSelectFields.svelte"
  import SelectFields from "./SelectFields.svelte"
  export let schema;

  const validMaxLength = schema => {
    if (schema.maxLength == null) return true
    if (schema.maxLength < 1) return false
    return Number.isInteger(schema.maxLength)
  }

  const validMinLength = schema => {
    if (schema.minLength == null) return true
    if (schema.minLength < 0) return false
    if (schema.maxLength != null && schema.minLength > schema.maxLength) return false
    return Number.isInteger(schema.maxLength)
  }

  const validDefault = schema => {
    if (schema.default == null) return true
    if (schema.maxLength != null && schema.default.length > schema.maxLength) return false
    if (schema.minLength != null && schema.default.length < schema.minLength) return false
    return true
  }

  const validEnum = schema => {
    if (schema.enum == null) return true
    if (schema.enum.length === 0) return false
    if (schema.enum.includes("")) return false
    return (new Set(schema.enum)).size === schema.enum.length
  }

  const valid = schema => {
    return (
      validMaxLength(schema) &&
      validMinLength(schema) &&
      validDefault(schema) &&
      validEnum(schema)
    )
  }

  const handleDefineOptionsChange = event => {
    if (event.target.checked) {
      schema.enum ||= ["", "", ""]
      schema.default = null
      schema.maxLength = null
      schema.minLength = null
    } else {
      schema.enum = null
    }
  }

</script>

<PrimitiveComponent bind:schema on:deleteProperty valid={valid(schema)}>
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Define options</span> 
      <input
        type="checkbox"
        class="checkbox"
        on:change={handleDefineOptionsChange}
      >
    </label>
  </div>
  {#if (schema.enum == null)}
    <StringInputFields bind:schema />
  {:else}
    <SelectFields bind:schema inputType="text" />
  {/if}
</PrimitiveComponent>