<script>
  export let schema;
</script>

<div class="form-control">
  <label for="default" class="label">
    <span class="label-text">Default</span>
  </label> 
  <input id="default" type="text" placeholder="Default" class="input input-bordered" bind:value={schema.default}>
</div>

<div class="form-control">
  <label for="max-length" class="label">
    <span class="label-text">Maximum length</span>
  </label> 
  <input
    id="max-length"
    type="number"
    min="1"
    placeholder="Maximum length"
    class="input input-bordered"
    bind:value={schema.maxLength}
  >
</div>

<div class="form-control">
  <label for="min-length" class="label">
    <span class="label-text">Minimum length</span>
  </label> 
  <input
    id="min-length"
    type="number"
    min="1"
    placeholder="Minimum length"
    class="input input-bordered"
    bind:value={schema.minLength}
  >
</div>