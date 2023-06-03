<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import api from '$lib/axios/instance';
	import { Button, IconButton } from '$lib/components/buttons';
	import AddWarehouseProductModal from '$lib/components/modals/AddWarehouseProductModal.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import EditStockModal from '$lib/components/modals/EditStockModal.svelte';
	import { Table, TableData, TableHeader, TableRow } from '$lib/components/table';
	import { user } from '$lib/stores/userStore';
	import { onMount } from 'svelte';
	import { EditMinor, ListMajor, DeleteMajor } from 'svelte-polaris-icons';

	let warehouseProducts: any[];
	let organizationProducts: any[];
	let selectedProductName: any;
	let modalOpen = false;
	let editStockModal = false;
	let confirmModalOpen = false;
	let currentProduct: any;

	const fetchOrgProducts = async () => {
		let organizationProductsRes = await api.get(`/product?orgId=${$user?.organizationId}`);
		if (organizationProductsRes.status === 200) {
			organizationProducts = organizationProductsRes.data;
			selectedProductName = organizationProducts[0].name;
		}

		let warehouseProductsRes = await api.get('/warehouse/product/' + $page.params.warehouseId);
		if (warehouseProductsRes.status === 200) {
			warehouseProducts = warehouseProductsRes.data.map((p: any) => {
				const product = {
					productName: p.product.name,
					unitsInStock: p.unitsInStock,
					maxCapacity: p.maxCapacity,
					unlimitedCapacity: p.unlimitedCapacity,
					productId: p.productId
				};
				return product;
			});
		}
	};

	onMount(async () => {
		await fetchOrgProducts();
	});
</script>

<div>
	<Button on:click={() => (modalOpen = true)}>Add product</Button>
	<Table
		><thead>
			<TableRow>
				<TableHeader>Product</TableHeader>
				<TableHeader>Current stock</TableHeader>
				<TableHeader />
			</TableRow>
		</thead>
		{#if warehouseProducts}
			<tbody>
				{#each warehouseProducts as wp}
					<TableRow>
						<TableData>{wp.productName}</TableData>
						<TableData>
							{#if wp.unlimitedCapacity}
								{wp.unitsInStock}
							{:else}
								{wp.unitsInStock}/{wp.maxCapacity}
							{/if}
						</TableData>
						<TableData>
							<IconButton
								icon={EditMinor}
								variant="secondary"
								width={20}
								on:click={() => {
									currentProduct = wp;
									editStockModal = true;
								}}
							/>
							<IconButton
								icon={ListMajor}
								variant="secondary"
								width={20}
								on:click={() =>
									goto(`/dashboard/warehouse/${$page.params.warehouseId}/${wp.productId}`)}
							/>
							<IconButton
								icon={DeleteMajor}
								variant="danger"
								width={20}
								on:click={() => {
									currentProduct = wp;
									confirmModalOpen = true;
								}}
							/>
						</TableData>
					</TableRow>
				{/each}
			</tbody>
		{/if}
		<tbody />
	</Table>

	{#if organizationProducts}
		<AddWarehouseProductModal
			bind:modalOpen
			{organizationProducts}
			warehouseId={$page.params.warehouseId}
		/>
	{/if}

	<EditStockModal bind:isOpen={editStockModal} product={currentProduct} {fetchOrgProducts} />

	<ConfirmModal
		onConfirm={async () => {
			const res = await api.delete('/warehouse/product', {
				data: { warehouseId: $page.params.warehouseId, productId: currentProduct.productId }
			});
			if (res.status === 204) {
				confirmModalOpen = false;
			}
			await fetchOrgProducts();
		}}
		title="Are you sure you want to delete this product?"
		confirmBtnVariant="primary"
		bind:isOpen={confirmModalOpen}
	/>
</div>
