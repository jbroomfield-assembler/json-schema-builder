<script>
  export let schema;
</script>

<div class="form-control">
  <label for="default" class="label">
    <span class="label-text">Default</span>
  </label> 
  <input
    id="default"
    type="number"
    placeholder="Default"
    class="input input-bordered"
    bind:value={schema.default}
  >
</div>

<div class="form-control">
  <label for="multiple-of" class="label">
    <span class="label-text">Multiple of</span>
  </label> 
  <input
    id="multiple-of"
    type="number"
    min="1"
    placeholder="Multiple of"
    class="input input-bordered"
    bind:value={schema.multipleOf}
  >
</div>

<div class="form-control">
  <label for="max" class="label">
    <span class="label-text">Maximum</span>
  </label> 
  <input
    id="max"
    type="number"
    placeholder="Maximum"
    class="input input-bordered"
    bind:value={schema.maximum}
    on:change={() => schema.exclusiveMaximum = null}
  >
</div>

<div class="form-control">
  <label for="ex-max" class="label">
    <span class="label-text">Exclusive maximum</span>
  </label> 
  <input
    id="max"
    type="number"
    placeholder="Exclusive maximum"
    class="input input-bordered"
    bind:value={schema.exclusiveMaximum}
    on:change={() => schema.maximum = null}
  >
</div>

<div class="form-control">
  <label for="min" class="label">
    <span class="label-text">Minimum</span>
  </label> 
  <input
    id="min"
    type="number"
    placeholder="Minimum"
    class="input input-bordered"
    bind:value={schema.minimum}
    on:change={() => schema.exclusiveMinimum = null}
  >
</div>

<div class="form-control">
  <label for="ex-min" class="label">
    <span class="label-text">Exclusive minimum</span>
  </label> 
  <input
    id="ex-min"
    type="number"
    placeholder="Exclusive minimum"
    class="input input-bordered"
    bind:value={schema.exclusiveMinimum}
    on:change={() => schema.minimum = null}
  >
</div>