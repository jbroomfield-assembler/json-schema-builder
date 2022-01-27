<script>
  import PrimitiveComponent from "../PrimitiveComponent.svelte";
  import StringInputFields from "./StringInputFields.svelte"
  import SelectFields from "./SelectFields.svelte"
  export let schema;

  const validMaxLength = schema => {
    const max = schema.maxLength
    if (max == null) return true
    if (max < 1) return false
    return Number.isInteger(max)
  }

  const validMinLength = schema => {
    const min = schema.minLength, max = schema.maxLength
    if (min == null) return true
    if (min < 0) return false
    if (max != null && min > max) return false
    return Number.isInteger(min)
  }

  const validDefault = schema => {
    const def = schema.default,
          max = schema.maxLength, min = schema.minLength
    if (def == null) return true
    if (max != null && def.length > max) return false
    if (min != null && def.length < min) return false
    return true
  }

  const validEnum = schema => {
    const options = schema.enum
    if (options == null) return true
    if (options.length === 0) return false
    if (options.includes("")) return false
    return (new Set(options)).size === options.length
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