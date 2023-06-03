<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { DeleteMajor, EditMajor, ListMajor } from 'svelte-polaris-icons';
	import { IconButton } from '../buttons';
	import { TableData, TableRow } from '../table';

	type ProductTableRowEvents = {
		productDelete: { id: string };
		productDetail: { id: string };
		productEdit: { id: string };
	};

	const dispatch = createEventDispatcher<ProductTableRowEvents>();

	export let name: string;
	export let description: string;
	export let id: string;
</script>

<TableRow>
	<TableData>
		<span class="flex flex-col">
			<p class="font-bold text-gray-800">{name}</p>
			<p class="text-gray-400">{description}</p>
		</span>
	</TableData>
	<TableData class="text-right">
		<span>
			<IconButton
				icon={EditMajor}
				width={20}
				variant="primary"
				on:click={() => dispatch('productEdit', { id })}
			/>
			<IconButton
				icon={ListMajor}
				width={20}
				variant="secondary"
				on:click={() => dispatch('productDetail', { id })}
			/>
			<IconButton
				icon={DeleteMajor}
				width={20}
				variant="danger"
				on:click={() => dispatch('productDelete', { id })}
			/>
		</span>
	</TableData>
</TableRow>
