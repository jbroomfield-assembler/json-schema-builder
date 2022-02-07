<script>
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let label;
  export let checked = false;
</script>

<div class="form-control">
  <label class="cursor-pointer label">
    {#if (label)}
      <span class="label-text">{label}</span>
    {/if}
    <input type="checkbox" class="checkbox" bind:checked on:change={() => dispatch("change")}>
  </label>
</div>