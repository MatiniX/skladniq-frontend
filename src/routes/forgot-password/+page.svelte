<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/Logo.svg';
	import { Button } from '$lib/components/buttons';
	import { Link } from '$lib/components/elements';
	import { FormGroup, FormLabel, InputField, FieldError } from '$lib/components/form';
	import { createForm } from 'svelte-forms-lib';
	import { handleSignin } from '$lib/auth';
	import Copyright from '$lib/components/elements/Copyright.svelte';
	import * as yup from 'yup';
	import api from '$lib/axios/instance';

	let emailSent = false;

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required()
		}),
		onSubmit: async ({ email }) => {
			await api.get('/auth/forgot-password/' + email);
			emailSent = true;
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
			{#if emailSent}
				<p class="text-center text-gray-800">Check your e-mail for change password link.</p>
			{:else}
				<form on:submit={handleSubmit}>
					<h1 class="mb-2 text-2xl font-bold">Forgot password</h1>
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

						<p class="text-sm text-center text-gray-800">
							Enter a valid e-mail address where a link to change your password will be sent.
						</p>

						<Button className="mt-4">Send</Button>
					</div>
				</form>
			{/if}
		</div>
	</div>
	<div class="mt-auto mb-4">
		<Copyright />
	</div>
</main>
