<script lang="ts">
	import { page } from '$app/stores';
	import api from '$lib/axios/instance';
	import { Button } from '../buttons';
	import { Modal } from '../elements';
	import { FormGroup, FormLabel, InputField } from '../form';

	export let fetchOrgProducts: () => Promise<void>;
	export let isOpen: boolean;
	export let product: any;
	let newStock = 0;
	//  TODO: api call na zmenu stocku
	const updateStock = async (newStock: number) => {
		const res = await api.patch('/warehouse/product', {
			warehouseId: $page.params.warehouseId,
			productId: product.productId,
			unitsInStock: Number(newStock),
			maxCapacity: product.maxCapacity,
			unlimitedCapacity: product.unlimitedCapacity
		});

		if (res.status === 200) {
			isOpen = false;
		}
	};
</script>

<Modal bind:isOpen title="Edit stock for {product?.productName}">
	<form
		on:submit={async (e) => {
			console.log(newStock);
			await updateStock(newStock);
			await fetchOrgProducts();
		}}
	>
		<FormGroup>
			<FormLabel for="newStock">New stock</FormLabel>
			<InputField type="number" name="newStock" bind:value={newStock} />
		</FormGroup>
		<Button type="submit">Save</Button>
	</form>
</Modal>
