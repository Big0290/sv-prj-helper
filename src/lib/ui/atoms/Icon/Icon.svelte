<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		name?: string;
		size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
		color?: string;
		spin?: boolean;
		[key: string]: any;
	}

	let {
		children,
		name,
		size = 'base',
		color,
		spin = false,
		...restProps
	}: Props = $props();
</script>

<span 
	class="icon icon--{size}"
	class:spin
	style:color={color}
	role="img"
	aria-label={name}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</span>

<style>
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		vertical-align: middle;
		flex-shrink: 0;
	}

	.icon--xs { width: 12px; height: 12px; font-size: 12px; }
	.icon--sm { width: 16px; height: 16px; font-size: 16px; }
	.icon--base { width: 20px; height: 20px; font-size: 20px; }
	.icon--lg { width: 24px; height: 24px; font-size: 24px; }
	.icon--xl { width: 32px; height: 32px; font-size: 32px; }
	.icon--2xl { width: 40px; height: 40px; font-size: 40px; }

	.icon :global(svg) {
		width: 100%;
		height: 100%;
	}

	.spin {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
