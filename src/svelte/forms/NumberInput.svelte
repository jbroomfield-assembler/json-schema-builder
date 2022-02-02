<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label;
  export let value;
  export let placeholder = label;
  export let min = null;
  export let max = null;
  export let fieldOnly = false;

  let _value = value;
  let id = `${label && (label.toLowerCase() + '-')}number-field`;

  $: {
    value = _value == null ? undefined : _value
    dispatch("change")
  }
</script>

{#if fieldOnly}
  <input
    id="{id}"
    type="number"
    min="{min}"
    max="{max}"
    placeholder="{placeholder}"
    class="input input-bordered"
    bind:value={_value}
  >
{:else}
  <div class="form-control">
    {#if (label)}
      <label for="{id}" class="label">
        <span class="label-text">{label}</span>
      </label>
    {/if}
    <input
      id="{id}"
      type="number"
      min="{min}"
      max="{max}"
      placeholder="{placeholder}"
      class="input input-bordered"
      bind:value={_value}
    >
  </div>
{/if}