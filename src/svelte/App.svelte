<script>
	import SchemaBuilder from './schema_builder.svelte'
</script>

<main>
	<SchemaBuilder />
</main>

<style global lang="postcss">
	@tailwind base;
  	@tailwind components;
  /* purgecss end ignore */
  	@tailwind utilities;


	@layer utilities {
  		.ml-55 {
    		margin-left: 55%;
		}
	}
</style>