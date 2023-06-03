<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '../buttons/Button.svelte';
</script>

<div class="p-4 max-w-2xl col-span-2 row-span-2 inline-block bg-white rounded-lg shadow">
	<div class="mb-4 flex items-center justify-between">
		<div>
			<p class="mb-1 text-gray-800">Create organization or join existing one</p>
			<p class="text-gray-500">No organization associated</p>
		</div>
		<Button
			on:click={() => {
				goto('/dashboard/create-organization');
			}}>Create</Button
		>
	</div>
	<p class="text-gray-800">
		If you want to join an existing organization check you invites down below and any organization
		you are invited into.
	</p>
</div>
