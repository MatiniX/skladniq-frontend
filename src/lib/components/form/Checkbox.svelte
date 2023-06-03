<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {}
</script>

<input class="rounded" on:change type="checkbox" {...$$props} />
