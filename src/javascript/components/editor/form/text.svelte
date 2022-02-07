<script>
  import { createEventDispatcher } from 'svelte'

  export let label
  export let resource = {}
  export let key
  export let errors = {}
  export let placeholder
  export let autocomplete = 'on'
  export let inputClasses = ''
  export let hint
  export let value = resource[key]
  export let input

  $: resource[key] = value

  const dispatch = createEventDispatcher()

  function handleChange() {
    dispatch('change', resource)
  }

  export function setResource(r) {
    resource = r
    value = resource[key]
  }

  export function focus() {
    input.focus()
  }
</script>

<style>
  .asm-text-tooltip:before {
    z-index: 20;
  }
</style>

<div class="tw-form-control">
  {#if label}
  <label class="tw-label" for='{key}'>
    <span class="tw-label-text">
      <span>{label}</span>
      {#if hint}
        <span class='asm-text-tooltip tw-tooltip tw-tooltip-bottom' data-tip={hint}>
          <svg class="tw-h-4 tw-w-4" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />  <line x1="12" y1="17" x2="12.01" y2="17" /></svg>
        </span>
      {/if}
    </span>
  </label>
  {/if}
  <input bind:value={value}
         on:change={handleChange}
         bind:this={input}
         type="text" 
         name='{key}'
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