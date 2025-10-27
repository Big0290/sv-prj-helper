<script lang="ts">
	import { Button, Flex } from '$lib/ui';

	interface Props {
		viewportSize?: 'mobile' | 'tablet' | 'desktop';
		showLabels?: boolean;
		size?: 'sm' | 'md' | 'lg';
	}

	let { 
		viewportSize = $bindable('desktop'),
		showLabels = false,
		size = 'sm'
	}: Props = $props();

	const viewports = [
		{
			id: 'mobile' as const,
			label: 'Mobile',
			icon: '📱',
			width: '375px',
			description: 'Mobile (375px)'
		},
		{
			id: 'tablet' as const,
			label: 'Tablet', 
			icon: '📱',
			width: '768px',
			description: 'Tablet (768px)'
		},
		{
			id: 'desktop' as const,
			label: 'Desktop',
			icon: '💻',
			width: '100%',
			description: 'Desktop (100%)'
		}
	];

	function setViewport(viewport: 'mobile' | 'tablet' | 'desktop') {
		viewportSize = viewport;
	}
</script>

<div class="responsive-controls">
	<Flex gap="2" align="center">
		{#if showLabels}
			<span class="controls-label">Viewport:</span>
		{/if}
		
		<div class="viewport-buttons">
			{#each viewports as viewport}
				<button
					class="viewport-btn btn btn-{viewportSize === viewport.id ? 'primary' : 'ghost'} btn-{size}"
					onclick={() => setViewport(viewport.id)}
					aria-label={`Switch to ${viewport.description}`}
					title={viewport.description}
				>
					<span class="viewport-icon">{viewport.icon}</span>
					{#if showLabels}
						<span class="viewport-label">{viewport.label}</span>
					{/if}
				</button>
			{/each}
		</div>
		
		<div class="viewport-info">
			<span class="current-viewport">
				{viewports.find(v => v.id === viewportSize)?.description}
			</span>
		</div>
	</Flex>
</div>

<style>
	.responsive-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.controls-label {
		font-size: 0.875rem;
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		white-space: nowrap;
	}

	.viewport-buttons {
		display: flex;
		gap: 0.25rem;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: 0.25rem;
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
	}

	.viewport-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: all var(--transition-base);
		border-radius: var(--radius-md);
		min-width: auto;
	}

	.viewport-btn:hover {
		transform: translateY(-1px);
	}

	.viewport-icon {
		font-size: 1.1em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.viewport-label {
		font-size: 0.875rem;
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
	}

	.viewport-info {
		display: flex;
		align-items: center;
	}

	.current-viewport {
		font-size: 0.75rem;
		color: var(--text-secondary);
		background: var(--glass-bg);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--glass-border);
		white-space: nowrap;
	}

	/* Responsive behavior */
	@media (max-width: 768px) {
		.responsive-controls {
			flex-wrap: wrap;
		}

		.viewport-info {
			display: none; /* Hide info on small screens */
		}

		.viewport-label {
			display: none; /* Hide labels on mobile */
		}
	}

	@media (max-width: 480px) {
		.controls-label {
			display: none;
		}

		.viewport-buttons {
			flex: 1;
			justify-content: center;
		}
	}

	/* Dark theme support */
	:global([data-theme="dark"]) .viewport-buttons {
		background: var(--glass-bg-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .current-viewport {
		background: var(--glass-bg-dark);
		border-color: var(--glass-border-dark);
		color: var(--text-secondary-dark);
	}

	:global([data-theme="dark"]) .controls-label {
		color: var(--text-secondary-dark);
	}
</style>