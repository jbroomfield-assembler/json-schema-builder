<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label = null;
  export let value = undefined;
  export let placeholder = label;
  export let fieldOnly = false;

  let _value = value;
  let id = `${label ? (label.toLowerCase() + '-') : ''}number-field`;
  let input;

  export const focus = () => input.focus()

  $: {
    value = _value || undefined
    dispatch("change")
  }
</script>

{#if fieldOnly}
<input
  bind:this={input}
  id="{id}"
  type="text"
  placeholder="{placeholder}"
  class="input input-bordered w-full"
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
    bind:this={input}
    id="{id}"
    type="text"
    placeholder="{placeholder}"
    class="input input-bordered w-full"
    bind:value={_value}
  >
</div>
{/if}