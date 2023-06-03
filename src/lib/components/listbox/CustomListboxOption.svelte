<script lang="ts">
	import { ListboxOption } from '@rgossiaux/svelte-headlessui';
	import { TickSmallMinor } from 'svelte-polaris-icons';

	export let value: any;
</script>

<ListboxOption
	{value}
	class={({ active }) =>
		active
			? 'cursor-default select-none relative py-2 pl-10 pr-4 text-gray-800 bg-blue-100'
			: 'cursor-default select-none relative py-2 pl-10 pr-4 text-gray-800'}
	let:selected
>
	<span class="block truncate">
		<slot />
	</span>
	{#if selected}
		<span class="absolute inset-y-0 left-0 flex items-center pl-3 stroke-blue-600">
			<TickSmallMinor width={20} />
		</span>
	{/if}
</ListboxOption>
