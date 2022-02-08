<script>
  import { createEventDispatcher } from 'svelte';
  import Select from 'svelte-select';
  
  const dispatch = createEventDispatcher()
  export let errors = {}
  export let label
  export let key
  export let items
  export let multiple = false
  export let labelIdentifier = 'label'
  export let optionIdentifier = 'value'
  export let isClearable = true
  export let resource = {}
  export let value = resource[key]
  export let placeholder
  export let valueOption = valueToOption()
  export let groupBy = () => { }

  function valueToOption() {
    if(multiple) {
      if(!value) return []
      return items.filter((i) => {
        return value.includes(i[optionIdentifier])
      })
    } else {
      const res = items.find((i) => {
        return i[optionIdentifier] == value
      })
      if(res) { return res }
      return { [optionIdentifier]: null, [labelIdentifier]: '' }
    }
  }

  $: {
    if(multiple) {
      value = valueOption.map((vo) => {
        return vo[optionIdentifier]
      })
      resource[key] = value
    } else {
      value = valueOption[optionIdentifier]
      resource[key] = value
    }
  }

  function handleClear(e) {
    dispatch('clear')
    if(multiple) {
      valueOption = valueOption.filter((vo) => {
        return vo[optionIdentifier] != e.detail[optionIdentifier]
      })
    } else {
      valueOption = { [optionIdentifier]: null, [labelIdentifier]: '' }
    }
  }

  function handleChange(e) {
    dispatch('change', { [key]: e.detail[optionIdentifier] })
  }

  $: console.log({items})
</script>

<style>
  .asm-dropdown-wrapper :global(.listContainer) {
    z-index: 20;
  }
</style>

<div class='asm-dropdown-wrapper tw-form-control'>
  {#if label}
  <label class="tw-label" for='{key}'>
    <span class="tw-label-text">{label}</span>
  </label>
  {/if}
  <Select name='{key}'
          {items} 
          {labelIdentifier}
          {optionIdentifier}
          {isClearable}
          isMulti={multiple}
          {placeholder}
          {groupBy}
          bind:value={valueOption}
          containerClasses={errors[key] ? 'tw-input-error' : '' }
          on:clear={handleClear}
          on:select={handleChange}>
  </Select>
  {#if errors[key]}
    <label class="tw-label" for='{key}'>
      <span class="tw-label-text-alt">{errors[key]}</span>
    </label>
  {/if}
</div>