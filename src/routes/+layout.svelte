<script lang="ts">
	import '../lib/styles/theme.css';
	import { page } from '$app/stores';
	import { Button, Container, Flex, Link, ThemeProvider } from '$lib/ui';

	let mobileMenuOpen = $state(false);

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Components', href: '/demos' },
		{ label: 'Documentation', href: '/docs' },
		{ label: 'Examples', href: '/examples' }
	];
</script>

<ThemeProvider>
	<div class="app">
		<!-- Navigation Header -->
		<header class="header">
			<Container maxWidth="xl">
				<nav class="nav">
					<div class="nav-brand">
						<Link href="/" class="brand-link">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M12 2L2 7l10 5 10-5-10-5z"/>
								<path d="M2 17l10 5 10-5"/>
								<path d="M2 12l10 5 10-5"/>
							</svg>
							<span class="brand-text">SV Project Helper</span>
						</Link>
					</div>

					<!-- Desktop Navigation -->
					<div class="nav-links desktop-only">
						{#each navItems as item}
							{@const isActive = $page.url.pathname === item.href || ($page.url.pathname.startsWith('/demos') && item.href === '/demos')}
							<a 
								href={item.href} 
								class="nav-link"
								class:active={isActive}
							>
								{item.label}
							</a>
						{/each}
					</div>

					<div class="nav-actions">
						<Button 
							variant="ghost" 
							size="sm"
							href="https://github.com/yourusername/sv-project-helper"
							class="github-btn"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
							<span class="desktop-only">GitHub</span>
						</Button>

						<!-- Mobile Menu Button -->
						<button 
							class="mobile-menu-btn mobile-only"
							onclick={() => mobileMenuOpen = !mobileMenuOpen}
							aria-label="Toggle menu"
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								{#if mobileMenuOpen}
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								{:else}
									<line x1="3" y1="6" x2="21" y2="6"></line>
									<line x1="3" y1="12" x2="21" y2="12"></line>
									<line x1="3" y1="18" x2="21" y2="18"></line>
								{/if}
							</svg>
						</button>
					</div>
				</nav>

				<!-- Mobile Navigation -->
				{#if mobileMenuOpen}
					<div class="mobile-nav">
						{#each navItems as item}
							{@const isActive = $page.url.pathname === item.href || ($page.url.pathname.startsWith('/demos') && item.href === '/demos')}
							<a 
								href={item.href} 
								class="mobile-nav-link"
								class:active={isActive}
								onclick={() => mobileMenuOpen = false}
							>
								{item.label}
							</a>
						{/each}
					</div>
				{/if}
			</Container>
		</header>

		<!-- Main Content -->
		<main class="main">
			<slot />
		</main>
	</div>
</ThemeProvider>

<style>
	.app {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border-bottom: 1px solid var(--glass-border);
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0;
		gap: 2rem;
	}

	.nav-brand {
		flex-shrink: 0;
	}

	.brand-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: var(--text-primary);
		font-weight: 600;
		font-size: 1.125rem;
		transition: color 0.2s ease;
	}

	.brand-link:hover {
		color: var(--color-primary);
	}

	.brand-link svg {
		color: var(--color-primary);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2rem;
		flex: 1;
		justify-content: center;
	}

	.nav-link {
		text-decoration: none;
		color: var(--text-secondary);
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
		position: relative;
	}

	.nav-link:hover {
		color: var(--text-primary);
		background: rgba(255, 255, 255, 0.05);
	}

	.nav-link.active {
		color: var(--color-primary);
		background: rgba(168, 85, 247, 0.1);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 0;
	}

	.github-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		color: var(--text-primary);
		cursor: pointer;
		padding: 0.5rem;
		border-radius: var(--radius-md);
		transition: background 0.2s ease;
	}

	.mobile-menu-btn:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.mobile-nav {
		display: none;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem 0;
		border-top: 1px solid var(--border-color);
	}

	.mobile-nav-link {
		text-decoration: none;
		color: var(--text-secondary);
		font-weight: 500;
		padding: 0.75rem 1rem;
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
	}

	.mobile-nav-link:hover {
		color: var(--text-primary);
		background: rgba(255, 255, 255, 0.05);
	}

	.mobile-nav-link.active {
		color: var(--color-primary);
		background: rgba(168, 85, 247, 0.1);
	}

	.main {
		flex: 1;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.desktop-only {
			display: none;
		}

		.mobile-only {
			display: block;
		}

		.mobile-menu-btn {
			display: block;
		}

		.mobile-nav {
			display: flex;
		}

		.nav-links {
			display: none;
		}

		.brand-text {
			display: none;
		}
	}

	@media (min-width: 769px) {
		.mobile-only {
			display: none;
		}

		.desktop-only {
			display: block;
		}
	}
</style>
