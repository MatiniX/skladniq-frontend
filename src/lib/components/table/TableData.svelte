<script lang="ts">
	let className = '';
	export { className as class };
</script>

<td class={'px-4 py-2 font-normal text-left text-gray-800 ' + className}>
	<slot />
</td>
