<script lang="ts">
	export let name: string;
	export let description: string;
</script>

<div class="flex flex-col gap-1 pr-2 text-gray-800">
	<h3>{name}</h3>
	<p class="font-bold mb-2">{description}</p>
</div>
