<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import api from '$lib/axios/instance';
	import Button from '$lib/components/buttons/Button.svelte';
	import { SummaryListItem, SummaryList } from '$lib/components/summary-list';
	import { Table, TableData, TableHeader, TableRow } from '$lib/components/table';
	import { onMount } from 'svelte';

	let product: any;

	onMount(async () => {
		const res = await api.get('/product/' + $page.params.id);

		if (res.status === 200) {
			product = res.data;
		}
	});
</script>

<div class="p-4">
	{#if product}
		<div class="flex justify-between items-start">
			<SummaryList>
				<SummaryListItem name="Product name" description={product.name} />
				<SummaryListItem name="Product description" description={product.description} />
				<SummaryListItem name="Storage unit" description={product.storageUnit} />
				<SummaryListItem name="Metric unit" description={product.metricUnit} />
			</SummaryList>
			<Button
				variant="secondary"
				size="sm"
				on:click={() => goto('/dashboard/product/edit/' + $page.params.id)}>Edit</Button
			>
		</div>

		<h3>Product attributes</h3>
		<Table>
			<thead>
				<TableRow>
					<TableHeader>Name</TableHeader>
					<TableHeader>Unit</TableHeader>
					<TableHeader>Metric unit</TableHeader>
					<TableHeader>P.S.U.</TableHeader>
					<TableHeader>Display value</TableHeader>
				</TableRow>
			</thead>
			<tbody>
				{#each product.attributes as pa}
					<TableRow>
						<TableData>{pa.name}</TableData>
						<TableData>{pa.unit}</TableData>
						<TableData>{pa.metricUnit}</TableData>
						<TableData>{pa.valuePerStorageUnit}</TableData>
						<TableData>{pa.displayValue}</TableData>
					</TableRow>
				{/each}
			</tbody>
		</Table>
	{/if}
</div>
