<script lang="ts">
	import api from '$lib/axios/instance';
	import Hero from '$lib/components/elements/Hero.svelte';
	import TopNav from '../lib/components/nav/TopNav.svelte';

	const callSecuredEndpoint = async () => {
		const res = await api.get('/protected');
	};
</script>

<div class="flex flex-col h-screen">
	<TopNav />
	<main class="bg-slate-50 flex-auto">
		<Hero />
	</main>
</div>
