<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let open;
  export let valid;

  const done = () => {
    open = false
    dispatch('done')
  }
  const cancel = () => {
    open = false
    dispatch('cancel')
  }
</script>

<div class="modal{open ? ' modal-open' : ''}">
  <div class="modal-box">
    <slot></slot>
    <div class="modal-action">
      <button
        class="btn btn-primary"
        disabled={!valid}
        on:click={done}
      >Done</button> 
      <button class="btn" on:click={cancel}>Cancel</button>
    </div>
  </div>
</div>