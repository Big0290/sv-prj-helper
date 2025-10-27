<script lang="ts">
	import { Input, Button, Badge, Text } from '$lib/ui';
	import type { ComponentExample } from '$lib/docs/examples.js';

	interface Props {
		examples: ComponentExample[];
		searchQuery: string;
		selectedCategory: string;
		selectedComplexity: string;
		selectedComponent: string;
		availableComponents: string[];
		onSearchChange: (query: string) => void;
		onCategoryChange: (category: string) => void;
		onComplexityChange: (complexity: string) => void;
		onComponentChange: (component: string) => void;
		onClearFilters: () => void;
	}

	let {
		examples,
		searchQuery,
		selectedCategory,
		selectedComplexity,
		selectedComponent,
		availableComponents,
		onSearchChange,
		onCategoryChange,
		onComplexityChange,
		onComponentChange,
		onClearFilters
	}: Props = $props();

	const hasActiveFilters = $derived(
		searchQuery.trim() !== '' || 
		selectedCategory !== 'all' || 
		selectedComplexity !== 'all' || 
		selectedComponent !== 'all'
	);

	const categoryStats = $derived(() => {
		const stats = {
			all: examples.length,
			atoms: examples.filter(ex => ex.category === 'atoms').length,
			molecules: examples.filter(ex => ex.category === 'molecules').length,
			organisms: examples.filter(ex => ex.category === 'organisms').length,
			layouts: examples.filter(ex => ex.category === 'layouts').length
		};
		return stats;
	});

	const complexityStats = $derived(() => {
		const stats = {
			all: examples.length,
			basic: examples.filter(ex => ex.complexity === 'basic').length,
			intermediate: examples.filter(ex => ex.complexity === 'intermediate').length,
			advanced: examples.filter(ex => ex.complexity === 'advanced').length
		};
		return stats;
	});
</script>

<div class="example-search">
	<!-- Search Input -->
	<div class="search-section">
		<Input
			value={searchQuery}
			onchange={(e) => onSearchChange(e.target.value)}
			placeholder="Search examples by title, component, or use case..."
			type="search"
		/>
	</div>
	
	<!-- Filter Categories -->
	<div class="filters-section">
		<div class="filter-group">
			<Text size="sm" weight="medium">Category:</Text>
			<div class="filter-buttons">
				<button 
					class="filter-btn"
					class:active={selectedCategory === 'all'}
					onclick={() => onCategoryChange('all')}
				>
					All ({categoryStats().all})
				</button>
				<button 
					class="filter-btn"
					class:active={selectedCategory === 'atoms'}
					onclick={() => onCategoryChange('atoms')}
				>
					Atoms ({categoryStats().atoms})
				</button>
				<button 
					class="filter-btn"
					class:active={selectedCategory === 'molecules'}
					onclick={() => onCategoryChange('molecules')}
				>
					Molecules ({categoryStats().molecules})
				</button>
				<button 
					class="filter-btn"
					class:active={selectedCategory === 'organisms'}
					onclick={() => onCategoryChange('organisms')}
				>
					Organisms ({categoryStats().organisms})
				</button>
				<button 
					class="filter-btn"
					class:active={selectedCategory === 'layouts'}
					onclick={() => onCategoryChange('layouts')}
				>
					Layouts ({categoryStats().layouts})
				</button>
			</div>
		</div>
		
		<div class="filter-group">
			<Text size="sm" weight="medium">Complexity:</Text>
			<div class="filter-buttons">
				<button 
					class="filter-btn"
					class:active={selectedComplexity === 'all'}
					onclick={() => onComplexityChange('all')}
				>
					All ({complexityStats().all})
				</button>
				<button 
					class="filter-btn"
					class:active={selectedComplexity === 'basic'}
					onclick={() => onComplexityChange('basic')}
				>
					Basic ({complexityStats().basic})
				</button>
				<button 
					class="filter-btn"
					class:active={selectedComplexity === 'intermediate'}
					onclick={() => onComplexityChange('intermediate')}
				>
					Intermediate ({complexityStats().intermediate})
				</button>
				<button 
					class="filter-btn"
					class:active={selectedComplexity === 'advanced'}
					onclick={() => onComplexityChange('advanced')}
				>
					Advanced ({complexityStats().advanced})
				</button>
			</div>
		</div>
		
		<div class="filter-group">
			<Text size="sm" weight="medium">Component:</Text>
			<select 
				value={selectedComponent}
				onchange={(e) => onComponentChange(e.target.value)}
				class="component-select"
			>
				<option value="all">All Components</option>
				{#each availableComponents as component}
					<option value={component}>{component}</option>
				{/each}
			</select>
		</div>
	</div>
	
	<!-- Clear Filters -->
	{#if hasActiveFilters}
		<div class="clear-filters">
			<Button variant="ghost" size="sm" onclick={onClearFilters}>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
				Clear Filters
			</Button>
		</div>
	{/if}
</div>

<style>
	.example-search {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.search-section {
		width: 100%;
	}

	.filters-section {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		align-items: center;
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.filter-buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.filter-btn {
		padding: 0.5rem 1rem;
		border: 1px solid var(--border-color);
		background: var(--bg-secondary);
		color: var(--text-secondary);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 0.875rem;
		white-space: nowrap;
	}

	.filter-btn:hover {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.filter-btn.active {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	.component-select {
		padding: 0.5rem 1rem;
		border: 1px solid var(--border-color);
		background: var(--bg-secondary);
		color: var(--text-primary);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: 0.875rem;
		min-width: 150px;
	}

	.component-select:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px var(--color-primary-light);
	}

	.clear-filters {
		display: flex;
		justify-content: flex-end;
	}

	@media (max-width: 768px) {
		.filters-section {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
		}

		.filter-group {
			flex-direction: column;
			align-items: stretch;
			gap: 0.5rem;
		}

		.filter-buttons {
			justify-content: center;
		}

		.clear-filters {
			justify-content: center;
		}
	}
</style>