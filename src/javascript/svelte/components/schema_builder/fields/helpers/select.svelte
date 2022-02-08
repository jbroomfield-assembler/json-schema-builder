<script>
  import { onMount, tick } from "svelte"

  import Dropdown from "../../../../../components/editor/form/dropdown.svelte"
  import TextInput from "../../../../../components/editor/form/text.svelte"
  import NumberInput from "../../../../../components/editor/form/number.svelte"

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
    if (options.includes(null) || options.includes("") || options.includes(undefined)) return false
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
    schema = schema
  }

  async function handleAdd() {
    schema.enum = [...schema.enum, inputType === "text" ? "" : null]
    await tick()
    for (let i = 1; i <= optionRefs.length; i++) {
      const optionRef = optionRefs[optionRefs.length - i]
      if (optionRef) {
        optionRef.focus()
        break;
      }
    }
    schema = schema
  }

  $: schema && validateSchema()

</script>

<Dropdown
  label="Default"
  items={defaultOptions}
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
        bind:this={optionRefs[i]}
        bind:value={schema.enum[i]}
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
