<script lang="ts">
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle
	} from '@rgossiaux/svelte-headlessui';
	import { DeleteMajor, MobileCancelMajor } from 'svelte-polaris-icons';
	import IconButton from '../buttons/IconButton.svelte';

	export let isOpen: boolean;
	export let title: string;
	export let content = '';
</script>

<Dialog open={isOpen} on:close={() => (isOpen = false)}>
	<DialogOverlay class="fixed top-0 right-0 w-screen h-screen z-40 bg-black opacity-30 " />

	<div
		class="fixed max-w-xl top-1/2 left-1/2 p-4 bg-white z-40 rounded -translate-x-1/2 -translate-y-1/2"
	>
		<div class="flex">
			<DialogTitle class="mr-auto text-gray-800 font-bold">{title}</DialogTitle>
			<IconButton
				icon={MobileCancelMajor}
				variant="secondary"
				width={20}
				on:click={() => (isOpen = false)}
			/>
		</div>

		{#if content}
			<DialogDescription>{content}</DialogDescription>
		{/if}

		<div>
			<slot />
		</div>
	</div>
</Dialog>
