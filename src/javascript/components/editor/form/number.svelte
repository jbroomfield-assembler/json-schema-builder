<script>
  import { createEventDispatcher } from 'svelte'

  export let label
  export let resource = {}
  export let key
  export let errors = {}
  export let placeholder
  export let autocomplete = 'on'
  export let inputClasses = ''
  export let step = 1
  export let value = resource[key]

  $: resource[key] = value

  const dispatch = createEventDispatcher()

  function handleChange() {
    dispatch('change', resource)
  }

  export function setResource(r) {
    resource = r
  }
</script>


<div class="tw-form-control">
  {#if label}
  <label class="tw-label" for='{key}'>
    <span class="tw-label-text">{label}</span>
  </label>
  {/if}
  <input bind:value="{value}" 
         on:change={handleChange}
         type="number" 
         name='{key}'
         {step}
         {autocomplete}
         {placeholder}
         class:tw-input-error="{errors[key]}"
         class="tw-input tw-input-bordered {inputClasses}">
  {#if errors[key]}
    <label class="tw-label" for='{key}'>
      <span class="tw-label-text-alt">{errors[key]}</span>
    </label>
  {/if}
</div>