<script lang="ts">
	import api from '$lib/axios/instance';
	import NoOrganizationCard from '$lib/components/elements/NoOrganizationCard.svelte';
	import InviteTable from '$lib/components/invite-table/InviteTable.svelte';
	import { Table, TableHeader, TableRow } from '$lib/components/table';
	import { user } from '$lib/stores/userStore';
	import { onMount } from 'svelte';
</script>

<div class="p-8">
	{#if !$user?.organizationId}
		<NoOrganizationCard />

		<div>
			<InviteTable />
		</div>
	{/if}
</div>
