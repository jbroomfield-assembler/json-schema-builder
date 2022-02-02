<script>
  import Basic from "./tabs/object/Basic.svelte"
  import Required from "./tabs/object/Required.svelte"
  import DependentRequired from "./tabs/object/DependentRequired.svelte"

  export let schema;
  export let valid;
  export let activeTab;

  const validMin = () => {
    const min = schema.minProperties
    if (min == null) return true
    if (min < 0) return false
    return Number.isInteger(min)
  }

  const validMax = () => {
    const max = schema.maxProperties
    if (max == null) return true
    if (max < 1) return false
    return Number.isInteger(max)
  }

  const validateSchema = () => {
    valid = validMin() && validMax()
  }

$: schema && validateSchema()

</script>

{#if activeTab === 0}
  <Basic bind:schema />
{:else if activeTab === 1}
  <Required bind:schema />
{:else if activeTab === 2}
  <DependentRequired bind:schema />
{/if}