<script lang="ts">
	import { page } from '$app/stores';
	import { Container, Stack, Card, Heading, Text, Link, Button, Input } from '$lib/ui';
	import { onMount } from 'svelte';

	let sidebarOpen = $state(false);
	let searchQuery = $state('');
	let searchResults = $state<Array<{title: string, path: string, description: string}>>([]);
	let showSearchResults = $state(false);

	const navigationItems = [
		{
			title: 'Getting Started',
			items: [
				{ title: 'Introduction', path: '/docs', description: 'Overview of the component library' },
				{ title: 'Installation', path: '/docs/installation', description: 'How to install and set up the library' },
				{ title: 'Quick Start', path: '/docs/quick-start', description: 'Get up and running quickly' },
				{ title: 'Theming', path: '/docs/theming', description: 'Customize colors and styles' }
			]
		},
		{
			title: 'Components',
			items: [
				{ title: 'Overview', path: '/docs/components', description: 'Browse all available components' },
				{ title: 'Atoms', path: '/docs/components?category=atoms', description: 'Basic building blocks' },
				{ title: 'Molecules', path: '/docs/components?category=molecules', description: 'Composed components' },
				{ title: 'Organisms', path: '/docs/components?category=organisms', description: 'Complex components' },
				{ title: 'Layouts', path: '/docs/components?category=layouts', description: 'Layout components' }
			]
		},
		{
			title: 'Examples',
			items: [
				{ title: 'Gallery', path: '/docs/examples', description: 'Real-world usage examples' },
				{ title: 'Patterns', path: '/docs/examples?category=patterns', description: 'Common UI patterns' },
				{ title: 'Templates', path: '/docs/examples?category=templates', description: 'Complete page templates' }
			]
		},
		{
			title: 'Guides',
			items: [
				{ title: 'Accessibility', path: '/docs/accessibility', description: 'Building accessible interfaces' },
				{ title: 'Best Practices', path: '/docs/best-practices', description: 'Recommended patterns and practices' },
				{ title: 'Migration', path: '/docs/migration', description: 'Upgrading from previous versions' }
			]
		}
	];

	const currentPath = $derived($page.url.pathname);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}

	// Search functionality
	function handleSearch() {
		if (!searchQuery.trim()) {
			showSearchResults = false;
			return;
		}

		const query = searchQuery.toLowerCase();
		const results: Array<{title: string, path: string, description: string}> = [];

		// Search through navigation items
		navigationItems.forEach(section => {
			section.items.forEach(item => {
				if (
					item.title.toLowerCase().includes(query) ||
					item.description.toLowerCase().includes(query)
				) {
					results.push(item);
				}
			});
		});

		searchResults = results.slice(0, 8); // Limit to 8 results
		showSearchResults = true;
	}

	function clearSearch() {
		searchQuery = '';
		showSearchResults = false;
	}

	// Close search results when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.search-container')) {
			showSearchResults = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	// Close sidebar when route changes
	$effect(() => {
		currentPath; // Subscribe to path changes
		closeSidebar();
	});
</script>

<div class="docs-layout">
	<!-- Mobile Header -->
	<header class="mobile-header">
		<div class="mobile-header-content">
			<Button variant="ghost" size="sm" onclick={toggleSidebar} class="sidebar-toggle">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</svg>
			</Button>
			
			<Link href="/docs" class="mobile-logo">
				<Heading as="h2" size="5">SV Project Helper</Heading>
			</Link>
			
			<div class="mobile-search">
				<Button variant="ghost" size="sm" onclick={() => document.querySelector('.search-input')?.focus()}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.35-4.35"></path>
					</svg>
				</Button>
			</div>
		</div>
	</header>

	<!-- Sidebar -->
	<aside class="sidebar" class:open={sidebarOpen}>
		<div class="sidebar-content">
			<!-- Logo -->
			<div class="sidebar-header">
				<Link href="/docs" class="logo">
					<Heading as="h2" size="4">SV Project Helper</Heading>
					<Text size="sm" color="var(--text-secondary)">Component Library</Text>
				</Link>
			</div>

			<!-- Search -->
			<div class="search-container">
				<div class="search-input-container">
					<Input
						bind:value={searchQuery}
						placeholder="Search documentation..."
						type="search"
						class="search-input"
						oninput={handleSearch}
					/>
					<div class="search-icon">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.35-4.35"></path>
						</svg>
					</div>
				</div>

				<!-- Search Results -->
				{#if showSearchResults}
					<Card class="search-results">
						{#if searchResults.length > 0}
							<div class="search-results-header">
								<Text size="sm" weight="medium">Search Results</Text>
								<Button variant="ghost" size="sm" onclick={clearSearch}>
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<line x1="18" y1="6" x2="6" y2="18"></line>
										<line x1="6" y1="6" x2="18" y2="18"></line>
									</svg>
								</Button>
							</div>
							<div class="search-results-list">
								{#each searchResults as result}
									<Link href={result.path} class="search-result-item" onclick={clearSearch}>
										<Text size="sm" weight="medium">{result.title}</Text>
										<Text size="xs" color="var(--text-secondary)">{result.description}</Text>
									</Link>
								{/each}
							</div>
						{:else}
							<div class="no-search-results">
								<Text size="sm" color="var(--text-secondary)">No results found for "{searchQuery}"</Text>
							</div>
						{/if}
					</Card>
				{/if}
			</div>

			<!-- Navigation -->
			<nav class="sidebar-nav">
				{#each navigationItems as section}
					<div class="nav-section">
						<Text size="sm" weight="medium" color="var(--text-secondary)" class="nav-section-title">
							{section.title}
						</Text>
						<div class="nav-items">
							{#each section.items as item}
								<Link 
									href={item.path} 
									class={`nav-item ${currentPath === item.path ? 'active' : ''}`}
									onclick={closeSidebar}
								>
									<Text size="sm">{item.title}</Text>
								</Link>
							{/each}
						</div>
					</div>
				{/each}
			</nav>

			<!-- Footer -->
			<div class="sidebar-footer">
				<div class="version-info">
					<Text size="xs" color="var(--text-secondary)">Version 1.0.0</Text>
				</div>
				<div class="footer-links">
					<Link href="https://github.com/your-org/sv-project-helper" class="footer-link">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
						</svg>
						GitHub
					</Link>
				</div>
			</div>
		</div>
	</aside>

	<!-- Sidebar Overlay -->
	{#if sidebarOpen}
		<div class="sidebar-overlay" onclick={closeSidebar}></div>
	{/if}

	<!-- Main Content -->
	<main class="main-content">
		<slot />
	</main>
</div>

<style>
	.docs-layout {
		display: flex;
		min-height: 100vh;
		background: var(--bg-primary);
	}

	/* Mobile Header */
	.mobile-header {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1001;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border-bottom: 1px solid var(--border-color);
	}

	.mobile-header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		max-width: 100%;
	}

	.mobile-logo {
		text-decoration: none;
		color: inherit;
	}

	/* Sidebar */
	.sidebar {
		width: 280px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border-right: 1px solid var(--border-color);
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		z-index: 1000;
		transform: translateX(0);
		transition: transform 0.3s ease;
		overflow-y: auto;
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 1.5rem;
		gap: 1.5rem;
	}

	.sidebar-header {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.logo {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	/* Search */
	.search-container {
		position: relative;
	}

	.search-input-container {
		position: relative;
	}

	:global(.search-input) {
		padding-right: 2.5rem !important;
	}

	.search-icon {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-secondary);
		pointer-events: none;
	}

	.search-results {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 1002;
		margin-top: 0.5rem;
		max-height: 300px;
		overflow-y: auto;
	}

	.search-results-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.search-results-list {
		padding: 0.5rem;
	}

	.search-result-item {
		display: block;
		padding: 0.75rem;
		border-radius: var(--radius-md);
		text-decoration: none;
		color: inherit;
		transition: background-color 0.2s ease;
	}

	.search-result-item:hover {
		background: var(--bg-secondary);
	}

	.no-search-results {
		padding: 1rem;
		text-align: center;
	}

	/* Navigation */
	.sidebar-nav {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.nav-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-section-title {
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.nav-items {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.nav-item {
		display: block;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-md);
		text-decoration: none;
		color: var(--text-secondary);
		transition: all 0.2s ease;
		border-left: 3px solid transparent;
	}

	.nav-item:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.nav-item.active {
		background: var(--color-primary-light);
		color: var(--color-primary-dark);
		border-left-color: var(--color-primary);
		font-weight: 500;
	}

	/* Sidebar Footer */
	.sidebar-footer {
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.footer-links {
		display: flex;
		gap: 1rem;
	}

	.footer-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s ease;
	}

	.footer-link:hover {
		color: var(--text-primary);
	}

	/* Main Content */
	.main-content {
		flex: 1;
		margin-left: 280px;
		min-height: 100vh;
		background: var(--bg-primary);
	}

	/* Sidebar Overlay */
	.sidebar-overlay {
		display: none;
	}

	/* Mobile Styles */
	@media (max-width: 1024px) {
		.mobile-header {
			display: block;
		}

		.sidebar {
			transform: translateX(-100%);
		}

		.sidebar.open {
			transform: translateX(0);
		}

		.sidebar-overlay {
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 999;
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.3s ease;
		}

		.sidebar.open + .sidebar-overlay {
			opacity: 1;
			pointer-events: auto;
		}

		.main-content {
			margin-left: 0;
			padding-top: 70px; /* Account for mobile header */
		}
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 100%;
			max-width: 320px;
		}

		.sidebar-content {
			padding: 1rem;
		}

		.mobile-header-content {
			padding: 0.75rem 1rem;
		}

		.main-content {
			padding-top: 60px;
		}
	}
</style>