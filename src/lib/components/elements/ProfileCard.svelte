<script lang="ts">
	import Avatar from '../icons/Avatar.svelte';
	import { userDetails } from '$lib/stores/user-details.store';
	import { onMount } from 'svelte';
	let username: string;

	onMount(() => {
		username = $userDetails?.firstName + ' ' + $userDetails?.lastName;
	});
</script>

<div class="w-full h-20 bg-white flex items-center pl-4 border-b border-slate-200 shadow">
	<Avatar class="w-10" />
	<div class="ml-2">
		<h4 class="text-gray-800">{username}</h4>
		<p class="text-sm text-gray-500">{$userDetails?.organizationName || 'No organization'}</p>
	</div>
</div>
