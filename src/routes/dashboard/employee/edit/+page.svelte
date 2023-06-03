<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import api from '$lib/axios/instance';
	import Button from '$lib/components/buttons/Button.svelte';
	import { FormGroup, FormLabel, InputField } from '$lib/components/form';
	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import { onMount } from 'svelte';
	import { Textarea, createForm } from 'svelte-forms-lib';

	const { form, handleChange, handleSubmit } = createForm({
		initialValues: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			about: ''
		},
		onSubmit: async (values) => {
			const res = await api.post('/organizations/set-roles', {
				userId: $page.url.searchParams.get('eid'),
				roles: userRoles
			});

			goto('/dashboard/employee');
		}
	});

	let userRoles: string[] = [];

	onMount(async () => {
		const res = await api.get('/user/user-details/' + $page.url.searchParams.get('eid'));
		if (res.status === 200) {
			const { userDetails } = res.data;
			$form.firstName = userDetails.firstName;
			$form.lastName = userDetails.lastName;
			$form.phoneNumber = userDetails.phoneNumber;
			$form.about = userDetails.about;

			userRoles = res.data.roles;
		}
	});

	const handleCheckbox = (e: Event) => {
		// @ts-ignore
		if (userRoles.includes(e.target.value)) {
			// @ts-ignore
			userRoles = userRoles.filter((r) => r !== e.target.value);
		} else {
			// @ts-ignore
			userRoles.push(e.target.value);
		}
	};
</script>

<div class="p-8">
	<form on:submit={handleSubmit}>
		<div class="grid grid-cols-2 gap-4">
			<FormGroup>
				<FormLabel for="firstName">First Name</FormLabel>
				<InputField
					bind:value={$form.firstName}
					type="text"
					name="firstName"
					id="firstName"
					readonly
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel>Last Name</FormLabel>
				<InputField
					bind:value={$form.lastName}
					type="text"
					name="lastName"
					id="lastName"
					readonly
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel for="phoneNumber">Phone number</FormLabel>
				<InputField
					bind:value={$form.phoneNumber}
					type="text"
					name="phoneNumber"
					id="phoneNumber"
					readonly
				/>
			</FormGroup>
			<FormGroup>
				<FormLabel for="about">About</FormLabel>
				<p>{$form.about}</p>
			</FormGroup>
			<FormGroup class="flex justify-between col-span-2">
				<FormLabel for="roles.employee"
					>Employee<br /><Checkbox
						checked={userRoles.includes('employee')}
						on:change={handleCheckbox}
						value="employee"
					/></FormLabel
				>
				<FormLabel for="roles.product_manager"
					>Product Manager<br /><Checkbox
						checked={userRoles.includes('product_manager')}
						on:change={handleCheckbox}
						value="product_manager"
					/></FormLabel
				>
				<FormLabel for="roles.warehouse_manager"
					>Warehouse Manager<br /><Checkbox
						checked={userRoles.includes('warehouse_manager')}
						on:change={handleCheckbox}
						value="warehouse_manager"
					/></FormLabel
				>
				<FormLabel for="roles.employee_manager"
					>Employee Manager<br /><Checkbox
						checked={userRoles.includes('employee_manager')}
						on:change={handleCheckbox}
						value="employee_manager"
					/></FormLabel
				>
				<FormLabel for="roles.organization_manager">
					Organization Manager<br /><Checkbox
						checked={userRoles.includes('organization_manager')}
						on:change={handleCheckbox}
						value="organization_manager"
					/>
				</FormLabel>
				<FormLabel for="roles.owner"
					>Owner<br /><Checkbox
						checked={userRoles.includes('owner')}
						readonly
						disabled
						value="owner"
					/></FormLabel
				>
			</FormGroup>
		</div>
		<Button type="sumbit" className="mt-2">Edit</Button>
	</form>
</div>
