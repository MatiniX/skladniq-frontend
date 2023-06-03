<script lang="ts">
	import { page } from '$app/stores';
	import { isCurrentRoute } from '$lib/utils';
	import { fade } from 'svelte/transition';

	export let name: string;
	export let href: string;
	export let icon: ConstructorOfATypedSvelteComponent;
	$: selected = isCurrentRoute($page.route.id, href);
</script>

<div>
	<a
		{href}
		class="flex relative pl-4 py-1 gap-2 items-center transition cursor-pointer hover:bg-slate-200 
  {selected ? 'bg-slate-200' : ''}"
	>
		{#if selected}
			<span
				transition:fade={{ duration: 100 }}
				class="h-full w-1 bg-blue-700 absolute left-0 rounded-r-lg"
			/>
		{/if}

		<i class={selected ? 'fill-blue-700 stroke-blue-700' : 'fill-gray-700 stroke-gray-700'}>
			<svelte:component this={icon} width={16} />
		</i>
		<p class={selected ? 'text-blue-800 select-none' : 'text-gray-800 select-none'}>
			{name}
		</p>
	</a>
	<slot {selected} />
</div>
