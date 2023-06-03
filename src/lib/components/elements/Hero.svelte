<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '../buttons/Button.svelte';
	import halfCircle from '$lib/assets/hero_half-circle.svg';
	import blocks from '$lib/assets/hero_blocks.svg';
</script>

<div class="h-full grid place-items-center relative">
	<div class="w-2/3 flex flex-col items-center gap-4 relative z-10">
		<h1 class="text-6xl text-center text-gray-800 font-bold">
			Your organization’s entire inventory under <span class="text-blue-500">one</span> roof.
		</h1>
		<p class="w-1/2 text-lg text-center text-gray-500">
			SkladniQ is an universal inventory managment system for small companies and entrepreneurs from
			any industry.
		</p>
		<Button size="lg" on:click={() => goto('/signup')}>Try Now</Button>
	</div>
	<img src={halfCircle} alt="svg graphics" class="absolute h-full left-0 z-0" />
	<img src={blocks} alt="svg graphics" class="absolute h-1/2 right-72 z-0" />
</div>
