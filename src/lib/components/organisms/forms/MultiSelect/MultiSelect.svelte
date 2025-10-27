<script module lang="ts">
export interface SelectOption {
		value: string;
		label: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	

	import type { MultiSelectProps } from './MultiSelect.types.js';

	let { options,
		selected = $bindable([]),
		placeholder = 'Select items...',
		label,
		searchable = true,
		max = 0,
		onSelect
	 }: MultiSelectProps = $props();

	const selectId = `multi-select-${Math.random().toString(36).substr(2, 9)}`;

	let isOpen = $state(false);
	let searchQuery = $state('');

	const filtered = $derived(() => {
		if (!searchQuery) return options;
		return options.filter(opt => 
			opt.label.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	function toggle(value: string) {
		if (selected.includes(value)) {
			selected = selected.filter(v => v !== value);
		} else if (!max || selected.length < max) {
			selected = [...selected, value];
		}
		onSelect?.(selected);
	}

	function remove(value: string) {
		selected = selected.filter(v => v !== value);
		onSelect?.(selected);
	}

	$effect(() => {
		if (!isOpen) return;
		const handler = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest('.multi-select')) isOpen = false;
		};
		document.addEventListener('click', handler);
		return () => document.removeEventListener('click', handler);
	});
</script>

<div class="multi-select">
	{#if label}<label class="label" for={selectId}>{label}</label>{/if}
	
	<button 
		type="button"
		id={selectId}
		class="select-trigger" 
		onclick={() => (isOpen = !isOpen)}
		onkeydown={(e) => e.key === 'Enter' && (isOpen = !isOpen)}
		aria-expanded={isOpen}
		aria-haspopup="listbox"
		aria-label={label || 'Multi-select dropdown'}
	>
		<div class="selected-items">
			{#if selected.length === 0}
				<span class="placeholder">{placeholder}</span>
			{:else}
				{#each selected as value}
					{@const opt = options.find(o => o.value === value)}
					{#if opt}
						<span class="chip">
							{opt.label}
							<span 
								class="chip-remove"
								onclick={(e) => { e.stopPropagation(); remove(value); }} 
								onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); remove(value); }}}
								role="button"
								tabindex="0"
								aria-label="Remove {opt.label}"
							>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M18 6L6 18M6 6l12 12" />
								</svg>
							</span>
						</span>
					{/if}
				{/each}
			{/if}
		</div>
		<svg class="chevron" class:open={isOpen} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M6 9l6 6 6-6" />
		</svg>
	</button>

	{#if isOpen}
		<div class="dropdown">
			{#if searchable}
				<input
					type="text"
					class="search-input"
					bind:value={searchQuery}
					placeholder="Search..."
					onclick={(e) => e.stopPropagation()}
				/>
			{/if}
			<div class="options">
				{#each filtered() as option}
					<button
						type="button"
						class="option"
						class:selected={selected.includes(option.value)}
						class:disabled={option.disabled || (max > 0 && selected.length >= max && !selected.includes(option.value))}
						disabled={option.disabled}
						onclick={() => toggle(option.value)}
					>
						<span class="checkbox">
							{#if selected.includes(option.value)}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 6L9 17l-5-5" />
								</svg>
							{/if}
						</span>
						{option.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.multi-select { position: relative; width: 100%; }
	.label { display: block; margin-bottom: var(--spacing-2); font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-neutral-700); }
	.select-trigger { display: flex; align-items: center; gap: var(--spacing-2); min-height: 42px; padding: var(--spacing-2) var(--spacing-3); background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-md); cursor: pointer; transition: all var(--transition-fast); }
	.select-trigger:hover { border-color: var(--color-primary-300); }
	.selected-items { flex: 1; display: flex; flex-wrap: wrap; gap: var(--spacing-2); }
	.placeholder { color: var(--color-neutral-400); font-size: var(--font-size-sm); }
	.chip { display: flex; align-items: center; gap: var(--spacing-1); padding: var(--spacing-1) var(--spacing-2); background: var(--color-primary-100); color: var(--color-primary-700); border-radius: var(--radius-sm); font-size: var(--font-size-xs); }
	.chip-remove { display: flex; background: none; border: none; padding: 0; cursor: pointer; color: currentColor; }
	.chevron { flex-shrink: 0; transition: transform var(--transition-fast); }
	.chevron.open { transform: rotate(180deg); }
	.dropdown { position: absolute; top: 100%; left: 0; right: 0; margin-top: var(--spacing-1); background: var(--glass-bg); backdrop-filter: var(--glass-blur); border: 1px solid var(--glass-border); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); z-index: 100; max-height: 300px; overflow: hidden; }
	.search-input { width: 100%; padding: var(--spacing-2) var(--spacing-3); border: none; border-bottom: 1px solid var(--glass-border); background: none; font-size: var(--font-size-sm); outline: none; }
	.options { max-height: 240px; overflow-y: auto; padding: var(--spacing-1); }
	.option { width: 100%; display: flex; align-items: center; gap: var(--spacing-2); padding: var(--spacing-2) var(--spacing-3); background: none; border: none; border-radius: var(--radius-sm); text-align: left; cursor: pointer; transition: all var(--transition-fast); font-size: var(--font-size-sm); color: var(--color-neutral-800); }
	.option:hover:not(.disabled) { background: var(--color-neutral-100); }
	.option.disabled { opacity: 0.5; cursor: not-allowed; }
	.checkbox { width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border: 2px solid var(--color-neutral-300); border-radius: var(--radius-sm); flex-shrink: 0; }
	.option.selected .checkbox { background: var(--color-primary-600); border-color: var(--color-primary-600); color: white; }
	@media (prefers-color-scheme: dark) {
		.label, .option { color: var(--color-neutral-100); }
		.option:hover:not(.disabled) { background: var(--color-neutral-800); }
	}
</style>
