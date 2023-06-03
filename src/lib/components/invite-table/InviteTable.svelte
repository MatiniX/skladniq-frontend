<script lang="ts">
	import { onMount } from 'svelte';
	import { Table, TableData, TableHeader, TableRow } from '../table';
	import api from '$lib/axios/instance';
	import InviteTableRow from './InviteTableRow.svelte';

	let invites: any[] = [];

	onMount(async () => {
		const res = await api.get('/user/user-invites');

		if (res.status === 200) {
			invites = res.data;
		}
	});
</script>

<Table>
	<thead>
		<TableRow>
			<TableHeader>Organization name</TableHeader>
			<TableHeader>Description</TableHeader>
			<TableHeader />
		</TableRow>
	</thead>
	<tbody>
		{#if invites.length}
			{#each invites as invite}
				<InviteTableRow orgId={invite.organizationId} userId={invite.userId} />
			{/each}
		{:else}
			<TableRow><TableData>You have no invites at this time</TableData></TableRow>
		{/if}
	</tbody>
</Table>
