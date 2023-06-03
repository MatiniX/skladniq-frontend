<script lang="ts">
	import { goto } from '$app/navigation';
	import api from '$lib/axios/instance';
	import { Button, IconButton } from '$lib/components/buttons';
	import { ConfirmModal } from '$lib/components/modals';
	import { Table, TableData, TableHeader, TableRow } from '$lib/components/table';
	import { user } from '$lib/stores/userStore';
	import { onMount } from 'svelte';
	import { InventoryMajor, EditMajor, DeleteMajor } from 'svelte-polaris-icons';

	let allWarehouses: any;
	let loading = true;
	let confirmModalOpen = false;

	onMount(async () => {
		const res = await api.get('/warehouse/organization/' + $user?.organizationId);
		allWarehouses = res.data;
		loading = false;
	});
</script>

<div class="h-full p-4 flex gap-8 items-start">
	{#if loading}
		<h1>loading...</h1>
	{:else}
		<Table>
			<thead>
				<TableRow>
					<TableHeader>Name</TableHeader>
					<TableHeader>Status</TableHeader>
					<TableHeader>Address</TableHeader>
					<TableHeader>Actions</TableHeader>
				</TableRow>
			</thead>
			<tbody>
				{#each allWarehouses as warehouse}
					<TableRow>
						<TableData>{warehouse.name}</TableData>
						<TableData>{warehouse.active ? 'Active' : 'Not Active'}</TableData>
						<TableData>{`${warehouse.address.streetAddress}, ${warehouse.address.city}`}</TableData>
						<TableData class="flex gap-4">
							<IconButton
								icon={InventoryMajor}
								on:click={() => goto('/dashboard/warehouse/' + warehouse.id)}
								width={20}
								variant="secondary"
							/>
							<IconButton
								icon={EditMajor}
								on:click={() => goto('/dashboard/warehouse/edit/' + warehouse.id)}
								width={20}
								variant="secondary"
							/>
							<IconButton icon={DeleteMajor} on:click={() => {}} width={20} variant="danger" />
						</TableData>
					</TableRow>
				{/each}
			</tbody>
		</Table>
	{/if}

	<div class="p-4 bg-white shadow rounded">
		<h3 class="mb-4 text-lg text-gray-400">Create a new warehouse</h3>
		<p class="mb-4">
			Fill out all the necessary information and start organizing your’s new warehouse stock.
		</p>
		<Button
			variant="secondary"
			size="sm"
			on:click={() => {
				goto('/dashboard/warehouse/create');
			}}>Create warehouse</Button
		>
	</div>

	<ConfirmModal
		onConfirm={async () => {}}
		title="Are you sure you want to delete this warehouse?"
		confirmBtnVariant="primary"
		bind:isOpen={confirmModalOpen}
	/>
</div>
