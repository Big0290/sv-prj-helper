<script lang="ts">
	import { Button, Flex, Text } from '$lib/ui';

	interface Props {
		viewportSize?: 'mobile' | 'tablet' | 'desktop' | 'custom';
		showLabels?: boolean;
		showDimensions?: boolean;
		size?: 'sm' | 'md' | 'lg';
		customWidth?: number;
		customHeight?: number;
		onViewportChange?: (viewport: string, dimensions?: { width: number; height: number }) => void;
	}

	let { 
		viewportSize = $bindable('desktop'),
		showLabels = false,
		showDimensions = true,
		size = 'sm',
		customWidth = $bindable(1200),
		customHeight = $bindable(800),
		onViewportChange
	}: Props = $props();

	const viewports = [
		{
			id: 'mobile' as const,
			label: 'Mobile',
			icon: '📱',
			width: 375,
			height: 667,
			description: 'iPhone SE',
			category: 'mobile'
		},
		{
			id: 'tablet' as const,
			label: 'Tablet', 
			icon: '📱',
			width: 768,
			height: 1024,
			description: 'iPad',
			category: 'tablet'
		},
		{
			id: 'desktop' as const,
			label: 'Desktop',
			icon: '💻',
			width: 1200,
			height: 800,
			description: 'Desktop',
			category: 'desktop'
		}
	];

	// Additional device presets
	const devicePresets = [
		{ name: 'iPhone SE', width: 375, height: 667, category: 'mobile' },
		{ name: 'iPhone 12', width: 390, height: 844, category: 'mobile' },
		{ name: 'iPhone 12 Pro Max', width: 428, height: 926, category: 'mobile' },
		{ name: 'iPad', width: 768, height: 1024, category: 'tablet' },
		{ name: 'iPad Pro', width: 1024, height: 1366, category: 'tablet' },
		{ name: 'MacBook Air', width: 1280, height: 800, category: 'desktop' },
		{ name: 'MacBook Pro', width: 1440, height: 900, category: 'desktop' },
		{ name: '4K Display', width: 1920, height: 1080, category: 'desktop' }
	];

	let showPresets = $state(false);
	let isTransitioning = $state(false);

	// Get current viewport dimensions
	const currentDimensions = $derived(() => {
		if (viewportSize === 'custom') {
			return { width: customWidth, height: customHeight };
		}
		
		const viewport = viewports.find(v => v.id === viewportSize);
		return viewport ? { width: viewport.width, height: viewport.height } : { width: 1200, height: 800 };
	});

	function setViewport(viewport: 'mobile' | 'tablet' | 'desktop' | 'custom', dimensions?: { width: number; height: number }) {
		isTransitioning = true;
		
		setTimeout(() => {
			viewportSize = viewport;
			
			if (dimensions) {
				customWidth = dimensions.width;
				customHeight = dimensions.height;
			}
			
			onViewportChange?.(viewport, currentDimensions());
			isTransitioning = false;
		}, 150);
	}

	function setPreset(preset: typeof devicePresets[0]) {
		const category = preset.category as 'mobile' | 'tablet' | 'desktop';
		setViewport(category, { width: preset.width, height: preset.height });
		showPresets = false;
	}

	function togglePresets() {
		showPresets = !showPresets;
	}
</script>

<div class="responsive-controls" class:transitioning={isTransitioning}>
	<Flex gap="2" align="center" wrap="wrap">
		{#if showLabels}
			<Text size="sm" weight="medium" class="controls-label">Viewport:</Text>
		{/if}
		
		<div class="viewport-buttons">
			{#each viewports as viewport}
				<button
					class="viewport-btn"
					class:active={viewportSize === viewport.id}
					onclick={() => setViewport(viewport.id)}
					aria-label={`Switch to ${viewport.description} (${viewport.width}×${viewport.height})`}
					title={`${viewport.description} - ${viewport.width}×${viewport.height}px`}
				>
					<span class="viewport-icon">{viewport.icon}</span>
					{#if showLabels}
						<span class="viewport-label">{viewport.label}</span>
					{/if}
				</button>
			{/each}
			
			<button
				class="viewport-btn preset-btn"
				class:active={showPresets}
				onclick={togglePresets}
				aria-label="Show device presets"
				title="Device Presets"
			>
				<span class="viewport-icon">⚙️</span>
				{#if showLabels}
					<span class="viewport-label">Presets</span>
				{/if}
			</button>
		</div>
		
		{#if showDimensions}
			<div class="viewport-info">
				<div class="current-viewport">
					<Text size="xs" color="var(--text-secondary)">
						{currentDimensions().width}×{currentDimensions().height}px
					</Text>
				</div>
				
				{#if viewportSize === 'custom'}
					<div class="custom-inputs">
						<input
							type="number"
							bind:value={customWidth}
							placeholder="Width"
							class="dimension-input"
							min="200"
							max="3000"
						/>
						<span class="dimension-separator">×</span>
						<input
							type="number"
							bind:value={customHeight}
							placeholder="Height"
							class="dimension-input"
							min="200"
							max="2000"
						/>
					</div>
				{/if}
			</div>
		{/if}
	</Flex>

	{#if showPresets}
		<div class="presets-dropdown">
			<div class="presets-header">
				<Text size="sm" weight="medium">Device Presets</Text>
				<button class="close-presets" onclick={() => showPresets = false}>×</button>
			</div>
			
			<div class="presets-grid">
				{#each devicePresets as preset}
					<button
						class="preset-item"
						onclick={() => setPreset(preset)}
						title={`${preset.width}×${preset.height}px`}
					>
						<div class="preset-name">
							<Text size="sm" weight="medium">{preset.name}</Text>
						</div>
						<div class="preset-dimensions">
							<Text size="xs" color="var(--text-secondary)">
								{preset.width}×{preset.height}px
							</Text>
						</div>
					</button>
				{/each}
			</div>
			
			<div class="custom-preset">
				<button
					class="preset-item custom-item"
					onclick={() => setViewport('custom')}
				>
					<div class="preset-name">
						<Text size="sm" weight="medium">Custom Size</Text>
					</div>
					<div class="preset-dimensions">
						<Text size="xs" color="var(--text-secondary)">
							Set custom dimensions
						</Text>
					</div>
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.responsive-controls {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition: all var(--transition-base);
	}

	.responsive-controls.transitioning {
		opacity: 0.8;
	}

	:global(.controls-label) {
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
		padding: 0.5rem 0.75rem;
		border: none;
		background: transparent;
		color: var(--text-secondary);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-base);
		font-size: 0.875rem;
		min-width: auto;
	}

	.viewport-btn:hover {
		background: var(--glass-bg-hover);
		color: var(--text-primary);
		transform: translateY(-1px);
	}

	.viewport-btn.active {
		background: var(--color-primary-500);
		color: white;
		box-shadow: var(--shadow-sm);
	}

	.viewport-btn.preset-btn {
		border-left: 1px solid var(--glass-border);
		margin-left: 0.25rem;
		padding-left: 0.75rem;
	}

	.viewport-icon {
		font-size: 1.1em;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform var(--transition-base);
	}

	.viewport-btn:hover .viewport-icon {
		transform: scale(1.1);
	}

	.viewport-label {
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
	}

	.viewport-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.current-viewport {
		background: var(--glass-bg);
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--glass-border);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
	}

	.custom-inputs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.dimension-input {
		width: 80px;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-sm);
		background: var(--glass-bg);
		color: var(--text-primary);
		font-size: 0.75rem;
		text-align: center;
	}

	.dimension-input:focus {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
		border-color: var(--color-primary-500);
	}

	.dimension-separator {
		color: var(--text-secondary);
		font-weight: bold;
	}

	.presets-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 50;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: 1rem;
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		box-shadow: var(--shadow-lg);
		margin-top: 0.5rem;
		animation: slideDown 0.2s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.presets-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--glass-border);
	}

	.close-presets {
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		font-size: 1.25rem;
		padding: 0.25rem;
		border-radius: var(--radius-sm);
		transition: all var(--transition-base);
	}

	.close-presets:hover {
		background: var(--glass-bg-hover);
		color: var(--text-primary);
	}

	.presets-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.preset-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
		padding: 0.75rem;
		background: var(--glass-bg-hover);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-base);
		text-align: left;
	}

	.preset-item:hover {
		background: var(--color-primary-50);
		border-color: var(--color-primary-300);
		transform: translateY(-1px);
	}

	.custom-preset {
		border-top: 1px solid var(--glass-border);
		padding-top: 0.75rem;
	}

	.custom-item {
		background: var(--color-primary-50);
		border-color: var(--color-primary-200);
	}

	.custom-item:hover {
		background: var(--color-primary-100);
		border-color: var(--color-primary-400);
	}

	.preset-name {
		margin-bottom: 0.25rem;
	}

	/* Responsive behavior */
	@media (max-width: 768px) {
		.viewport-info {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.viewport-label {
			display: none;
		}

		.presets-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		:global(.controls-label) {
			display: none;
		}

		.viewport-buttons {
			width: 100%;
			justify-content: center;
		}

		.viewport-info {
			display: none;
		}
	}

	/* Dark theme support */
	:global([data-theme="dark"]) .viewport-buttons {
		background: var(--glass-bg-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .viewport-btn {
		color: var(--text-secondary-dark);
	}

	:global([data-theme="dark"]) .viewport-btn:hover {
		background: var(--glass-bg-hover-dark);
		color: var(--text-primary-dark);
	}

	:global([data-theme="dark"]) .current-viewport {
		background: var(--glass-bg-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .dimension-input {
		background: var(--glass-bg-dark);
		color: var(--text-primary-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .presets-dropdown {
		background: var(--glass-bg-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .preset-item {
		background: var(--glass-bg-hover-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .preset-item:hover {
		background: var(--color-primary-900);
		border-color: var(--color-primary-700);
	}
</style>