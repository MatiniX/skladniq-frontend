<script lang="ts">
	let className = '';
	export { className as class };
</script>

<tr class={'border-b border-gray-200 ' + className}>
	<slot />
</tr>
