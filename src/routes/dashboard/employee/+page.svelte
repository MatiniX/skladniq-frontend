<script lang="ts">
	import { goto } from '$app/navigation';
	import api from '$lib/axios/instance';
	import { Button } from '$lib/components/buttons';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { Modal } from '$lib/components/elements';
	import { FormLabel } from '$lib/components/form';
	import FormGroup from '$lib/components/form/FormGroup.svelte';
	import InputField from '$lib/components/form/InputField.svelte';
	import { Table, TableRow } from '$lib/components/table';
	import TableData from '$lib/components/table/TableData.svelte';
	import TableHeader from '$lib/components/table/TableHeader.svelte';
	import { userDetails } from '$lib/stores/user-details.store';
	import { user } from '$lib/stores/userStore';
	import { onMount } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { DeleteMajor } from 'svelte-polaris-icons';

	let addEmployeeModal = false;
	let removeEmployeeModal = false;
	let inviteSent = false;
	let employees: any[] = [];
	let selectedEmployee: any = null;

	const { form, handleChange, handleSubmit, handleReset } = createForm({
		initialValues: {
			email: ''
		},
		onSubmit: async ({ email }) => {
			const res = await api.get('/organizations/send-invitation/' + email);

			if (res.status === 200) {
				inviteSent = true;
				handleReset();
			}
		}
	});

	onMount(async () => {
		const res = await api.get('/user/organization/' + $user!.organizationId);

		if (res.status === 200) {
			employees = res.data.filter((e: any) => e.email !== $user!.email);
			console.log(employees);
		}
	});
</script>

<Button className="ml-4 my-4" on:click={() => (addEmployeeModal = true)}>Add employee</Button>

<Modal
	bind:isOpen={addEmployeeModal}
	title={inviteSent ? 'Invite was sent' : 'Add new employee'}
	content={inviteSent
		? 'An invite was sent to a user with a registered email that was submited '
		: 'Enter an e-mail address to which an invitation link will be sent '}
>
	{#if !inviteSent}
		<form on:submit={handleSubmit}>
			<FormGroup class="my-4">
				<FormLabel for="email">E-mail</FormLabel>
				<InputField
					type="email"
					name="email"
					id="email"
					placeholder="email@test.com"
					bind:value={$form.email}
					on:change={handleChange}
				/>
			</FormGroup>
			<Button type="submit" size="sm">Send</Button>
		</form>
	{:else}
		<Button
			on:click={() => {
				inviteSent = false;
				addEmployeeModal = false;
			}}>Close</Button
		>
	{/if}
</Modal>

<Modal
	bind:isOpen={removeEmployeeModal}
	title="Remove employee?"
	content="Are you sure you want to remove {selectedEmployee?.userDetails.firstName} 
	{selectedEmployee?.userDetails.lastName} from your organization?"
>
	<div class="flex gap-2 mt-4">
		<Button
			size="sm"
			on:click={async () => {
				const res = await api.delete('/organizations/remove-member', {
					data: {
						organizationId: $user?.organizationId,
						memberId: selectedEmployee.id
					}
				});

				if (res.status === 200) {
					removeEmployeeModal = false;
				}
			}}>Remove</Button
		>
		<Button
			variant="secondary"
			size="sm"
			on:click={() => {
				removeEmployeeModal = false;
			}}
		>
			Cancel
		</Button>
	</div>
</Modal>

<div class="p-4">
	<Table>
		<thead>
			<TableRow>
				<TableHeader>Name</TableHeader>
				<TableHeader>Role</TableHeader>
				<TableHeader />
			</TableRow>
		</thead>
		<tbody>
			{#each employees as employee}
				<TableRow>
					<TableData>{employee.userDetails.firstName} {employee.userDetails.lastName}</TableData>
					<TableData>
						{#each employee.roles as role}
							<p>{role}</p>
						{/each}
					</TableData>
					<TableData>
						{#if $user?.roles.some((role) => role === 'owner' || role === 'employee_manger')}
							<div class="flex gap-4">
								<Button
									size="sm"
									on:click={() => goto('/dashboard/employee/edit?eid=' + employee.id)}
								>
									Edit
								</Button>
								<IconButton
									variant="danger"
									icon={DeleteMajor}
									width={24}
									on:click={() => {
										selectedEmployee = employee;
										removeEmployeeModal = true;
									}}
								/>
							</div>
						{/if}
					</TableData>
				</TableRow>
			{/each}
		</tbody>
	</Table>
</div>
