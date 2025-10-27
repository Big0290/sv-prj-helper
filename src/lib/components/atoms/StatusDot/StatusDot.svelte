<script lang="ts">
	import type { StatusDotProps } from './StatusDot.types.js';

	let { status = 'offline',
		size = 'md',
		showLabel = false,
		pulse = true
	 }: StatusDotProps = $props();

	const sizeMap = {
		sm: '8px',
		md: '10px',
		lg: '12px'
	};

	const labels = {
		online: 'Online',
		offline: 'Offline',
		away: 'Away',
		busy: 'Busy'
	};
</script>

<div class="status-dot-wrapper">
	<div 
		class="status-dot {status} {size}"
		class:pulse
		style="--dot-size: {sizeMap[size]};"
		role="status"
		aria-label={labels[status]}
	>
		<div class="dot"></div>
		{#if pulse && status === 'online'}
			<div class="pulse-ring"></div>
		{/if}
	</div>
	
	{#if showLabel}
		<span class="status-label">{labels[status]}</span>
	{/if}
</div>

<style>
	.status-dot-wrapper {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	.status-dot {
		position: relative;
		width: var(--dot-size);
		height: var(--dot-size);
		flex-shrink: 0;
	}

	.dot {
		width: 100%;
		height: 100%;
		border-radius: var(--radius-full);
		border: 1.5px solid var(--color-neutral-900);
	}

	.status-dot.online .dot {
		background: var(--color-success-500);
	}

	.status-dot.offline .dot {
		background: var(--color-neutral-600);
	}

	.status-dot.away .dot {
		background: var(--color-warning-500);
	}

	.status-dot.busy .dot {
		background: var(--color-danger-500);
	}

	.pulse-ring {
		position: absolute;
		inset: 0;
		border-radius: var(--radius-full);
		border: 1.5px solid var(--color-success-500);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		opacity: 0.75;
	}

	@keyframes pulse {
		0%, 100% {
			transform: scale(1);
			opacity: 0.75;
		}
		50% {
			transform: scale(1.6);
			opacity: 0;
		}
	}

	.status-dot:not(.pulse) .pulse-ring {
		display: none;
	}

	.status-label {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-400);
		user-select: none;
	}

	.status-dot.online + .status-label {
		color: var(--color-success-400);
	}

	.status-dot.busy + .status-label {
		color: var(--color-danger-400);
	}

	.status-dot.away + .status-label {
		color: var(--color-warning-400);
	}
</style>
