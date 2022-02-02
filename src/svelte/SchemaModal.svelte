<script>
  import Modal from "./Modal.svelte"
  import Fields from "./Fields.svelte"
  export let schema = {};
  export let open;
  export let tabs = null;
  let valid = true;
  let pristineSchema = JSON.parse(JSON.stringify(schema));
  let activeTab = 0;
  
  $: {
    if (schema.new) {
      delete schema.new
      schema = schema
      open = true
    }
  }

  const handleDone = () => pristineSchema = JSON.parse(JSON.stringify(schema))
  const handleCancel = () => schema = JSON.parse(JSON.stringify(pristineSchema))

</script>

<Modal
  bind:open
  {valid}
  on:done={handleDone}
  on:cancel={handleCancel}
>
  <h1>{schema.title}</h1>
  <p>Type: {schema.type}</p>
  <p>Code: {schema.code}</p>
  {#if tabs}
    <div class="tabs">
      {#each tabs as tab, i}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          class="tab tab-bordered"
          class:tab-active={activeTab === i}
          on:click={() => activeTab = i}
        >{tab}</a>
      {/each}
    </div>
  {/if}
  <div class="form-control">
    <label for="description" class="label">
      <span class="label-text">Description</span>
    </label> 
    <input
      id="description"
      type="text"
      placeholder="Description"
      class="input input-bordered w-full"
      bind:value={schema.description}
    >
  </div>
  <Fields bind:schema bind:valid bind:activeTab/>
</Modal>