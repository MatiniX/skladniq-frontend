<script lang="ts">
	import { DashboardContent } from '.';
	import DashboardTopNav from '../nav/DashboardTopNav.svelte';
</script>

<div class="flex flex-col h-full max-h-screen flex-auto bg-white">
	<DashboardTopNav />
	<DashboardContent>
		<slot />
	</DashboardContent>
</div>
