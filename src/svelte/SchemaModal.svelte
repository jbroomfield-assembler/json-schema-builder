<script>
  import Modal from "./Modal.svelte"
  import Fields from "./Fields.svelte"
  export let schema = {};
  export let open;
  export let tabs = null;
  let valid = true;
  let pristineSchema;
  let activeTab = 0;
  
  const setPristineSchema = () => pristineSchema = JSON.parse(JSON.stringify(schema))
  const revertSchema = () => schema = JSON.parse(JSON.stringify(pristineSchema))

  $: {
    if (schema.new) {
      delete schema.new
      schema = schema
      open = true
    }
  }

  $: if (open) setPristineSchema()

</script>

<Modal
  bind:open
  {valid}
  on:done={setPristineSchema}
  on:cancel={revertSchema}
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
  {#if activeTab === 0}
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
  {/if}
  <Fields bind:schema bind:valid bind:activeTab/>
</Modal>