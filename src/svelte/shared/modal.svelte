<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher();

  export let isOpen = false
  export let size
  export let createOnOpen = false

  export function open() {
    isOpen = true
  }

  export function close() {
    isOpen = false
    dispatch('close')
  }

  function handleKeydown(event) {
    if(event.keyCode == 27) {
      close()
    }
  }

  function catchClick(e) {
    e.preventDefault()
    e.stopPropagation()
  }
</script>

<svelte:window on:keydown={handleKeydown}/>
{#if !createOnOpen || isOpen}
<div class='absolute' hidden={!isOpen}>
  <input type="checkbox" bind:checked={isOpen} class="modal-toggle"> 
  <div class="modal {size}" on:click="{catchClick}">
    <div class="modal-box">
      <div on:click={close} class='modal-close'>
        <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </div>
      <div class="modal-overflow-content">
        <slot></slot>
      </div>
    </div>
  </div>
</div>
{/if}