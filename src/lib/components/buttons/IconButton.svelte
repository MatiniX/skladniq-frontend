<script lang="ts">
	import type { SvelteComponentTyped } from 'svelte/internal';
	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;

	const variants = {
		primary: 'hover:bg-blue-100 hover:fill-blue-500',
		secondary: 'hover:bg-gray-100 hover:fill-gray-500',
		danger: 'hover:bg-red-100 hover:fill-red-500',
		warning: 'hover:bg-yellow-100 hover:fill-yellow-500'
	};

	export let icon: C;
	export let width: number;
	export let variant: keyof typeof variants;
</script>

<button class="p-1 rounded fill-gray-400 {variants[variant]}" on:click>
	<i>
		<svelte:component this={icon} {width} />
	</i>
</button>
