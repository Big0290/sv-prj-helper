<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		as?: keyof HTMLElementTagNameMap;
		padding?: string | number;
		margin?: string | number;
		bg?: string;
		border?: string;
		borderRadius?: string;
		width?: string;
		height?: string;
		display?: 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
		position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
		overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
		[key: string]: any;
	}

	let {
		children,
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
	}: Props = $props();

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
