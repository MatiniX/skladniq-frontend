<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '../buttons';
	import { TableData, TableRow } from '../table';
	import api from '$lib/axios/instance';
	import { invalidate } from '$app/navigation';
	import { setUser, setUserDetails } from '$lib/auth';

	export let orgId: string;
	export let userId: string;

	let orgName: string;
	let orgDesc: string;
	let loading = true;

	onMount(async () => {
		const res = await api.get('/organizations/' + orgId);
		loading = false;
		if (res.status === 200) {
			orgName = res.data.name;
			orgDesc = res.data.description;
		}
	});

	const handleInviteAccept = async () => {
		const res = await api.post('/organizations/add-member', {
			organizationId: orgId,
			memberId: userId
		});

		if (res.status === 200) {
			await setUser();
			await setUserDetails();

			await invalidate('/dashboard');
		}
	};
</script>

<TableRow>
	{#if loading}
		<TableData>loading...</TableData>
	{:else}
		<TableData>{orgName}</TableData>
		<TableData>{orgDesc ?? 'No description provided.'}</TableData>
		<TableData><Button className="ml-auto" on:click={handleInviteAccept}>Join</Button></TableData>
	{/if}
</TableRow>
