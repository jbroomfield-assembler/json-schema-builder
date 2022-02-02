<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label = null;
  export let value = null;
  export let options = [];
  export let fieldOnly = false;
  let id = `${label && (label.toLowerCase() + '-')}select`;

</script>

{#if fieldOnly}
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    class="select select-bordered w-full max-w-xs"
    bind:value
    on:change={() => dispatch("change")}
  >
    {#each options as option}
      {#if typeof option === "object"}
        <option
          value="{option.value}"
          disabled="{option.disabled}"
          selected="{option.selected}"
        >{option.label}</option>
      {:else}
        <option
          value="{option.toLowerCase()}"
        >{option}</option>
      {/if}
    {/each}
  </select>
{:else}
  <div class="form-control">
    {#if label}
      <label for="{id}" class="label">
        <span class="label-text">{label}</span>
      </label> 
    {/if}
    <!-- svelte-ignore a11y-no-onchange -->
    <select
      class="select select-bordered w-full max-w-xs"
      bind:value
      on:change={() => dispatch("change")}
    >
      {#each options as option}
        {#if typeof option === "object"}
          <option
            value="{option.value}"
            disabled="{option.disabled}"
            selected="{option.selected}"
          >{option.label}</option>
        {:else}
          <option
            value="{option.toLowerCase()}"
          >{option}</option>
        {/if}
      {/each}
    </select>
  </div>
{/if}