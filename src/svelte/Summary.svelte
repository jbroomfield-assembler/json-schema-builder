<script>
  import { createEventDispatcher } from 'svelte';
  export let schema;
  export let displayType;
  const dispatch = createEventDispatcher();

  const edit = () => {
    dispatch('edit')
  }

  const deleteProperty = () => {
    dispatch('deleteProperty', {
      code: schema.code,
    })
  }
</script>

<div>
  {schema.title} ({displayType || schema.type})
</div>

<div>
  <button class="btn btn-warning" on:click={edit}>Edit</button>
  <button class="btn btn-error" on:click={deleteProperty}>Delete</button>
</div>