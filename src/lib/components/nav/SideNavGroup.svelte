<script lang="ts">
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import { ChevronRightMinor } from 'svelte-polaris-icons';
	import { slide } from 'svelte/transition';

	export let groupName: string;
</script>

<Disclosure let:open>
	<DisclosureButton class="w-full pl-4 flex items-center justify-between">
		<p class="text-gray-600 font-light">
			{groupName}
		</p>
		<i class="inline-block transition-transform {open ? 'rotate-90' : ''}">
			<ChevronRightMinor width={16} class="stroke-gray-500 fill-gray-500" />
		</i>
	</DisclosureButton>
	{#if open}
		<div transition:slide|local>
			<DisclosurePanel>
				<slot />
			</DisclosurePanel>
		</div>
	{/if}
</Disclosure>
