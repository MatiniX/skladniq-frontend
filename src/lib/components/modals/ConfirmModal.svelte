<script lang="ts">
	import { page } from '$app/stores';
	import api from '$lib/axios/instance';
	import { Button } from '../buttons';
	import { Modal } from '../elements';
	import { FormGroup, FormLabel, InputField } from '../form';

	export let onConfirm: () => any;
	export let title: string;
	export let isOpen: boolean;
	export let confirmBtnVariant: 'primary' | 'secondary' | undefined;
</script>

<Modal bind:isOpen {title}>
	<div class="flex justify-end gap-4">
		<Button
			variant={confirmBtnVariant}
			size="sm"
			on:click={async () => {
				await onConfirm();
				isOpen = false;
			}}>Confirm</Button
		>
		<Button variant="secondary" size="sm" on:click={() => (isOpen = false)}>Cancel</Button>
	</div>
</Modal>
