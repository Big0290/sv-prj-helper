<script lang="ts">
	import { page } from '$app/stores';
	import { Container, Heading, Text, Stack, Card, Badge, Button, Divider, Flex, Link } from '$lib/ui';
	import { onMount } from 'svelte';
	import type { ComponentDocumentation } from '$lib/docs/types.js';
	import ComponentPlayground from '$lib/components/docs/ComponentPlayground.svelte';
	import ComponentAPITable from '$lib/components/docs/ComponentAPITable.svelte';
	import CodeExample from '$lib/components/docs/CodeExample.svelte';
	import Breadcrumb from '$lib/components/docs/Breadcrumb.svelte';

	let componentName = $derived($page.params.component);
	let documentation: ComponentDocumentation | null = $state(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	onMount(async () => {
		if (!componentName) return;
		
		try {
			const response = await fetch(`/api/docs/components/${componentName}`);
			
			if (!response.ok) {
				const errorData = await response.json();
				error = errorData.error || `Failed to load documentation for "${componentName}"`;
				return;
			}
			
			documentation = await response.json();
		} catch (err) {
			error = `Failed to load documentation for "${componentName}": ${err}`;
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>{componentName ? `${componentName} Component` : 'Component'} - SV Project Helper</title>
</svelte:head>

<Container maxWidth="xl">
	<div class="component-docs-page">
		{#if loading}
			<div class="loading-state">
				<Card>
					<Stack gap="4" align="center">
						<div class="spinner"></div>
						<Text>Loading {componentName} documentation...</Text>
					</Stack>
				</Card>
			</div>
		{:else if error}
			<div class="error-state">
				<Card>
					<Stack gap="4" align="center">
						<Text size="lg" color="var(--color-error)">Error Loading Component</Text>
						<Text color="var(--text-secondary)">{error}</Text>
						<Button variant="primary" onclick={() => window.location.href = '/docs/components'}>
							← Back to Components
						</Button>
					</Stack>
				</Card>
			</div>
		{:else if documentation}
			<!-- Component Header -->
			<header class="component-header">
				<Stack gap="4">
					<Breadcrumb items={[
						{ title: 'Documentation', path: '/docs' },
						{ title: 'Components', path: '/docs/components' },
						{ title: documentation.name }
					]} />
					
					<div class="header-content">
						<div class="header-content">
							<div class="header-text">
								<Heading as="h1" size="1">{documentation.name}</Heading>
								<Text size="lg" color="var(--text-secondary)">
									{documentation.description}
								</Text>
							</div>
							
							<div class="header-badges">
								<Badge variant="info">{documentation.category}</Badge>
								{#if documentation.version}
									<Badge variant="default">v{documentation.version}</Badge>
								{/if}
							</div>
						</div>
					</div>
				</Stack>
			</header>

			<div class="docs-layout">
				<!-- Main Content -->
				<main class="docs-main">
					<!-- Live Playground -->
					<section class="playground-section">
						<Card>
							<Stack gap="4">
								<Heading as="h2" size="3">Interactive Playground</Heading>
								<ComponentPlayground 
									componentName={documentation.name}
									props={documentation.props}
									examples={documentation.examples}
								/>
							</Stack>
						</Card>
					</section>

					<!-- Installation -->
					<section class="installation-section">
						<Card>
							<Stack gap="4">
								<Heading as="h2" size="3">Installation & Usage</Heading>
								
								<div>
									<Text weight="medium" style="margin-bottom: 0.5rem;">Install the package:</Text>
									<CodeExample 
										code="npm install @sv-project-helper/ui"
										language="bash"
										copyable
									/>
								</div>
								
								<div>
									<Text weight="medium" style="margin-bottom: 0.5rem;">Import the component:</Text>
									<CodeExample 
										code={`import { ${documentation.name} } from '${documentation.importPath}';`}
										language="javascript"
										copyable
									/>
								</div>
							</Stack>
						</Card>
					</section>

					<!-- Examples -->
					{#if documentation.examples.length > 0}
						<section class="examples-section">
							<Card>
								<Stack gap="6">
									<Heading as="h2" size="3">Examples</Heading>
									
									{#each documentation.examples as example}
										<div class="example-item">
											<Stack gap="3">
												<div>
													<Heading as="h3" size="5">{example.title}</Heading>
													{#if example.description}
														<Text color="var(--text-secondary)" size="sm">
															{example.description}
														</Text>
													{/if}
												</div>
												
												<CodeExample 
													code={example.code}
													language={example.language}
													copyable
													live={example.language === 'svelte'}
												/>
											</Stack>
										</div>
										
										{#if example !== documentation.examples[documentation.examples.length - 1]}
											<Divider />
										{/if}
									{/each}
								</Stack>
							</Card>
						</section>
					{/if}

					<!-- API Reference -->
					<section class="api-section">
						<Card>
							<Stack gap="6">
								<Heading as="h2" size="3">API Reference</Heading>
								
								<!-- Props -->
								{#if documentation.props.length > 0}
									<div>
										<Heading as="h3" size="4">Props</Heading>
										<ComponentAPITable items={documentation.props} type="props" />
									</div>
								{:else}
									<div>
										<Heading as="h3" size="4">Props</Heading>
										<Text color="var(--text-secondary)">This component does not accept any props.</Text>
									</div>
								{/if}

								<!-- Events -->
								{#if documentation.events.length > 0}
									<div>
										<Heading as="h3" size="4">Events</Heading>
										<ComponentAPITable items={documentation.events} type="events" />
									</div>
								{:else}
									<div>
										<Heading as="h3" size="4">Events</Heading>
										<Text color="var(--text-secondary)">This component does not emit any custom events.</Text>
									</div>
								{/if}

								<!-- Slots -->
								{#if documentation.slots.length > 0}
									<div>
										<Heading as="h3" size="4">Slots</Heading>
										<ComponentAPITable items={documentation.slots} type="slots" />
									</div>
								{:else}
									<div>
										<Heading as="h3" size="4">Slots</Heading>
										<Text color="var(--text-secondary)">This component does not provide any slots.</Text>
									</div>
								{/if}
							</Stack>
						</Card>
					</section>

					<!-- Accessibility -->
					<section class="accessibility-section">
						<Card>
							<Stack gap="4">
								<Heading as="h2" size="3">Accessibility</Heading>
								
								{#if documentation.accessibility.keyboardNavigation?.length}
									<div>
										<Heading as="h4" size="5">Keyboard Navigation</Heading>
										<ul class="accessibility-list">
											{#each documentation.accessibility.keyboardNavigation as item}
												<li>{item}</li>
											{/each}
										</ul>
									</div>
								{/if}
								
								{#if documentation.accessibility.ariaAttributes?.length}
									<div>
										<Heading as="h4" size="5">ARIA Attributes</Heading>
										<ul class="accessibility-list">
											{#each documentation.accessibility.ariaAttributes as attr}
												<li><code>{attr}</code></li>
											{/each}
										</ul>
									</div>
								{/if}
								
								{#if documentation.accessibility.focusManagement}
									<div>
										<Heading as="h4" size="5">Focus Management</Heading>
										<Text>{documentation.accessibility.focusManagement}</Text>
									</div>
								{/if}
								
								{#if documentation.accessibility.guidelines?.length}
									<div>
										<Heading as="h4" size="5">Guidelines</Heading>
										<ul class="accessibility-list">
											{#each documentation.accessibility.guidelines as guideline}
												<li>{guideline}</li>
											{/each}
										</ul>
									</div>
								{/if}
								
								{#if !documentation.accessibility.keyboardNavigation?.length && !documentation.accessibility.ariaAttributes?.length && !documentation.accessibility.focusManagement && !documentation.accessibility.guidelines?.length}
									<Text color="var(--text-secondary)">
										This component follows WCAG 2.1 AA guidelines and includes proper ARIA attributes and keyboard navigation support.
									</Text>
								{/if}
							</Stack>
						</Card>
					</section>
				</main>

				<!-- Sidebar -->
				<aside class="docs-sidebar">
					<Card class="sidebar-nav">
						<Stack gap="4">
							<Heading as="h3" size="5">On This Page</Heading>
							<nav class="page-nav">
								<a href="#playground">Interactive Playground</a>
								<a href="#installation">Installation & Usage</a>
								{#if documentation.examples.length > 0}
									<a href="#examples">Examples</a>
								{/if}
								<a href="#api">API Reference</a>
								<a href="#accessibility">Accessibility</a>
							</nav>
						</Stack>
					</Card>
					
					{#if documentation.relatedComponents?.length}
						<Card class="related-components">
							<Stack gap="3">
								<Heading as="h4" size="5">Related Components</Heading>
								<div class="related-list">
									{#each documentation.relatedComponents as related}
										<Link href="/docs/components/{related.toLowerCase()}">{related}</Link>
									{/each}
								</div>
							</Stack>
						</Card>
					{/if}
				</aside>
			</div>
		{/if}
	</div>
</Container>

<style>
	.component-docs-page {
		padding: 2rem 0 4rem;
	}

	.loading-state,
	.error-state {
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

	.component-header {
		margin-bottom: 3rem;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.header-badges {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		flex-shrink: 0;
	}

	.docs-layout {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: 3rem;
		align-items: start;
	}

	.docs-main {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.docs-sidebar {
		position: sticky;
		top: 100px;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.page-nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.page-nav a {
		color: var(--text-secondary);
		text-decoration: none;
		padding: 0.5rem 0;
		border-left: 2px solid transparent;
		padding-left: 1rem;
		transition: all 0.2s ease;
		font-size: 0.875rem;
	}

	.page-nav a:hover {
		color: var(--text-primary);
		border-left-color: var(--color-primary-light);
	}

	.related-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.related-list a {
		font-size: 0.875rem;
		color: var(--color-primary);
		text-decoration: none;
	}

	.related-list a:hover {
		text-decoration: underline;
	}

	.example-item {
		scroll-margin-top: 100px;
	}

	.accessibility-list {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.accessibility-list li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	.accessibility-list code {
		background: var(--bg-secondary);
		padding: 0.125rem 0.25rem;
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
	}

	/* Add scroll margin for anchor links */
	.playground-section,
	.installation-section,
	.examples-section,
	.api-section,
	.accessibility-section {
		scroll-margin-top: 100px;
	}

	.playground-section { --anchor: playground; }
	.installation-section { --anchor: installation; }
	.examples-section { --anchor: examples; }
	.api-section { --anchor: api; }
	.accessibility-section { --anchor: accessibility; }

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.docs-sidebar {
			position: static;
			order: -1;
		}
	}

	@media (max-width: 768px) {
		.component-docs-page {
			padding: 1rem 0 2rem;
		}

		.docs-main {
			gap: 2rem;
		}

		.header-content {
			flex-direction: column;
			gap: 1rem;
		}

		.header-badges {
			align-self: flex-start;
		}
	}
</style>