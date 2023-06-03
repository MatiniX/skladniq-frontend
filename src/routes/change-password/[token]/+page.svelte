<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/Logo.svg';
	import { Button } from '$lib/components/buttons';
	import { Link } from '$lib/components/elements';
	import { FormGroup, FormLabel, InputField, FieldError } from '$lib/components/form';
	import { createForm } from 'svelte-forms-lib';
	import Copyright from '$lib/components/elements/Copyright.svelte';
	import * as yup from 'yup';
	import { page } from '$app/stores';
	import api from '$lib/axios/instance';

	const { token } = $page.params;

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			newPassword: ''
		},
		validationSchema: yup.object().shape({
			newPassword: yup.string().min(4).required()
		}),
		onSubmit: async ({ newPassword }) => {
			const res = await api.post('/auth/change-password', { token, newPassword });

			if (res.status === 202) {
				goto('/login');
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
				<h1 class="mb-2 text-2xl font-bold">Change password</h1>
				<div class="flex flex-col gap-4">
					<FormGroup>
						<FormLabel for="newPassword">New password</FormLabel>
						<InputField
							bind:value={$form.newPassword}
							on:change={handleChange}
							type="password"
							name="newPassword"
							id="newPassword"
						/>
						{#if $errors.newPassword}
							<FieldError message={$errors.newPassword} />
						{/if}
					</FormGroup>

					<Button className="mt-4">Change</Button>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-auto mb-4">
		<Copyright />
	</div>
</main>
