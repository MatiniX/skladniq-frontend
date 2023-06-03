<script>
	import { ListboxButton } from '@rgossiaux/svelte-headlessui';
	import { SelectMinor } from 'svelte-polaris-icons';
</script>

<ListboxButton
	class="relative w-full py-1 pl-3 pr-10 text-left bg-white border border-gray-400 rounded shadow-sm cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-all"
>
	<span class="block truncate">
		<slot />
	</span>
	<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
		<SelectMinor width={20} />
	</span>
</ListboxButton>
