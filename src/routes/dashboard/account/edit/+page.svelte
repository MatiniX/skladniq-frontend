<script lang="ts">
	import { goto } from '$app/navigation';
	import api from '$lib/axios/instance';
	import { Button } from '$lib/components/buttons';
	import { FormGroup, FormLabel, InputField, Textarea } from '$lib/components/form';
	import { onMount } from 'svelte';
	import { createForm } from 'svelte-forms-lib';

	const { form, handleChange, handleSubmit } = createForm({
		initialValues: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			about: ''
		},
		onSubmit: async (values) => {
			const res = await api.patch('/user/user-details', { ...values });
			if (res.status === 200) {
				goto('/dashboard/account');
			}
		}
	});

	onMount(async () => {
		const res = await api.get('/user/user-details');
		if (res.status === 200) {
			const { firstName, lastName, phoneNumber, about } = res.data;
			$form.firstName = firstName;
			$form.lastName = lastName;
			$form.phoneNumber = phoneNumber;
			$form.about = about;
		}
	});
</script>

<div class="p-8">
	<form on:submit={handleSubmit}>
		<div class="grid grid-cols-2 gap-4">
			<FormGroup>
				<FormLabel for="firstName">First Name</FormLabel>
				<InputField
					bind:value={$form.firstName}
					on:change={handleChange}
					type="text"
					name="firstName"
					id="firstName"
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel>Last Name</FormLabel>
				<InputField
					bind:value={$form.lastName}
					on:change={handleChange}
					type="text"
					name="lastName"
					id="lastName"
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel for="phoneNumber">Phone number</FormLabel>
				<InputField
					bind:value={$form.phoneNumber}
					on:change={handleChange}
					type="text"
					name="phoneNumber"
					id="phoneNumber"
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel for="about">About</FormLabel>
				<Textarea
					bind:value={$form.about}
					on:change={handleChange}
					type="text"
					name="about"
					id="about"
				/>
			</FormGroup>
		</div>
		<Button type="submit">Save</Button>
	</form>
</div>
