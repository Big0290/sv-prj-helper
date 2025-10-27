<script lang="ts">
	import { Container, Heading, Text, Stack, Card, Input, Button, Badge, Flex, Link } from '$lib/ui';
	import { onMount } from 'svelte';
	import CodeExample from '$lib/components/docs/CodeExample.svelte';
	import Breadcrumb from '$lib/components/docs/Breadcrumb.svelte';
	import { 
		componentExamples, 
		exampleCategories, 
		searchExamples, 
		filterExamplesByCategory,
		filterExamplesByComplexity,
		filterExamplesByComponent,
		type ComponentExample 
	} from '$lib/docs/examples.js';

	let searchQuery = $state('');
	let selectedCategory = $state('all');
	let selectedComplexity = $state('all');
	let selectedComponent = $state('all');
	let viewMode = $state<'grid' | 'list'>('grid');

	const filteredExamples = $derived(() => {
		let examples = componentExamples;
		
		// Apply search
		examples = searchExamples(searchQuery, examples);
		
		// Apply filters
		examples = filterExamplesByCategory(selectedCategory, examples);
		examples = filterExamplesByComplexity(selectedComplexity, examples);
		examples = filterExamplesByComponent(selectedComponent, examples);
		
		return examples;
	});

	const availableComponents = $derived(() => {
		const components = [...new Set(componentExamples.map(ex => ex.component))];
		return components.sort();
	});

	function clearFilters() {
		searchQuery = '';
		selectedCategory = 'all';
		selectedComplexity = 'all';
		selectedComponent = 'all';
	}

	async function copyExampleCode(code: string) {
		if (!navigator.clipboard) return;
		
		try {
			await navigator.clipboard.writeText(code);
		} catch (error) {
			console.error('Failed to copy code:', error);
		}
	}
</script>

<svelte:head>
	<title>Component Examples - SV Project Helper</title>
	<meta name="description" content="Comprehensive examples and use cases for all components in the SV Project Helper UI library" />
</svelte:head>

<Container maxWidth="xl">
	<div class="examples-page">
		<!-- Header -->
		<header class="page-header">
			<Stack gap="4">
				<Breadcrumb items={[
					{ title: 'Documentation', path: '/docs' },
					{ title: 'Examples' }
				]} />
				
				<div>
					<Heading as="h1" size="1">Component Examples</Heading>
					<Text size="lg" color="var(--text-secondary)">
						Real-world examples and use cases for building with our component library
					</Text>
				</div>
				
				<div class="header-stats">
					<Badge variant="info">{componentExamples.length} Examples</Badge>
					<Badge variant="success">{availableComponents().length} Components</Badge>
					<Badge variant="default">{exampleCategories.length} Categories</Badge>
				</div>
			</Stack>
		</header>

		<!-- Search and Filters -->
		<Card class="search-filters">
			<Stack gap="4">
				<!-- Search -->
				<div class="search-section">
					<Input
						bind:value={searchQuery}
						placeholder="Search examples by title, component, or use case..."
						type="search"
					/>
				</div>
				
				<!-- Filters -->
				<div class="filters-section">
					<div class="filter-group">
						<Text size="sm" weight="medium">Category:</Text>
						<div class="filter-buttons">
							<button 
								class="filter-btn"
								class:active={selectedCategory === 'all'}
								onclick={() => selectedCategory = 'all'}
							>
								All
							</button>
							<button 
								class="filter-btn"
								class:active={selectedCategory === 'atoms'}
								onclick={() => selectedCategory = 'atoms'}
							>
								Atoms
							</button>
							<button 
								class="filter-btn"
								class:active={selectedCategory === 'molecules'}
								onclick={() => selectedCategory = 'molecules'}
							>
								Molecules
							</button>
							<button 
								class="filter-btn"
								class:active={selectedCategory === 'organisms'}
								onclick={() => selectedCategory = 'organisms'}
							>
								Organisms
							</button>
							<button 
								class="filter-btn"
								class:active={selectedCategory === 'layouts'}
								onclick={() => selectedCategory = 'layouts'}
							>
								Layouts
							</button>
						</div>
					</div>
					
					<div class="filter-group">
						<Text size="sm" weight="medium">Complexity:</Text>
						<div class="filter-buttons">
							<button 
								class="filter-btn"
								class:active={selectedComplexity === 'all'}
								onclick={() => selectedComplexity = 'all'}
							>
								All
							</button>
							<button 
								class="filter-btn"
								class:active={selectedComplexity === 'basic'}
								onclick={() => selectedComplexity = 'basic'}
							>
								Basic
							</button>
							<button 
								class="filter-btn"
								class:active={selectedComplexity === 'intermediate'}
								onclick={() => selectedComplexity = 'intermediate'}
							>
								Intermediate
							</button>
							<button 
								class="filter-btn"
								class:active={selectedComplexity === 'advanced'}
								onclick={() => selectedComplexity = 'advanced'}
							>
								Advanced
							</button>
						</div>
					</div>
					
					<div class="filter-group">
						<Text size="sm" weight="medium">Component:</Text>
						<select 
							bind:value={selectedComponent}
							class="component-select"
						>
							<option value="all">All Components</option>
							{#each availableComponents() as component}
								<option value={component}>{component}</option>
							{/each}
						</select>
					</div>
				</div>
				
				<!-- View Controls -->
				<div class="view-controls">
					<div class="view-mode-buttons">
						<button 
							class="view-btn"
							class:active={viewMode === 'grid'}
							onclick={() => viewMode = 'grid'}
							title="Grid view"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="3" y="3" width="7" height="7"></rect>
								<rect x="14" y="3" width="7" height="7"></rect>
								<rect x="14" y="14" width="7" height="7"></rect>
								<rect x="3" y="14" width="7" height="7"></rect>
							</svg>
						</button>
						<button 
							class="view-btn"
							class:active={viewMode === 'list'}
							onclick={() => viewMode = 'list'}
							title="List view"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<line x1="8" y1="6" x2="21" y2="6"></line>
								<line x1="8" y1="12" x2="21" y2="12"></line>
								<line x1="8" y1="18" x2="21" y2="18"></line>
								<line x1="3" y1="6" x2="3.01" y2="6"></line>
								<line x1="3" y1="12" x2="3.01" y2="12"></line>
								<line x1="3" y1="18" x2="3.01" y2="18"></line>
							</svg>
						</button>
					</div>
					
					{#if searchQuery || selectedCategory !== 'all' || selectedComplexity !== 'all' || selectedComponent !== 'all'}
						<Button variant="ghost" size="sm" onclick={clearFilters}>
							Clear Filters
						</Button>
					{/if}
				</div>
			</Stack>
		</Card>

		<!-- Results -->
		<div class="examples-content">
			{#if filteredExamples().length > 0}
				<div class="results-header">
					<Text color="var(--text-secondary)">
						Showing {filteredExamples().length} of {componentExamples.length} examples
					</Text>
				</div>
				
				<div class="examples-container" class:grid-view={viewMode === 'grid'} class:list-view={viewMode === 'list'}>
					{#each filteredExamples() as example}
						<Card class="example-card">
							<Stack gap="4">
								<!-- Example Header -->
								<div class="example-header">
									<div class="example-meta">
										<Heading as="h3" size="4">{example.title}</Heading>
										<div class="example-badges">
											<Badge variant="default" size="sm">{example.component}</Badge>
											<Badge 
												variant={example.complexity === 'basic' ? 'success' : example.complexity === 'intermediate' ? 'warning' : 'info'} 
												size="sm"
											>
												{example.complexity}
											</Badge>
											<Badge variant="ghost" size="sm">{example.category}</Badge>
										</div>
									</div>
								</div>
								
								<!-- Description -->
								<div>
									<Text color="var(--text-secondary)" size="sm">
										{example.description}
									</Text>
									<Text size="sm" style="margin-top: 0.5rem;">
										<strong>Use case:</strong> {example.useCase}
									</Text>
								</div>
								
								<!-- Tags -->
								{#if example.tags.length > 0}
									<div class="example-tags">
										{#each example.tags as tag}
											<span class="tag">{tag}</span>
										{/each}
									</div>
								{/if}
								
								<!-- Code Example -->
								<div class="code-section">
									<CodeExample 
										code={example.code}
										language={example.language}
										copyable
										live={example.language === 'svelte'}
										title="Example Code"
									/>
								</div>
								
								<!-- Actions -->
								<div class="example-actions">
									<Button 
										variant="ghost" 
										size="sm"
										onclick={() => copyExampleCode(example.code)}
									>
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
											<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
										</svg>
										Copy Code
									</Button>
									<Link href="/docs/components/{example.component.toLowerCase()}">
										View {example.component} Docs →
									</Link>
								</div>
							</Stack>
						</Card>
					{/each}
				</div>
			{:else}
				<Card class="no-results">
					<Stack gap="4" align="center">
						<div class="no-results-icon">
							<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
								<circle cx="11" cy="11" r="8"></circle>
								<path d="m21 21-4.35-4.35"></path>
							</svg>
						</div>
						<div class="no-results-text">
							<Heading as="h3" size="4">No examples found</Heading>
							<Text color="var(--text-secondary)">
								Try adjusting your search or filter criteria
							</Text>
						</div>
						<Button variant="primary" onclick={clearFilters}>
							Clear All Filters
						</Button>
					</Stack>
				</Card>
			{/if}
		</div>
	</div>
</Container>

<style>
	.examples-page {
		padding: 2rem 0 4rem;
	}

	.page-header {
		margin-bottom: 3rem;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.header-stats {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.search-filters {
		margin-bottom: 2rem;
		position: sticky;
		top: 80px;
		z-index: 10;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
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
	}

	.view-controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.view-mode-buttons {
		display: flex;
		gap: 0.25rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.view-btn {
		padding: 0.5rem;
		border: none;
		background: var(--bg-secondary);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.view-btn:hover {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.view-btn.active {
		background: var(--color-primary);
		color: white;
	}

	.examples-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.results-header {
		padding: 0 0.5rem;
	}

	.examples-container.grid-view {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 2rem;
	}

	.examples-container.list-view {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.example-card {
		height: 100%;
		transition: all 0.2s ease;
		border: 1px solid var(--border-color);
	}

	.example-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		border-color: var(--color-primary-light);
	}

	.example-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.example-meta {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
	}

	.example-badges {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.example-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tag {
		padding: 0.25rem 0.5rem;
		background: var(--bg-tertiary);
		color: var(--text-secondary);
		border-radius: var(--radius-sm);
		font-size: 0.75rem;
		font-weight: 500;
	}

	.code-section {
		border-top: 1px solid var(--border-color);
		padding-top: 1rem;
	}

	.example-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
	}

	.no-results {
		text-align: center;
		padding: 3rem 2rem;
	}

	.no-results-icon {
		color: var(--text-secondary);
		opacity: 0.5;
	}

	.no-results-text {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	@media (max-width: 768px) {
		.examples-page {
			padding: 1rem 0 2rem;
		}

		.examples-container.grid-view {
			grid-template-columns: 1fr;
		}

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

		.view-controls {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
		}

		.search-filters {
			position: static;
		}

		.example-actions {
			flex-direction: column;
			align-items: stretch;
			gap: 0.75rem;
		}
	}
</style>