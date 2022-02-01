<script>
  import { onMount, tick } from 'svelte'
  export let schema;
  export let valid;
  export let inputType;
  let optionRefs = []

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
      schema.default = null
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

<div class="form-control">
	<label for="default" class="label">
		<span class="label-text">Default</span>
	</label> 
  <select
    id="default"
    class="select select-bordered w-full"
    bind:value={schema.default}
  >
    <option value={null}>-----</option>
    {#each schema.enum as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>


{#each schema.enum as option, i}
  <div class="form-control my-2">
    <div class="flex space-x-2">
      {#if inputType === "text"}
        <input
          id="option-{i + 1}"
          type="text"
          placeholder="Option {i + 1}"
          class="input input-bordered w-full"
          bind:this={optionRefs[i]}
          bind:value={schema.enum[i]}
          on:change={validateSchema}
        >
      {:else if inputType === "number"}
        <input
          id="option-{i + 1}"
          type="number"
          placeholder="Option {i + 1}"
          class="input input-bordered w-full"
          bind:this={optionRefs[i]}
          bind:value={schema.enum[i]}
          on:change={validateSchema}
        >
      {/if}
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
