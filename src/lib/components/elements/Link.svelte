<script lang="ts">
	export let href: string;
	export let className = '';

	interface $$Props extends svelte.JSX.HTMLAttributes<HTMLAnchorElement> {
		href: string;
		className?: string;
	}
</script>

<a class="text-sky-600 hover:underline {className}" {href} {...$$restProps}><slot /></a>
