<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/Logo.svg';
	import { Button } from '$lib/components/buttons';
	import { Link } from '$lib/components/elements';
	import { FormGroup, FormLabel, InputField, FieldError } from '$lib/components/form';
	import { createForm } from 'svelte-forms-lib';
	import Copyright from '$lib/components/elements/Copyright.svelte';
	import * as yup from 'yup';
	import Textarea from '$lib/components/form/Textarea.svelte';
	import api from '$lib/axios/instance';
	import { setUser } from '$lib/auth';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			about: ''
		},
		validationSchema: yup.object().shape({
			firstName: yup.string().min(2).required(),
			lastName: yup.string().min(2).required(),
			phoneNumber: yup.string().optional(),
			about: yup.string().optional()
		}),
		onSubmit: async (values) => {
			const res = await api.post('/user/user-details', values);
			if ((res.status = 201)) {
				await setUser();
				goto('/');
			}
		}
	});
</script>

<main class="h-screen bg-slate-50 flex flex-col justify-center items-center">
	<div class="mb-8 mt-auto">
		<Link href="/">
			<img src={logo} alt="" />
		</Link>
	</div>
	<div class="w-screen">
		<div class="w-1/5 mx-auto">
			<form on:submit={handleSubmit}>
				<h1 class="mb-2 text-2xl font-bold">Just one more step</h1>
				<div class="flex flex-col gap-4">
					<FormGroup>
						<FormLabel for="firstName">First Name</FormLabel>
						<InputField
							bind:value={$form.firstName}
							on:change={handleChange}
							type="text"
							name="firstName"
							id="firstName"
						/>
						{#if $errors.firstName}
							<FieldError message={$errors.firstName} />
						{/if}
					</FormGroup>

					<FormGroup>
						<FormLabel for="lastName">Last Name</FormLabel>
						<InputField
							bind:value={$form.lastName}
							on:change={handleChange}
							type="text"
							name="lastName"
							id="lastName"
						/>
						{#if $errors.lastName}
							<FieldError message={$errors.lastName} />
						{/if}
					</FormGroup>

					<FormGroup>
						<FormLabel for="phoneNumber">Phone Number</FormLabel>
						<InputField
							bind:value={$form.phoneNumber}
							on:change={handleChange}
							type="text"
							name="phoneNumber"
							id="phoneNumber"
						/>
						{#if $errors.phoneNumber}
							<FieldError message={$errors.phoneNumber} />
						{/if}
					</FormGroup>

					<FormGroup>
						<FormLabel for="about">Something about you</FormLabel>
						<Textarea bind:value={$form.about} on:change={handleChange} name="about" id="about" />
						{#if $errors.about}
							<FieldError message={$errors.about} />
						{/if}
					</FormGroup>

					<Button className="mt-4">Create Account</Button>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-auto mb-4">
		<Copyright />
	</div>
</main>
