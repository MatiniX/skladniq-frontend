<script lang="ts">
	import { goto } from '$app/navigation';
	import api from '$lib/axios/instance';
	import { Button } from '$lib/components/buttons';
	import Modal from '$lib/components/elements/Modal.svelte';
	import ProductTable from '$lib/components/product-table/ProductTable.svelte';
	import { user } from '$lib/stores/userStore';
	import { onMount } from 'svelte';

	let products: any[] = [];

	let deleteProductModal = false;
	let currentProductId = '';

	onMount(async () => {
		const res = await api.get(`/product?orgId=${$user?.organizationId}`);

		if ((res.status = 200)) {
			products = res.data;
		}
	});

	const handleProductDelete = async (e: CustomEvent<{ id: string }>) => {
		deleteProductModal = true;
		currentProductId = e.detail.id;
	};
</script>

<div class="p-8">
	<ProductTable
		{products}
		on:productDelete={handleProductDelete}
		on:productDetail={(e) => {
			goto('/dashboard/product/detail/' + e.detail.id);
		}}
		on:productEdit={(e) => {
			goto('/dashboard/product/edit/' + e.detail.id);
		}}
	/>
	<Modal bind:isOpen={deleteProductModal} title="Do you want to delete this product?">
		<div class="flex gap-2 flex-row-reverse">
			<Button
				variant="primary"
				size="sm"
				on:click={async () => {
					const res = await api.delete('/product/' + currentProductId);
					console.log(res);
					if (res.status === 200) {
						products = products.filter((p) => p.id !== res.data.id);
					}
					deleteProductModal = false;
				}}>Yes</Button
			>
			<Button
				variant="secondary"
				size="sm"
				on:click={() => {
					console.log('no delete:', currentProductId);
					deleteProductModal = false;
				}}>No</Button
			>
		</div>
	</Modal>
</div>
