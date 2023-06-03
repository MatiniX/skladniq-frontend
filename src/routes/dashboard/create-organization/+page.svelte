<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/buttons';
	import { FormGroup, FormLabel, InputField, FieldError } from '$lib/components/form';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import Textarea from '$lib/components/form/Textarea.svelte';
	import api from '$lib/axios/instance';
	import { setUser } from '$lib/auth';
	import { user } from '$lib/stores/userStore';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($user?.organizationId) {
			goto('/dashboard');
		}
	});

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			name: '',
			description: '',
			country: '',
			region: '',
			city: '',
			streetAddress: '',
			postcode: ''
		},
		validationSchema: yup.object().shape({
			name: yup.string().min(2).required(),
			description: yup.string().min(2).required(),
			country: yup.string().required(),
			region: yup.string().required(),
			city: yup.string().required(),
			streetAddress: yup.string().required(),
			postcode: yup.string().required()
		}),
		onSubmit: async (values) => {
			const response = await api.post('/organizations/create', { ...values });

			if (response.status === 201) {
				await setUser();
			}
		}
	});
</script>

<div class="px-12 pt-4">
	<form on:submit={handleSubmit}>
		<div class="grid grid-cols-2 grid-rows-6 gap-4">
			<h3 class="flex items-center text-2xl text-gray-800 font-bold">Organization info</h3>
			<FormGroup class="col-start-1">
				<FormLabel for="name">Organization name</FormLabel>
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

			<FormGroup class="row-span-3 col-start-1">
				<FormLabel for="description">Description of your organization</FormLabel>
				<Textarea
					bind:value={$form.description}
					on:change={handleChange}
					name="description"
					id="description"
					rows={6}
				/>
				{#if $errors.description}
					<FieldError message={$errors.description} />
				{/if}
			</FormGroup>

			<h3 class="col-start-2 row-start-1 flex items-center text-2xl text-gray-800 font-bold">
				Organization address
			</h3>
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

			<FormGroup class="col-start-2">
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

			<Button className="mt-4 col-start-1 row-start-6">Create Organization</Button>
		</div>
	</form>
</div>
