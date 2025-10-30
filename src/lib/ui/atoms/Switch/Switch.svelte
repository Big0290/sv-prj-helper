<script lang="ts">
	interface Props {
		checked?: boolean;
		disabled?: boolean;
		label?: string;
		id?: string;
		name?: string;
		value?: string;
		onchange?: (e: Event) => void;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		label,
		id,
		name,
		value,
		onchange
	}: Props = $props();

	const switchId = $derived(id || `switch-${Math.random().toString(36).substr(2, 9)}`);
</script>

<div class="switch-wrapper">
	<button
		type="button"
		role="switch"
		id={switchId}
		class="switch"
		class:switch-checked={checked}
		aria-checked={checked}
		aria-label={label}
		{disabled}
		onclick={() => {
			if (!disabled) {
				checked = !checked;
			}
		}}
	>
		<span class="switch-track">
			<span class="switch-thumb"></span>
		</span>
	</button>
	<input
		type="checkbox"
		bind:checked
		{disabled}
		{name}
		{value}
		{onchange}
		class="sr-only"
		tabindex="-1"
		aria-hidden="true"
	/>
	{#if label}
		<label for={switchId} class="switch-label">
			{label}
		</label>
	{/if}
</div>

<style>
	.switch-wrapper {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-3);
	}

	.switch {
		position: relative;
		display: inline-block;
		padding: 0;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.switch:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.switch-track {
		display: block;
		width: 48px;
		height: 28px;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 2px solid var(--glass-border);
		border-radius: var(--radius-full);
		box-shadow: var(--glass-shadow);
		transition: all var(--transition-base);
		position: relative;
	}

	.switch-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 20px;
		height: 20px;
		background: white;
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: all var(--transition-base);
	}

	.switch-checked .switch-track {
		background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
		border-color: var(--color-primary-600);
	}

	.switch-checked .switch-thumb {
		transform: translateX(20px);
	}

	.switch:hover:not(:disabled) .switch-track {
		background: var(--glass-bg-hover);
		box-shadow: var(--glass-shadow-lg);
	}

	.switch-checked:hover:not(:disabled) .switch-track {
		background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-700) 100%);
	}

	.switch:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
		border-radius: var(--radius-full);
	}

	.switch-label {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-700);
		cursor: pointer;
		user-select: none;
	}

	@media (prefers-color-scheme: dark) {
		.switch-label {
			color: var(--color-neutral-300);
		}
	}

	.switch:disabled ~ .switch-label {
		cursor: not-allowed;
	}
</style>
