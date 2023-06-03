<script>
	import { ListboxOptions } from '@rgossiaux/svelte-headlessui';
</script>

<ListboxOptions
	class="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-sm max-h-60 border border-gray-400 focus:outline-none sm:text-sm"
>
	<slot />
</ListboxOptions>
