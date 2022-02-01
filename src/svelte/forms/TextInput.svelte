<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label;
  export let value;
  export let placeholder = label;

  let _value = value;
  let id = `${label && (label.toDownCase() + '-')}number-field`;

  $: {
    value = _value || undefined
    dispatch("change")
  }
</script>

<div class="form-control">
  {#if (label)}
    <label for="{id}" class="label">
      <span class="label-text">{label}</span>
    </label>
  {/if}
  <input
    id="{id}"
    type="text"
    placeholder="{placeholder}"
    class="input input-bordered"
    bind:value={_value}
  >
</div>