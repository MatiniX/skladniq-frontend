<script lang="ts">
	import { areaMUs, lengthMUs, storageUnits, volumeMUs, weightMUs } from '$lib/constants';
	import { Listbox } from '@rgossiaux/svelte-headlessui';
	import { createEventDispatcher } from 'svelte';
	import Button from '../buttons/Button.svelte';
	import { InputField } from '../form';
	import { CustomListboxOption, CustomListboxOptions } from '../listbox';
	import CustomListboxButton from '../listbox/CustomListboxButton.svelte';
	import { TableData, TableRow } from '../table';
	import { CircleTickMajor, DeleteMajor, EditMajor, TickMinor } from 'svelte-polaris-icons';

	const dispatch = createEventDispatcher<{
		remove: { id: string };
	}>();

	const toggleEditMode = () => {
		editMode = !editMode;
	};

	const dispatchRemoveEvent = () => {
		dispatch('remove', { id });
	};

	export let id: string;
	export let editMode = true;
	export let name = '';
	export let unit = storageUnits[1];
	export let metricUnit = weightMUs[2];
	export let valuePerStorageUnit = 0;
	export let displayText = '';
</script>

<TableRow>
	<TableData>
		{#if editMode}
			<InputField placeholder="Attribute name" bind:value={name} />
		{:else}
			<p>{name}</p>
		{/if}
	</TableData>
	<TableData>
		{#if editMode}
			<Listbox
				bind:value={unit}
				on:change={(e) => {
					unit = e.detail;
				}}
			>
				<div class="relative mt-1">
					<CustomListboxButton>{unit.text}</CustomListboxButton>
					<CustomListboxOptions>
						{#each storageUnits as su}
							<CustomListboxOption value={su}>
								{su.text}
							</CustomListboxOption>
						{/each}
					</CustomListboxOptions>
				</div>
			</Listbox>
		{:else}
			<p>{unit.text}</p>
		{/if}
	</TableData>

	<TableData>
		{#if unit.value != 'quantity'}
			{#if editMode}
				<Listbox bind:value={metricUnit} on:change={(e) => (metricUnit = e.detail)}>
					<div class="relative mt-1">
						<CustomListboxButton>{metricUnit.text}</CustomListboxButton>
						<CustomListboxOptions>
							{#if unit.value === 'weight'}
								{#each weightMUs as wmu}
									<CustomListboxOption value={wmu}>
										{wmu.text}
									</CustomListboxOption>
								{/each}
							{:else if unit.value === 'length'}
								{#each lengthMUs as lmu}
									<CustomListboxOption value={lmu}>
										{lmu.text}
									</CustomListboxOption>
								{/each}
							{:else if unit.value === 'area'}
								{#each areaMUs as amu}
									<CustomListboxOption value={amu}>
										{amu.text}
									</CustomListboxOption>
								{/each}
							{:else if unit.value === 'volume'}
								{#each volumeMUs as vmu}
									<CustomListboxOption value={vmu}>
										{vmu.text}
									</CustomListboxOption>
								{/each}
							{/if}
						</CustomListboxOptions>
					</div>
				</Listbox>
			{:else}
				<p>{metricUnit.text}</p>
			{/if}
		{:else}
			<p>N/A</p>
		{/if}
	</TableData>

	<TableData class="w-1/12">
		{#if editMode}
			<InputField type="number" bind:value={valuePerStorageUnit} />
		{:else}
			<p>{valuePerStorageUnit}</p>
		{/if}
	</TableData>
	<TableData>
		{#if editMode}
			<InputField type="text" bind:value={displayText} placeholder="Display text" />
		{:else}
			<p>{displayText}</p>
		{/if}
	</TableData>
	<TableData>
		<span class="flex gap-2 justify-end fill-gray-400">
			<i
				on:click={toggleEditMode}
				on:keypress={toggleEditMode}
				class="p-1 rounded cursor-pointer hover:bg-blue-100 hover:fill-blue-500"
			>
				{#if editMode}
					<CircleTickMajor width={20} />
				{:else}
					<EditMajor width={20} />
				{/if}
			</i>
			<i
				on:click={dispatchRemoveEvent}
				on:keypress={dispatchRemoveEvent}
				class="p-1 rounded cursor-pointer hover:bg-red-100 hover:fill-red-500"
			>
				<DeleteMajor width={20} />
			</i>
		</span>
	</TableData>
</TableRow>
