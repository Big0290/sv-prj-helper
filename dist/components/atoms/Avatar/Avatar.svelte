<script lang="ts">
	import type { AvatarProps } from './Avatar.types.js';

	let { src,
		alt = 'Avatar',
		initials,
		size = 'md',
		status
	 }: AvatarProps = $props();
</script>

<div class="avatar avatar-{size}">
	{#if src}
		<img {src} {alt} class="avatar-image" />
	{:else if initials}
		<div class="avatar-initials">{initials}</div>
	{:else}
		<svg class="avatar-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	{/if}
	{#if status}
		<span class="avatar-status avatar-status-{status}" aria-label={status}></span>
	{/if}
</div>

<style>
	.avatar {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--glass-bg-hover);
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;
	}

	.avatar-sm { width: 32px; height: 32px; }
	.avatar-md { width: 44px; height: 44px; }
	.avatar-lg { width: 56px; height: 56px; }
	.avatar-xl { width: 72px; height: 72px; }

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-initials {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-primary-600);
		text-transform: uppercase;
	}

	.avatar-placeholder {
		width: 60%;
		height: 60%;
		color: var(--color-neutral-500);
	}

	.avatar-status {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 25%;
		height: 25%;
		border-radius: 50%;
		border: 2px solid var(--color-neutral-50);
	}

	.avatar-status-online { background: var(--color-success); }
	.avatar-status-offline { background: var(--color-neutral-500); }
	.avatar-status-away { background: var(--color-warning); }
	.avatar-status-busy { background: var(--color-error); }
</style>
