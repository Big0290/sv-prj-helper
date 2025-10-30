<script module lang="ts">
export interface BreadcrumbItem {
		label: string;
		href?: string;
		icon?: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	

	interface Props {
		items: BreadcrumbItem[];
		separator?: 'slash' | 'chevron' | 'dot' | 'arrow';
		size?: 'sm' | 'md' | 'lg';
		variant?: 'default' | 'pills' | 'underline';
		showHome?: boolean;
		maxItems?: number;
		onItemClick?: (item: BreadcrumbItem, index: number) => void;
	}

	let {
		items,
		separator = 'chevron',
		size = 'md',
		variant = 'default',
		showHome = true,
		maxItems = 0,
		onItemClick
	}: Props = $props();

	const separatorIcons = {
		slash: '/',
		chevron: 'M9 18l6-6-6-6',
		dot: '•',
		arrow: 'M5 12h14M12 5l7 7-7 7'
	};

	const displayItems = $derived(() => {
		const allItems = showHome ? [{ label: 'Home', href: '/', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }, ...items] : items;
		
		if (maxItems > 0 && allItems.length > maxItems) {
			return [
				...allItems.slice(0, 1),
				{ label: '...', disabled: true },
				...allItems.slice(-(maxItems - 2))
			];
		}
		return allItems;
	});

	function handleClick(item: BreadcrumbItem, index: number, e: MouseEvent) {
		if (item.disabled || index === displayItems().length - 1) {
			e.preventDefault();
			return;
		}
		onItemClick?.(item, index);
	}
</script>

<nav class="breadcrumb" data-size={size} data-variant={variant} aria-label="Breadcrumb">
	<ol class="breadcrumb-list">
		{#each displayItems() as item, i}
			<li class="breadcrumb-item" class:active={i === displayItems().length - 1}>
				{#if item.href && !item.disabled && i !== displayItems().length - 1}
					<a
						href={item.href}
						class="breadcrumb-link"
						class:disabled={item.disabled}
						onclick={(e) => handleClick(item, i, e)}
						aria-current={i === displayItems().length - 1 ? 'page' : undefined}
					>
						{#if item.icon}
							<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d={item.icon} />
							</svg>
						{/if}
						<span>{item.label}</span>
					</a>
				{:else}
					<span class="breadcrumb-text" class:disabled={item.disabled}>
						{#if item.icon}
							<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d={item.icon} />
							</svg>
						{/if}
						<span>{item.label}</span>
					</span>
				{/if}

				{#if i < displayItems().length - 1}
					<span class="separator" aria-hidden="true">
						{#if separator === 'slash' || separator === 'dot'}
							{separatorIcons[separator]}
						{:else}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d={separatorIcons[separator]} />
							</svg>
						{/if}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumb {
		display: flex;
		align-items: center;
	}

	.breadcrumb-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-2);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.breadcrumb-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	.breadcrumb-link,
	.breadcrumb-text {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		font-size: var(--font-size-sm);
		color: var(--color-neutral-600);
		text-decoration: none;
		transition: all var(--transition-normal);
	}

	.breadcrumb-link {
		cursor: pointer;
	}

	.breadcrumb-link:hover:not(.disabled) {
		color: var(--color-primary-600);
	}

	.breadcrumb-item.active .breadcrumb-text,
	.breadcrumb-item.active .breadcrumb-link {
		color: var(--color-neutral-800);
		font-weight: var(--font-weight-medium);
	}

	.breadcrumb-link.disabled,
	.breadcrumb-text.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.separator {
		display: flex;
		align-items: center;
		color: var(--color-neutral-400);
		font-size: var(--font-size-sm);
	}

	.icon {
		width: 1em;
		height: 1em;
	}

	/* Size variants */
	.breadcrumb[data-size="sm"] .breadcrumb-link,
	.breadcrumb[data-size="sm"] .breadcrumb-text {
		font-size: var(--font-size-xs);
	}

	.breadcrumb[data-size="lg"] .breadcrumb-link,
	.breadcrumb[data-size="lg"] .breadcrumb-text {
		font-size: var(--font-size-base);
	}

	/* Style variants */
	.breadcrumb[data-variant="pills"] .breadcrumb-link,
	.breadcrumb[data-variant="pills"] .breadcrumb-text {
		padding: var(--spacing-1) var(--spacing-3);
		border-radius: var(--radius-full);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
	}

	.breadcrumb[data-variant="pills"] .breadcrumb-item.active .breadcrumb-text,
	.breadcrumb[data-variant="pills"] .breadcrumb-item.active .breadcrumb-link {
		background: var(--color-primary-600);
		color: white;
		border-color: var(--color-primary-600);
	}

	.breadcrumb[data-variant="underline"] .breadcrumb-link:hover:not(.disabled) {
		text-decoration: underline;
	}

	.breadcrumb[data-variant="underline"] .breadcrumb-item.active .breadcrumb-text {
		border-bottom: 2px solid var(--color-primary-600);
		padding-bottom: var(--spacing-1);
	}

	@media (prefers-color-scheme: dark) {
		.breadcrumb-item.active .breadcrumb-text,
		.breadcrumb-item.active .breadcrumb-link {
			color: var(--color-neutral-100);
		}
	}
</style>
