<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { BadgeProps } from './Badge.types.js';

	let { variant = 'default', size = 'md', children  }: BadgeProps = $props();
</script>

<span class="badge badge-{variant} badge-{size}">
	{@render children()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: var(--font-weight-semibold);
		border-radius: var(--radius-full);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid;
	}

	.badge-sm {
		padding: var(--spacing-1) var(--spacing-2);
		font-size: var(--font-size-xs);
	}

	.badge-md {
		padding: var(--spacing-1) var(--spacing-3);
		font-size: var(--font-size-sm);
	}

	.badge-lg {
		padding: var(--spacing-2) var(--spacing-4);
		font-size: var(--font-size-base);
	}

	.badge-default {
		background: var(--glass-bg);
		color: var(--color-primary-700);
		border-color: var(--color-primary-300);
	}

	.badge-success {
		background: rgba(16, 185, 129, 0.1);
		color: #065f46;
		border-color: rgba(16, 185, 129, 0.3);
	}

	@media (prefers-color-scheme: dark) {
		.badge-success {
			color: #6ee7b7;
		}
	}

	.badge-warning {
		background: rgba(245, 158, 11, 0.1);
		color: #92400e;
		border-color: rgba(245, 158, 11, 0.3);
	}

	@media (prefers-color-scheme: dark) {
		.badge-warning {
			color: #fcd34d;
		}
	}

	.badge-error {
		background: rgba(239, 68, 68, 0.1);
		color: #991b1b;
		border-color: rgba(239, 68, 68, 0.3);
	}

	@media (prefers-color-scheme: dark) {
		.badge-error {
			color: #fca5a5;
		}
	}

	.badge-info {
		background: rgba(59, 130, 246, 0.1);
		color: #1e40af;
		border-color: rgba(59, 130, 246, 0.3);
	}

	@media (prefers-color-scheme: dark) {
		.badge-info {
			color: #93c5fd;
		}
	}
</style>
