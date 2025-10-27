<script lang="ts">
	import { type Snippet } from 'svelte';

	import type { BoxProps } from './Box.types.js';

	let { children,
		as = 'div',
		padding,
		margin,
		bg,
		border,
		borderRadius,
		width,
		height,
		display,
		position,
		overflow,
		...restProps
	 }: BoxProps = $props();

	const styleString = $derived(() => {
		const styles: string[] = [];
		if (padding) styles.push(`padding: ${typeof padding === 'number' ? `${padding}px` : padding}`);
		if (margin) styles.push(`margin: ${typeof margin === 'number' ? `${margin}px` : margin}`);
		if (bg) styles.push(`background: ${bg}`);
		if (border) styles.push(`border: ${border}`);
		if (borderRadius) styles.push(`border-radius: ${borderRadius}`);
		if (width) styles.push(`width: ${width}`);
		if (height) styles.push(`height: ${height}`);
		if (display) styles.push(`display: ${display}`);
		if (position) styles.push(`position: ${position}`);
		if (overflow) styles.push(`overflow: ${overflow}`);
		return styles.join('; ');
	});
</script>

<svelte:element this={as} style={styleString()} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
