<script lang="ts">
	import { DashboardMainContent } from '$lib/components/elements';
	import { SideNav } from '$lib/components/nav';
</script>

<main class="flex h-screen w-screen relative">
	<SideNav />
	<DashboardMainContent>
		<slot />
	</DashboardMainContent>
</main>
