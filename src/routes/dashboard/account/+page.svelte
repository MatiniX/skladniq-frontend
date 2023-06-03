<script lang="ts">
	import { goto } from '$app/navigation';
	import api from '$lib/axios/instance';
	import { Button } from '$lib/components/buttons';
	import { SummaryList, SummaryListItem } from '$lib/components/summary-list';
	import { onMount } from 'svelte';

	let firstName: string;
	let lastName: string;
	let phoneNumber: string;
	let about: string;

	onMount(async () => {
		const res = await api.get('/user/user-details');
		if (res.status === 200) {
			const { data } = res;

			firstName = data.firstName;
			lastName = data.lastName;
			phoneNumber = data.phoneNumber;
			about = data.about;
		}
	});
</script>

<Button size="sm" on:click={() => goto('/dashboard/account/edit')}>Edit</Button>
<div class="p-4">
	<SummaryList>
		<SummaryListItem name="First name" description={firstName} />
		<SummaryListItem name="Last name" description={lastName} />
		<SummaryListItem name="Phone number" description={phoneNumber} />
		<SummaryListItem name="About" description={about} />
	</SummaryList>
</div>
