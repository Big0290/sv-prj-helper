<script lang="ts">
	import { Container, Heading, Text, Stack, Card, Input, Button, Badge, Flex, Link } from '$lib/ui';
	import { onMount } from 'svelte';
	import type { DocumentationMetadata } from '$lib/docs/types.js';

	let documentation: DocumentationMetadata | null = $state(null);
	let loading = $state(true);
	let searchQuery = $state('');
	let selectedCategory = $state('all');

	onMount(async () => {
		try {
			const response = await fetch('/api/docs/components');
			
			if (!response.ok) {
				throw new Error('Failed to fetch documentation');
			}
			
			documentation = await response.json();
		} catch (error) {
			console.error('Failed to load documentation:', error);
		} finally {
			loading = false;
		}
	});

	const filteredComponents = $derived(() => {
		if (!documentation) return [];
		
		const components = Object.entries(documentation.components);
		
		return components.filter(([name, component]) => {
			const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				component.documentation.description.toLowerCase().includes(searchQuery.toLowerCase());
			
			const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
			
			return matchesSearch && matchesCategory;
		});
	});

	const categories = $derived(() => {
		if (!documentation) return [];
		return documentation.categories;
	});
</script>

<svelte:head>
	<title>Component Documentation - SV Project Helper</title>
</svelte:head>

<Container maxWidth="xl">
	<div class="docs-components-page">
		<header class="page-header">
			<Stack gap="4">
				<div>
					<Heading as="h1" size="1">Component Documentation</Heading>
					<Text size="lg" color="var(--text-secondary)">
						Interactive documentation and live examples for all components
					</Text>
				</div>
				
				{#if documentation}
					<div class="header-badges">
						<Badge variant="info">{documentation.totalComponents} Components</Badge>
						<Badge variant="success">{categories().length} Categories</Badge>
						<Badge variant="default">v{documentation.version}</Badge>
					</div>
				{/if}
			</Stack>
		</header>

		{#if loading}
			<div class="loading-state">
				<Card>
					<Stack gap="4" align="center">
						<div class="spinner"></div>
						<Text>Loading component documentation...</Text>
					</Stack>
				</Card>
			</div>
		{:else if documentation}
			<div class="docs-content">
				<!-- Search and Filters -->
				<Card class="search-filters">
					<Stack gap="4">
						<Input
							bind:value={searchQuery}
							placeholder="Search components..."
							type="search"
						/>
						
						<div class="category-filters">
							<button 
								class="category-btn"
								class:active={selectedCategory === 'all'}
								onclick={() => selectedCategory = 'all'}
							>
								All ({documentation.totalComponents})
							</button>
							{#each categories() as category}
								<button 
									class="category-btn"
									class:active={selectedCategory === category.name}
									onclick={() => selectedCategory = category.name}
								>
									{category.name} ({category.components.length})
								</button>
							{/each}
						</div>
					</Stack>
				</Card>

				<!-- Component Grid -->
				<div class="components-grid">
					{#each filteredComponents() as [componentName, component]}
						<Card class="component-card">
							<Stack gap="4">
								<div class="component-header">
									<div class="component-title">
										<Heading as="h3" size="4">{componentName}</Heading>
										<Badge variant="default" size="sm">{component.category}</Badge>
									</div>
									<Link href="/docs/components/{componentName.toLowerCase()}" class="view-docs-btn">
										View Docs →
									</Link>
								</div>
								
								<Text color="var(--text-secondary)" size="sm">
									{component.documentation.description}
								</Text>
								
								<div class="component-meta">
									<div class="meta-badges">
										{#if component.documentation.props.length > 0}
											<Badge variant="info" size="sm">{component.documentation.props.length} Props</Badge>
										{/if}
										{#if component.documentation.events.length > 0}
											<Badge variant="success" size="sm">{component.documentation.events.length} Events</Badge>
										{/if}
										{#if component.documentation.slots.length > 0}
											<Badge variant="warning" size="sm">{component.documentation.slots.length} Slots</Badge>
										{/if}
									</div>
								</div>
							</Stack>
						</Card>
					{/each}
				</div>

				{#if filteredComponents().length === 0}
					<Card class="no-results">
						<Stack gap="4" align="center">
							<Text size="lg">No components found</Text>
							<Text color="var(--text-secondary)">
								Try adjusting your search or filter criteria
							</Text>
							<Button variant="ghost" onclick={() => { searchQuery = ''; selectedCategory = 'all'; }}>
								Clear Filters
							</Button>
						</Stack>
					</Card>
				{/if}
			</div>
		{:else}
			<Card class="error-state">
				<Stack gap="4" align="center">
					<Text size="lg" color="var(--color-error)">Failed to load documentation</Text>
					<Text color="var(--text-secondary)">
						There was an error loading the component documentation. Please try refreshing the page.
					</Text>
					<Button variant="primary" onclick={() => window.location.reload()}>
						Refresh Page
					</Button>
				</Stack>
			</Card>
		{/if}
	</div>
</Container>

<style>
	.docs-components-page {
		padding: 2rem 0 4rem;
	}

	.page-header {
		margin-bottom: 3rem;
	}

	.loading-state,
	.error-state,
	.no-results {
		margin: 3rem 0;
		text-align: center;
	}

	.spinner {
		width: 32px;
		height: 32px;
		border: 3px solid var(--border-color);
		border-top: 3px solid var(--color-primary);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.docs-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.search-filters {
		position: sticky;
		top: 80px;
		z-index: 10;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
	}

	.category-filters {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.category-btn {
		padding: 0.5rem 1rem;
		border: 1px solid var(--border-color);
		background: var(--bg-secondary);
		color: var(--text-secondary);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 0.875rem;
		text-transform: capitalize;
	}

	.category-btn:hover {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.category-btn.active {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	.components-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.component-card {
		height: 100%;
		transition: all 0.2s ease;
		border: 1px solid var(--border-color);
	}

	.component-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		border-color: var(--color-primary-light);
	}

	.header-badges {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.component-header {
		min-height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.component-title {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.meta-badges {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.view-docs-btn {
		font-size: 0.875rem;
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.view-docs-btn:hover {
		color: var(--color-primary-dark);
	}

	.component-meta {
		margin-top: auto;
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
	}

	@media (max-width: 768px) {
		.docs-components-page {
			padding: 1rem 0 2rem;
		}

		.components-grid {
			grid-template-columns: 1fr;
		}

		.category-filters {
			justify-content: center;
		}

		.search-filters {
			position: static;
		}
	}
</style>