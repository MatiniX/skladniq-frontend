<script lang="ts">
	import ProfileCard from '../elements/ProfileCard.svelte';
	import SideNavGroup from './SideNavGroup.svelte';
	import SideNavItem from './SideNavItem.svelte';
	import {
		HomeMajor,
		ProductsMajor,
		CustomersMajor,
		ProfileMajor,
		AddMajor
	} from 'svelte-polaris-icons';
	import { user } from '$lib/stores/userStore';
</script>

<div
	class="h-full w-64 flex flex-col flex-shrink-0 bg-slate-100 shadow-inner border border-r border-slate-200 z-10"
>
	<ProfileCard />
	<div class="py-4 pr-2">
		<SideNavGroup groupName="Your organization">
			{#if $user?.organizationId === null}
				<SideNavItem
					name="Create organization"
					href="/dashboard/create-organization"
					icon={AddMajor}
				/>
			{:else}
				<SideNavItem name="Warehouses" href="/dashboard/warehouse" icon={HomeMajor} />
				<SideNavItem name="Products" href="/dashboard/product" icon={ProductsMajor} />
				<SideNavItem name="Employees" href="/dashboard/employee" icon={CustomersMajor} />
			{/if}
		</SideNavGroup>
		<SideNavGroup groupName="Your account">
			<SideNavItem name="Account settings" href="/dashboard/account" icon={ProfileMajor} />
		</SideNavGroup>
	</div>
</div>
