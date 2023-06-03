<script lang="ts">
	let className = '';
	export { className as class };
</script>

<table class={'bg-white shadow rounded w-full ' + className}>
	<slot />
</table>
