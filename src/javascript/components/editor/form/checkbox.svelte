<script>
  import { createEventDispatcher } from 'svelte'
  export let label
  export let key
  export let errors = {}
  export let resource = {}
  export let value
  export let checked = (typeof value == 'undefined') ? resource[key] : value
  export let seperate = true
  
  const dispatch = createEventDispatcher()

  $: value = checked

  function handleClicked() {
    checked = !checked
    resource[key] = checked
    dispatch('change', { [key]: checked })
  }
</script>

<div class="tw-form-control">
  <label class="tw-cursor-pointer tw-label" 
         class:tw-justify-start={!seperate}
         on:click|preventDefault={handleClicked}>
    <span class="tw-label-text tw-text-lg tw-mr-4">{label}</span> 
    <input name="{key}"
           style="pointer-events: none;"
           type="checkbox"
           {checked}
           class="tw-checkbox">
  </label>
  {#if errors[key]}
    <label class="tw-label" for='{key}'>
      <span class="tw-label-text-alt">{errors[key]}</span>
    </label>
  {/if}
</div>