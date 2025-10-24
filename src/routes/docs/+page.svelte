<script lang="ts">
	import { Heading, Text, Container, Stack, Card, Button, Link, Badge, Divider, Input } from '$lib/ui';
	import '../../lib/styles/theme.css';

	const sections = [
		{
			title: 'Getting Started',
			description: 'Installation, setup, and basic usage',
			href: '/docs/getting-started',
			badge: 'Essential'
		},
		{
			title: 'Components',
			description: 'Complete component reference and API',
			href: '/demos',
			badge: 'Reference'
		},
		{
			title: 'Theming',
			description: 'Customizing colors, spacing, and design tokens',
			href: '/docs/theming',
			badge: 'Customization'
		},
		{
			title: 'Accessibility',
			description: 'WCAG compliance and accessibility features',
			href: '/docs/accessibility',
			badge: 'A11y'
		},
		{
			title: 'TypeScript',
			description: 'Type definitions and TypeScript usage',
			href: '/docs/typescript',
			badge: 'Types'
		},
		{
			title: 'Migration Guide',
			description: 'Upgrading from previous versions',
			href: '/docs/migration',
			badge: 'Migration'
		}
	];
</script>

<svelte:head>
	<title>Documentation - SV Project Helper</title>
</svelte:head>

<Container maxWidth="xl">
	<div class="docs-page">
		<header class="docs-header">
			<Stack gap="4" align="center">
				<Heading as="h1" size="1">Documentation</Heading>
				<Text size="xl" color="var(--text-secondary)" align="center">
					Everything you need to build amazing UIs with SV Project Helper
				</Text>
				<Button variant="primary" href="/demos">
					Browse Components →
				</Button>
			</Stack>
		</header>

		<Divider style="margin: 3rem 0;" />

		<section class="quick-start">
			<Stack gap="6">
				<div>
					<Heading as="h2" size="2">Quick Start</Heading>
					<Text color="var(--text-secondary)">
						Get up and running in minutes with our component library
					</Text>
				</div>

				<div class="install-steps">
					<Card class="install-card">
						<Stack gap="4">
							<div>
								<Heading as="h3" size="4">1. Install the Package</Heading>
								<Text size="sm" color="var(--text-secondary)">Add SV Project Helper to your Svelte project</Text>
							</div>
							<div class="code-block">
								<pre><code>npm install @sv-prj-helper/ui</code></pre>
								<button class="copy-btn" onclick={() => navigator.clipboard.writeText('npm install @sv-prj-helper/ui')} aria-label="Copy install command">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								</button>
							</div>
						</Stack>
					</Card>

					<Card class="install-card">
						<Stack gap="4">
							<div>
								<Heading as="h3" size="4">2. Import Components</Heading>
								<Text size="sm" color="var(--text-secondary)">Import the components you need</Text>
							</div>
							<div class="code-block">
								<pre><code>import { Button, Card, Input } from '@sv-prj-helper/ui';</code></pre>
								<button class="copy-btn" onclick={() => navigator.clipboard.writeText("import { Button, Card, Input } from '@sv-prj-helper/ui';")} aria-label="Copy import statement">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								</button>
							</div>
						</Stack>
					</Card>

					<Card class="install-card">
						<Stack gap="4">
							<div>
								<Heading as="h3" size="4">3. Use in Your App</Heading>
								<Text size="sm" color="var(--text-secondary)">Start building with our components</Text>
							</div>
							<div class="code-block">
								<pre><code>{`<Card>
  <Input label="Email" type="email" />
  <Button variant="primary">Submit</Button>
</Card>`}</code></pre>
								<button class="copy-btn" onclick={() => navigator.clipboard.writeText(`<Card>\n  <Input label="Email" type="email" />\n  <Button variant="primary">Submit</Button>\n</Card>`)} aria-label="Copy code example">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								</button>
							</div>
						</Stack>
					</Card>
				</div>
			</Stack>
		</section>

		<Divider style="margin: 3rem 0;" />

		<section class="docs-sections">
			<Stack gap="6">
				<div>
					<Heading as="h2" size="2">Documentation Sections</Heading>
					<Text color="var(--text-secondary)">
						Comprehensive guides and references for all aspects of the library
					</Text>
				</div>

				<div class="sections-grid">
					{#each sections as section}
						<Card class="section-card">
							<Stack gap="4">
								<div class="section-header">
									<Heading as="h3" size="5">{section.title}</Heading>
									<Badge variant="info" size="sm">{section.badge}</Badge>
								</div>
								<Text color="var(--text-secondary)">{section.description}</Text>
								<div>
									<Link href={section.href}>
										Read more →
									</Link>
								</div>
							</Stack>
						</Card>
					{/each}
				</div>
			</Stack>
		</section>

		<Divider style="margin: 3rem 0;" />

		<section class="help-section">
			<Card class="help-card">
				<Stack gap="4" align="center">
					<Heading as="h2" size="3">Need Help?</Heading>
					<Text align="center" color="var(--text-secondary)">
						Can't find what you're looking for? We're here to help!
					</Text>
					<Stack direction="row" gap="3" wrap justify="center">
						<Button variant="primary" href="https://github.com/yourusername/sv-project-helper/discussions">
							Ask a Question
						</Button>
						<Button variant="ghost" href="https://github.com/yourusername/sv-project-helper/issues">
							Report an Issue
						</Button>
						<Button variant="ghost" href="https://discord.gg/yourserver">
							Join Discord
						</Button>
					</Stack>
				</Stack>
			</Card>
		</section>
	</div>
</Container>

<style>
	.docs-page {
		padding: 2rem 0 4rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.docs-header {
		text-align: center;
		padding: 2rem 0;
	}

	.install-steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	:global(.install-card) {
		position: relative;
		transition: transform 0.2s ease;
	}

	:global(.install-card:hover) {
		transform: translateY(-2px);
	}

	.code-block {
		position: relative;
		background: var(--color-neutral-900);
		color: var(--color-neutral-100);
		padding: 1rem;
		border-radius: var(--radius-md);
		font-family: var(--font-family-mono, 'Monaco', 'Courier New', monospace);
		overflow-x: auto;
	}

	.code-block pre {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.copy-btn {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		color: var(--color-neutral-300);
		padding: 0.5rem;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.sections-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	:global(.section-card) {
		height: 100%;
		transition: transform 0.2s ease;
	}

	:global(.section-card:hover) {
		transform: translateY(-2px);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	:global(.help-card) {
		text-align: center;
		padding: 3rem 2rem;
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05));
	}

	@media (max-width: 768px) {
		.docs-page {
			padding: 1rem 0 2rem;
		}

		.install-steps {
			grid-template-columns: 1fr;
		}

		.sections-grid {
			grid-template-columns: 1fr;
		}

		:global(.help-card) {
			padding: 2rem 1rem;
		}
	}
</style>