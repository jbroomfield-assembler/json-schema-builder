<script>
  export let label;
  export let value;
</script>

<div class="form-control">
  <label class="cursor-pointer label">
    {#if (label)}
      <span class="label-text">{label}</span>
    {/if}
    <input type="checkbox" class="checkbox" bind:checked={value}>
  </label>
</div>