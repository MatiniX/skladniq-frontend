<script lang="ts">
	import { page } from '$app/stores';
	import api from '$lib/axios/instance';
	import { SummaryList, SummaryListItem } from '$lib/components/summary-list';
	import { Table, TableData, TableHeader, TableRow } from '$lib/components/table';
	import { getMetricUnit, getMetricUnitPostfix } from '$lib/utils';
	import { onMount } from 'svelte';

	let warehouseProduct: any;
	let metricUnitPostfix: string;
	let productAttributes: any;
	onMount(async () => {
		const res = await api.get(
			`/warehouse/get/single?warehouseId=${$page.params.warehouseId}&productId=${$page.params.productId}`
		);
		if (res.status === 200) {
			warehouseProduct = res.data;

			metricUnitPostfix = getMetricUnitPostfix(
				warehouseProduct.product.storageUnit,
				warehouseProduct.product.metricUnit
			)!;

			if (warehouseProduct.product.attributes) {
				productAttributes = warehouseProduct.product.attributes.map((p: any) => {
					const mappedAttribute = {
						name: p.name,
						displayValue: p.displayValue,
						total: warehouseProduct.unitsInStock * p.valuePerStorageUnit,
						postfix: getMetricUnitPostfix(p.unit, p.metricUnit)
					};

					return mappedAttribute;
				});
			}
		}
	});
</script>

<SummaryList>
	{#if warehouseProduct}
		<SummaryListItem name="Product name" description={warehouseProduct.product.name} />
		<SummaryListItem
			name="Product description"
			description={warehouseProduct.product.description}
		/>
		{#if warehouseProduct.unlimitedCapacity}
			<SummaryListItem
				name="Current stock"
				description="{warehouseProduct.unitsInStock} {metricUnitPostfix}"
			/>
		{:else}
			<SummaryListItem
				name="Current stock"
				description={`${warehouseProduct.unitsInStock}/${warehouseProduct.maxCapacity} ${metricUnitPostfix}`}
			/>
		{/if}
	{/if}
</SummaryList>

{#if productAttributes}
	<Table>
		<thead>
			<TableRow>
				<TableHeader>Atrribute name</TableHeader>
				<TableHeader>Display text</TableHeader>
				<TableHeader>Total</TableHeader>
			</TableRow>
		</thead>
		<tbody>
			{#each productAttributes as attribute}
				<TableRow>
					<TableData>{attribute.name}</TableData>
					<TableData>{attribute.displayValue}</TableData>
					<TableData>{attribute.total} {attribute.postfix}</TableData>
				</TableRow>
			{/each}
		</tbody>
	</Table>
{/if}
