<script>
  import { onMount, tick } from "svelte"

  import FormSelect from "../../forms/Select.svelte"
  import TextInput from "../../forms/TextInput.svelte"
  import NumberInput from "../../forms/NumberInput.svelte"

  export let schema;
  export let valid;
  export let inputType;
  let optionRefs = []

  let defaultOptions
  
  $: defaultOptions = [
    {value: undefined, label: "-----"},
    ...schema.enum
    .filter(option => option)
    .map(option => ({value: option, label: option,}))
  ]

  onMount(() => optionRefs[0].focus())

  const validSchema = () => {
    const options = schema.enum
    if (options.length === 0) return false
    if (options.includes(null) || options.includes("")) return false
    return (new Set(options)).size === options.length
  }

  const validateSchema = () => {
    valid = validSchema()
  }

  const handleDelete = i => {
    schema.enum = [
      ...schema.enum.slice(0, i),
      ...schema.enum.slice(i + 1)
    ]
    if (schema.default != null && !schema.enum.includes(schema.default)) {
      schema.default = undefined
    }
    validateSchema()
  }

  async function handleAdd() {
    schema.enum = [...schema.enum, inputType === "text" ? "" : null]
    await tick()
    optionRefs[optionRefs.length - 1].focus()
    validateSchema()
  }
</script>

<FormSelect
  label="Default"
  options={defaultOptions}
  bind:value={schema.default}
/>

{#each schema.enum as option, i}
  <div class="form-control my-2">
    <div class="flex space-x-2">
      <svelte:component
        this={{
          "text": TextInput,
          "number": NumberInput
        }[inputType]}
        placeholder="Option {i + 1}"
        fieldOnly={true}
        bind:this={optionRefs[i]}
        bind:value={schema.enum[i]}
        on:change={validateSchema}
      />
      <button
        class="btn btn-square btn-error"
        on:click={() => handleDelete(i)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">   
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
        </svg>
      </button> 
    </div>
  </div>
{/each}

<div class="form-control my-2">
  <div>
    <button
      class="btn btn-square btn-primary float-right"
      on:click={handleAdd}
      >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button> 
  </div>
</div>
