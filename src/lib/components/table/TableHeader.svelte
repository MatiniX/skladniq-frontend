<script lang="ts">
	let className = '';
	export { className as class };
</script>

<th class={'px-4 py-2 font-normal text-left text-gray-600 ' + className}>
	<slot />
</th>
