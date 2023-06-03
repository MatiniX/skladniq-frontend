<script lang="ts">
	import { Listbox } from '@rgossiaux/svelte-headlessui';
	import { createForm } from 'svelte-forms-lib';
	import { Button } from '../buttons';
	import { Modal } from '../elements';
	import { Checkbox, FormGroup, FormLabel, InputField } from '../form';
	import { CustomListboxOption, CustomListboxOptions } from '../listbox';
	import CustomListboxButton from '../listbox/CustomListboxButton.svelte';
	import * as yup from 'yup';
	import api from '$lib/axios/instance';
	import { onMount } from 'svelte';

	export let warehouseId: string;
	export let organizationProducts: any[];
	export let modalOpen: boolean;
	let selectedProductName = '';

	onMount(() => {
		selectedProductName = organizationProducts[0].name;
		$form.productId = organizationProducts[0].id;
	});

	const { form, errors, handleChange, handleSubmit, handleReset, updateField } = createForm({
		initialValues: {
			productId: '',
			unitsInStock: 0,
			maxCapacity: 0,
			unlimitedCapacity: false
		},

		onSubmit: async ({ maxCapacity, productId, unitsInStock, unlimitedCapacity }) => {
			// taký hek ček lebo unlimitedCapacity sa neinicializuje do initialValues keď má checkbox vo fromulári
			if (unlimitedCapacity === undefined) {
				unlimitedCapacity = false;
			}

			const warehouseProduct = {
				productId,
				warehouseId,
				maxCapacity: Number(maxCapacity),
				unitsInStock: Number(unitsInStock),
				unlimitedCapacity
			};

			const res = await api.post('/warehouse/product', warehouseProduct);

			if (res.status === 201) {
				handleReset();
				$form.productId = organizationProducts[0].id;
				modalOpen = false;
			}
		}
	});
</script>

<Modal bind:isOpen={modalOpen} title="Add product to warehouse">
	{#if organizationProducts}
		<form on:submit={handleSubmit}>
			<div class="grid grid-cols-4 gap-x-2 gap-y-4">
				<FormGroup class="col-span-2">
					<FormLabel for="product">Select product</FormLabel>
					<Listbox
						bind:value={$form.productId}
						on:change={(e) => {
							$form.productId = e.detail;
							selectedProductName = organizationProducts.find((x) => x.id === e.detail).name;
							console.log($form.productId);
						}}
					>
						<div class="relative mt-1">
							<CustomListboxButton>{selectedProductName}</CustomListboxButton>
							<CustomListboxOptions>
								{#each organizationProducts as op}
									<CustomListboxOption value={op.id}>{op.name}</CustomListboxOption>
								{/each}
							</CustomListboxOptions>
						</div>
					</Listbox>
				</FormGroup>
				<FormGroup>
					<FormLabel for="unitsInStock">Units in stock</FormLabel>
					<InputField
						type="number"
						name="unitsInStock"
						on:change={handleChange}
						bind:value={$form.unitsInStock}
					/>
				</FormGroup>
				<FormGroup>
					<FormLabel for="maxCapacity">Max capacity</FormLabel>
					<InputField
						type="number"
						name="maxCapacity"
						on:change={handleChange}
						bind:value={$form.maxCapacity}
						disabled={$form.unlimitedCapacity}
					/>
				</FormGroup>
				<FormGroup class="col-span-2">
					<FormLabel for="unlimitedCapacity">Unlimited capacity</FormLabel>
					<Checkbox
						name="unlimitedCapacity"
						bind:value={$form.unlimitedCapacity}
						bind:checked={$form.unlimitedCapacity}
						on:change={handleChange}
					/>
				</FormGroup>
			</div>
			<Button type="submit" className="col-start-4">Add</Button>
		</form>
	{/if}
</Modal>
