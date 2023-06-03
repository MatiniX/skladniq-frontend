<script lang="ts">
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import { FieldError, FormGroup, FormLabel, InputField, Checkbox } from '$lib/components/form';
	import { Button } from '$lib/components/buttons';
	import api from '$lib/axios/instance';
	import { user } from '$lib/stores/userStore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			name: '',
			country: '',
			region: '',
			city: '',
			streetAddress: '',
			postcode: '',
			active: true
		},
		validationSchema: yup.object().shape({
			name: yup.string().min(2).required(),
			country: yup.string().required(),
			region: yup.string().required(),
			city: yup.string().required(),
			streetAddress: yup.string().required(),
			postcode: yup.string().required(),
			active: yup.boolean().required()
		}),
		onSubmit: async (values) => {
			const updatedWarehouse = {
				id: $page.params.warehouseId,
				name: values.name,
				active: values.active
			};
			const updatedAddress = {
				id: warehouse.address.id,
				country: values.country,
				city: values.city,
				region: values.region,
				postcode: values.postcode,
				streetAddress: values.streetAddress
			};

			const warehouseRes = await api.patch('/warehouse/update', updatedWarehouse);
			if (warehouseRes.status !== 200) {
				throw new Error('Failed updating the warehouse');
			}

			const addressRes = await api.patch('/address/update', updatedAddress);
			if (addressRes.status === 200) {
				goto('/dashboard/warehouse');
			} else {
				throw new Error('Failed to update the address');
			}
		}
	});

	let warehouse: any;

	onMount(async () => {
		const res = await api.get('/warehouse/' + $page.params.warehouseId);
		if (res.status === 200) {
			warehouse = res.data;
			$form.name = warehouse.name;
			$form.city = warehouse.address.city;
			$form.country = warehouse.address.country;
			$form.postcode = warehouse.address.postcode;
			$form.region = warehouse.address.region;
			$form.streetAddress = warehouse.address.streetAddress;
			$form.active = warehouse.active;
		}
	});
</script>

<div class="px-12 pt-4">
	<form on:submit={handleSubmit}>
		<div class="flex flex-col gap-4">
			<FormGroup>
				<FormLabel for="name">Warehouse name</FormLabel>
				<InputField
					bind:value={$form.name}
					on:change={handleChange}
					type="text"
					name="name"
					id="name"
				/>
				{#if $errors.name}
					<FieldError message={$errors.name} />
				{/if}
			</FormGroup>
			<FormGroup>
				<FormLabel for="active">Active</FormLabel>
				<Checkbox
					bind:checked={$form.active}
					bind:value={$form.active}
					on:change={handleChange}
					name="active"
					id="active"
				/>
				{#if $errors.active}
					<FieldError message={$errors.active} />
				{/if}
			</FormGroup>

			<h3 class="flex items-center text-xl text-gray-800 font-bold">Warehouse address</h3>
			<FormGroup class="col-start-2 row-start-2">
				<FormLabel for="country">Country</FormLabel>
				<InputField
					bind:value={$form.country}
					on:change={handleChange}
					type="text"
					name="country"
					id="country"
				/>
				{#if $errors.country}
					<FieldError message={$errors.country} />
				{/if}
			</FormGroup>

			<FormGroup>
				<FormLabel for="region">Region</FormLabel>
				<InputField
					bind:value={$form.region}
					on:change={handleChange}
					type="text"
					name="region"
					id="region"
				/>
				{#if $errors.region}
					<FieldError message={$errors.region} />
				{/if}
			</FormGroup>

			<FormGroup class="col-start-2">
				<FormLabel for="city">City</FormLabel>
				<InputField
					bind:value={$form.city}
					on:change={handleChange}
					type="text"
					name="city"
					id="city"
				/>
				{#if $errors.city}
					<FieldError message={$errors.city} />
				{/if}
			</FormGroup>

			<FormGroup class="col-start-2">
				<FormLabel for="streetAddress">Street address</FormLabel>
				<InputField
					bind:value={$form.streetAddress}
					on:change={handleChange}
					type="text"
					name="streetAddress"
					id="streetAddress"
				/>
				{#if $errors.streetAddress}
					<FieldError message={$errors.streetAddress} />
				{/if}
			</FormGroup>

			<div class="flex justify-between">
				<FormGroup>
					<FormLabel for="postcode">Postcode</FormLabel>
					<InputField
						bind:value={$form.postcode}
						on:change={handleChange}
						type="text"
						name="postcode"
						id="postcode"
					/>
					{#if $errors.postcode}
						<FieldError message={$errors.postcode} />
					{/if}
				</FormGroup>

				<Button>Update Warehouse</Button>
			</div>
		</div>
	</form>
</div>
