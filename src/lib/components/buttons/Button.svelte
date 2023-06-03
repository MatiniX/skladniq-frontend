<script lang="ts">
	const variants = {
		primary: 'bg-blue-500 text-white',
		secondary: 'bg-white text-gray-800 border border-gray-400 shadow-inner'
	};

	const sizes = {
		sm: 'py-2 px-4 text-sm',
		md: 'py-2 px-6 text-md',
		lg: 'py-3 px-8 text-lg'
	};

	export let variant: keyof typeof variants = 'primary';
	export let size: keyof typeof sizes = 'md';
	export let className = '';

	interface $$Props extends Omit<svelte.JSX.HTMLAttributes<HTMLButtonElement>, 'size'> {
		variant?: keyof typeof variants;
		size?: keyof typeof sizes;
		className?: string;
	}
</script>

<button
	class="flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed rounded font-medium focus:outline-none hover:opacity-90
  {sizes[size]} 
  {variants[variant]}
	{className}"
	{...$$restProps}
	on:click
>
	<slot />
</button>
