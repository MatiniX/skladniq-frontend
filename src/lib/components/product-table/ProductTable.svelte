<script lang="ts">
	import Button from '../buttons/Button.svelte';
	import { Table, TableHeader, TableRow } from '../table';
	import ProductTableRow from './ProductTableRow.svelte';
	import { goto } from '$app/navigation';

	export let products: any[];
</script>

<Table>
	<thead>
		<TableRow>
			<TableHeader>All products</TableHeader>
			<TableHeader>
				<Button className="ml-auto" on:click={() => goto('/dashboard/product/create')}>Add</Button>
			</TableHeader>
		</TableRow>
	</thead>
	<tbody>
		{#each products as p (p.id)}
			<ProductTableRow
				description={p.description}
				name={p.name}
				id={p.id}
				on:productDelete
				on:productDetail
				on:productEdit
			/>
		{/each}
	</tbody>
</Table>
