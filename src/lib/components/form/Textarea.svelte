<script lang="ts">
	export let value = '';

	interface $$Props extends svelte.JSX.SvelteInputProps {}
</script>

<textarea
	bind:value
	on:change
	{...$$restProps}
	class="w-full px-2 py-1 border border-gray-400 shadow-inner rounded 
        focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
        transition-all"
/>
