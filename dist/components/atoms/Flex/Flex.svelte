<script lang="ts">
	import { type Snippet } from 'svelte';

	import type { FlexProps } from './Flex.types.js';

	let { children,
		as = 'div',
		direction = 'row',
		align = 'start',
		justify = 'start',
		wrap = 'nowrap',
		gap,
		inline = false,
		...restProps
	 }: FlexProps = $props();

	const flexAlign = $derived(() => {
		const map = { start: 'flex-start', end: 'flex-end', center: 'center', stretch: 'stretch', baseline: 'baseline' };
		return map[align];
	});

	const flexJustify = $derived(() => {
		const map = { start: 'flex-start', end: 'flex-end', center: 'center', 'space-between': 'space-between', 'space-around': 'space-around', 'space-evenly': 'space-evenly' };
		return map[justify];
	});

	const styleString = $derived(() => {
		const styles: string[] = [];
		styles.push(`display: ${inline ? 'inline-flex' : 'flex'}`);
		styles.push(`flex-direction: ${direction}`);
		styles.push(`align-items: ${flexAlign()}`);
		styles.push(`justify-content: ${flexJustify()}`);
		styles.push(`flex-wrap: ${wrap}`);
		if (gap) styles.push(`gap: ${typeof gap === 'number' ? `${gap}px` : gap}`);
		return styles.join('; ');
	});
</script>

<svelte:element this={as} style={styleString()} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
