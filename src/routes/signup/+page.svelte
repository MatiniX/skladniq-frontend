<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/Logo.svg';
	import { Button } from '$lib/components/buttons';
	import { Link } from '$lib/components/elements';
	import { FormGroup, FormLabel, InputField, FieldError } from '$lib/components/form';
	import { createForm } from 'svelte-forms-lib';
	import { handleSignup } from '$lib/auth';
	import * as yup from 'yup';
	import Copyright from '$lib/components/elements/Copyright.svelte';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().min(4).required()
		}),
		onSubmit: async ({ email, password }) => {
			await handleSignup(email, password);
			goto('/user-details');
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
				<h1 class="mb-2 text-2xl font-bold">Sign Up</h1>
				<div class="flex flex-col gap-4">
					<FormGroup>
						<FormLabel for="email">Email</FormLabel>
						<InputField
							bind:value={$form.email}
							on:change={handleChange}
							type="text"
							name="email"
							id="email"
						/>
						{#if $errors.email}
							<FieldError message={$errors.email} />
						{/if}
					</FormGroup>

					<FormGroup>
						<FormLabel for="password">Password</FormLabel>
						<InputField
							bind:value={$form.password}
							on:change={handleChange}
							type="password"
							name="password"
							id="password"
						/>
						{#if $errors.password}
							<FieldError message={$errors.password} />
						{/if}
					</FormGroup>

					<Button className="mt-4">Sign Up</Button>
					<p class="text-sm text-center text-gray-800">
						Already have an account? <Link href="/signin">Sign In</Link>
					</p>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-auto mb-4">
		<Copyright />
	</div>
</main>
