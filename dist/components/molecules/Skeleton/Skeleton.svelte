<script lang="ts">
	import type { SkeletonProps } from './Skeleton.types.js';

	let { variant = 'text',
		width = '100%',
		height = variant === 'text' ? '1em' : '100px',
		count = 1,
		className = ''
	 }: SkeletonProps = $props();
</script>

<div class="skeleton-wrapper {className}">
	{#each Array(count) as _, i}
		<div 
			class="skeleton {variant}" 
			style="width: {width}; height: {height};"
			aria-busy="true"
			aria-label="Loading..."
		></div>
	{/each}
</div>

<style>
	.skeleton-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.skeleton {
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(255, 255, 255, 0.1) 50%,
			rgba(255, 255, 255, 0.05) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s ease-in-out infinite;
		border-radius: var(--radius-md);
	}

	.skeleton.text {
		border-radius: var(--radius-sm);
	}

	.skeleton.circular {
		border-radius: var(--radius-full);
		aspect-ratio: 1;
	}

	.skeleton.rectangular {
		border-radius: var(--radius-lg);
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
</style>
