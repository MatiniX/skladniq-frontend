<script lang="ts">
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import { FieldError, FormGroup, FormLabel, InputField, Textarea } from '$lib/components/form';
	import { Button } from '$lib/components/buttons';
	import api from '$lib/axios/instance';
	import { user } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			name: '',
			country: '',
			region: '',
			city: '',
			streetAddress: '',
			postcode: ''
		},
		validationSchema: yup.object().shape({
			name: yup.string().min(2).required(),
			country: yup.string().required(),
			region: yup.string().required(),
			city: yup.string().required(),
			streetAddress: yup.string().required(),
			postcode: yup.string().required()
		}),
		onSubmit: async (values) => {
			const organizationId = $user?.organizationId;
			const res = await api.post('/warehouse/create', { organizationId, ...values });

			if (res.status === 201) {
				goto('/dashboard/warehouse/' + res.data.id);
			}
		}
	});
</script>

<div class="px-12 pt-4">
	<form on:submit={handleSubmit}>
		<div class="flex flex-col gap-4">
			<h3 class="flex items-center text-2xl text-gray-800 font-bold">Create warehouse</h3>
			<FormGroup>
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

				<Button>Create Warehouse</Button>
			</div>
		</div>
	</form>
</div>
