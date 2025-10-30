<script module lang="ts">
export interface Step {
		label: string;
		description?: string;
		icon?: string;
		status?: 'complete' | 'current' | 'upcoming' | 'error';
	}
</script>

<script lang="ts">
	

	interface Props {
		steps: Step[];
		currentStep?: number;
		variant?: 'default' | 'dots' | 'numbered' | 'arrows';
		orientation?: 'horizontal' | 'vertical';
		size?: 'sm' | 'md' | 'lg';
		clickable?: boolean;
		showConnector?: boolean;
		onStepClick?: (step: Step, index: number) => void;
	}

	let {
		steps,
		currentStep = $bindable(0),
		variant = 'default',
		orientation = 'horizontal',
		size = 'md',
		clickable = false,
		showConnector = true,
		onStepClick
	}: Props = $props();

	function getStepStatus(index: number): 'complete' | 'current' | 'upcoming' | 'error' {
		const step = steps[index];
		if (step.status) return step.status;
		if (index < currentStep) return 'complete';
		if (index === currentStep) return 'current';
		return 'upcoming';
	}

	function handleStepClick(step: Step, index: number) {
		if (!clickable || getStepStatus(index) === 'upcoming') return;
		currentStep = index;
		onStepClick?.(step, index);
	}
</script>

<div
	class="stepper"
	data-variant={variant}
	data-orientation={orientation}
	data-size={size}
	role="navigation"
	aria-label="Progress steps"
>
	{#each steps as step, i}
		<div class="step-container">
			<button
				type="button"
				class="step"
				class:clickable
				class:complete={getStepStatus(i) === 'complete'}
				class:current={getStepStatus(i) === 'current'}
				class:upcoming={getStepStatus(i) === 'upcoming'}
				class:error={getStepStatus(i) === 'error'}
				onclick={() => handleStepClick(step, i)}
				disabled={!clickable || getStepStatus(i) === 'upcoming'}
				aria-current={getStepStatus(i) === 'current' ? 'step' : undefined}
			>
				<div class="step-indicator">
					{#if variant === 'numbered' || variant === 'default'}
						{#if getStepStatus(i) === 'complete'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
								<path d="M20 6L9 17l-5-5" />
							</svg>
						{:else if getStepStatus(i) === 'error'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
								<path d="M18 6L6 18M6 6l12 12" />
							</svg>
						{:else if step.icon}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d={step.icon} />
							</svg>
						{:else}
							<span class="step-number">{i + 1}</span>
						{/if}
					{/if}
				</div>

				<div class="step-content">
					<div class="step-label">{step.label}</div>
					{#if step.description}
						<div class="step-description">{step.description}</div>
					{/if}
				</div>
			</button>

			{#if showConnector && i < steps.length - 1}
				<div
					class="connector"
					class:complete={getStepStatus(i) === 'complete'}
					aria-hidden="true"
				></div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.stepper {
		display: flex;
		width: 100%;
	}

	.stepper[data-orientation="horizontal"] {
		flex-direction: row;
		align-items: flex-start;
	}

	.stepper[data-orientation="vertical"] {
		flex-direction: column;
	}

	.step-container {
		display: flex;
		position: relative;
	}

	.stepper[data-orientation="horizontal"] .step-container {
		flex-direction: column;
		flex: 1;
		align-items: center;
	}

	.stepper[data-orientation="vertical"] .step-container {
		flex-direction: row;
		width: 100%;
	}

	.step {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		background: none;
		border: none;
		padding: 0;
		cursor: default;
		transition: all var(--transition-normal);
		text-align: left;
	}

	.stepper[data-orientation="horizontal"] .step {
		flex-direction: column;
		text-align: center;
	}

	.step.clickable:not(:disabled) {
		cursor: pointer;
	}

	.step.clickable:not(:disabled):hover .step-indicator {
		transform: scale(1.1);
	}

	.step-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: var(--glass-bg);
		border: 2px solid var(--color-neutral-300);
		color: var(--color-neutral-600);
		font-weight: var(--font-weight-semibold);
		transition: all var(--transition-normal);
		flex-shrink: 0;
	}

	.step.complete .step-indicator {
		background: var(--color-primary-600);
		border-color: var(--color-primary-600);
		color: white;
	}

	.step.current .step-indicator {
		background: white;
		border-color: var(--color-primary-600);
		color: var(--color-primary-600);
		border-width: 3px;
		box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
	}

	.step.error .step-indicator {
		background: var(--color-error-600);
		border-color: var(--color-error-600);
		color: white;
	}

	.step.upcoming .step-indicator {
		opacity: 0.5;
	}

	.step-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.step-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-800);
	}

	.step.upcoming .step-label {
		color: var(--color-neutral-500);
	}

	.step.current .step-label {
		color: var(--color-primary-600);
	}

	.step-description {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-600);
	}

	.step-number {
		font-size: var(--font-size-sm);
	}

	.connector {
		background: var(--color-neutral-300);
		transition: background var(--transition-normal);
	}

	.stepper[data-orientation="horizontal"] .connector {
		flex: 1;
		height: 2px;
		margin: 0 var(--spacing-2);
		margin-top: 1.25rem;
	}

	.stepper[data-orientation="vertical"] .connector {
		width: 2px;
		height: 100%;
		min-height: 2rem;
		margin-left: 1.25rem;
		margin-top: var(--spacing-2);
		margin-bottom: var(--spacing-2);
	}

	.connector.complete {
		background: var(--color-primary-600);
	}

	/* Dots variant */
	.stepper[data-variant="dots"] .step-indicator {
		width: 1rem;
		height: 1rem;
		border-width: 0;
	}

	.stepper[data-variant="dots"] .step.current .step-indicator {
		width: 1.5rem;
		height: 1.5rem;
	}

	/* Arrows variant */
	.stepper[data-variant="arrows"][data-orientation="horizontal"] .step-container {
		position: relative;
	}

	.stepper[data-variant="arrows"][data-orientation="horizontal"] .step {
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		padding: var(--spacing-3) var(--spacing-6);
		padding-right: var(--spacing-8);
		clip-path: polygon(0 0, calc(100% - 1rem) 0, 100% 50%, calc(100% - 1rem) 100%, 0 100%, 1rem 50%);
	}

	.stepper[data-variant="arrows"][data-orientation="horizontal"] .step-container:first-child .step {
		padding-left: var(--spacing-4);
		clip-path: polygon(0 0, calc(100% - 1rem) 0, 100% 50%, calc(100% - 1rem) 100%, 0 100%);
	}

	.stepper[data-variant="arrows"][data-orientation="horizontal"] .step.complete {
		background: var(--color-primary-600);
		color: white;
	}

	.stepper[data-variant="arrows"][data-orientation="horizontal"] .step.current {
		background: var(--color-primary-100);
		border-color: var(--color-primary-600);
	}

	/* Size variants */
	.stepper[data-size="sm"] .step-indicator {
		width: 2rem;
		height: 2rem;
	}

	.stepper[data-size="sm"] .step-label {
		font-size: var(--font-size-xs);
	}

	.stepper[data-size="lg"] .step-indicator {
		width: 3rem;
		height: 3rem;
	}

	.stepper[data-size="lg"] .step-label {
		font-size: var(--font-size-base);
	}

	@media (prefers-color-scheme: dark) {
		.step-label {
			color: var(--color-neutral-100);
		}

		.step.current .step-indicator {
			background: var(--color-neutral-900);
		}
	}
</style>
