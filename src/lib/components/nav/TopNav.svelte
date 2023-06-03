<script>
	import logo from '$lib/assets/Logo.svg';
	import { handleSignout } from '$lib/auth';
	import Button from '$lib/components/buttons/Button.svelte';
	import { isAuthenticated, user } from '$lib/stores/userStore';
	import { userDetails } from '$lib/stores/user-details.store';
</script>

<header class="bg-slate-50 relative shadow">
	<nav class="px-16 py-4 flex items-center justify-between">
		<a href="/">
			<img src={logo} alt="Skladniq logo" />
		</a>
		{#if $isAuthenticated}
			<div class="flex gap-2">
				<p>{`${$userDetails?.firstName} ${$userDetails?.lastName}`}</p>
				<Button on:click={handleSignout}>Sign out</Button>
			</div>
		{:else}
			<div class="flex gap-2">
				<a href="/signup">
					<Button size="sm">Sign Up</Button>
				</a>
				<a href="/signin">
					<Button size="sm" variant="secondary">Sign In</Button>
				</a>
			</div>
		{/if}
	</nav>
</header>
