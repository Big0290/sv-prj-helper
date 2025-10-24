<script lang="ts">
	import { onMount } from 'svelte';
	import '../lib/styles/theme.css';
	import {
		Button, Container, Stack, Grid, Heading, Text, Card, Badge, Divider,
		Avatar, Link, Box, Flex
	} from '$lib/ui';

	let stats = $state({
		components: 150,
		downloads: '12.5k',
		stars: 847,
		contributors: 12
	});

	let features = [
		{
			icon: '🎨',
			title: 'Modern Design System',
			description: 'Beautiful glassmorphism design with purple/blue gradients and consistent spacing.'
		},
		{
			icon: '♿',
			title: 'Accessibility First',
			description: 'WCAG 2.1 AA compliant with ARIA labels, keyboard navigation, and screen reader support.'
		},
		{
			icon: '⚡',
			title: 'Svelte 5 Native',
			description: 'Built with the latest Svelte 5 features including runes, snippets, and modern TypeScript.'
		},
		{
			icon: '🧩',
			title: 'Atomic Design',
			description: 'Organized component hierarchy from atoms to organisms for maximum composability.'
		},
		{
			icon: '🔧',
			title: 'Developer Experience',
			description: 'Full TypeScript support, comprehensive documentation, and intuitive API design.'
		},
		{
			icon: '📱',
			title: 'Responsive Ready',
			description: 'Mobile-first approach with responsive components that work across all devices.'
		}
	];

	let ecosystems = [
		{ name: 'Chat System', count: 15, color: '#10b981' },
		{ name: 'Data Tables', count: 12, color: '#3b82f6' },
		{ name: 'Video Player', count: 8, color: '#f59e0b' },
		{ name: 'Barcode Tools', count: 6, color: '#ef4444' },
		{ name: 'Form Controls', count: 22, color: '#8b5cf6' },
		{ name: 'Navigation', count: 9, color: '#06b6d4' }
	];

	let testimonials = [
		{
			name: 'Sarah Chen',
			role: 'Frontend Developer',
			company: 'TechCorp',
			avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
			quote: 'This component library saved us months of development time. The glassmorphism design is stunning!'
		},
		{
			name: 'Mike Rodriguez',
			role: 'UI/UX Designer',
			company: 'DesignStudio',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
			quote: 'Perfect balance of aesthetics and functionality. The accessibility features are top-notch.'
		},
		{
			name: 'Emily Johnson',
			role: 'Product Manager',
			company: 'StartupXYZ',
			avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
			quote: 'Our team productivity increased significantly after adopting this library. Highly recommended!'
		}
	];

	onMount(() => {
		// Animate stats on load
		const animateStats = () => {
			stats.components = 150;
			stats.downloads = '12.5k';
			stats.stars = 847;
			stats.contributors = 12;
		};
		setTimeout(animateStats, 500);
	});
</script>

<svelte:head>
	<title>SV Project Helper - Modern Svelte 5 UI Library</title>
	<meta name="description" content="A comprehensive Svelte 5 component library with glassmorphism design, 150+ components, and accessibility-first approach." />
</svelte:head>

<main class="landing-page">
	<!-- Hero Section -->
	<section class="hero">
		<Container maxWidth="xl">
			<div class="hero-content">
				<div class="hero-text">
					<Badge variant="info" size="sm">✨ Svelte 5 Ready</Badge>
					<Heading as="h1" size="1" class="hero-title">
						Build Beautiful UIs with
						<span class="gradient-text">SV Project Helper</span>
					</Heading>
					<Text size="xl" color="var(--text-secondary)" class="hero-description">
						A comprehensive Svelte 5 component library featuring 150+ components with glassmorphism design, 
						accessibility-first approach, and atomic design principles.
					</Text>
					
					<div class="hero-actions">
						<Button variant="primary" size="lg" href="/demos">
							Explore Components
						</Button>
						<Button variant="ghost" size="lg" href="https://github.com/yourusername/sv-project-helper">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
							View on GitHub
						</Button>
					</div>

					<div class="hero-stats">
						<div class="stat">
							<Text size="2xl" weight="bold" color="var(--color-primary)">{stats.components}+</Text>
							<Text size="sm" color="var(--text-secondary)">Components</Text>
						</div>
						<div class="stat">
							<Text size="2xl" weight="bold" color="var(--color-primary)">{stats.downloads}</Text>
							<Text size="sm" color="var(--text-secondary)">Downloads</Text>
						</div>
						<div class="stat">
							<Text size="2xl" weight="bold" color="var(--color-primary)">{stats.stars}</Text>
							<Text size="sm" color="var(--text-secondary)">GitHub Stars</Text>
						</div>
						<div class="stat">
							<Text size="2xl" weight="bold" color="var(--color-primary)">{stats.contributors}</Text>
							<Text size="sm" color="var(--text-secondary)">Contributors</Text>
						</div>
					</div>
				</div>

				<div class="hero-visual">
					<div class="component-preview">
						<Card class="preview-card">
							<Stack gap="4">
								<Flex justify="space-between" align="center">
									<Heading as="h3" size="4">Component Preview</Heading>
									<Badge variant="success">Live</Badge>
								</Flex>
								<Stack gap="3">
									<Button variant="primary">Primary Button</Button>
									<Button variant="secondary">Secondary Button</Button>
									<div class="input-demo">
										<label for="demo-email">Email Address</label>
										<input id="demo-email" type="email" placeholder="Enter your email" class="demo-input" />
									</div>
								</Stack>
							</Stack>
						</Card>
					</div>
				</div>
			</div>
		</Container>
	</section>

	<!-- Features Section -->
	<section class="features">
		<Container maxWidth="xl">
			<div class="section-header">
				<Heading as="h2" size="2" align="center">Why Choose SV Project Helper?</Heading>
				<Text size="lg" color="var(--text-secondary)" align="center">
					Built for modern web development with developer experience in mind
				</Text>
			</div>

			<Grid cols="3" gap="6" class="features-grid">
				{#each features as feature}
					<Card class="feature-card">
						<Stack gap="4">
							<div class="feature-icon">{feature.icon}</div>
							<Heading as="h3" size="5">{feature.title}</Heading>
							<Text color="var(--text-secondary)">{feature.description}</Text>
						</Stack>
					</Card>
				{/each}
			</Grid>
		</Container>
	</section>

	<!-- Ecosystems Section -->
	<section class="ecosystems">
		<Container maxWidth="xl">
			<div class="section-header">
				<Heading as="h2" size="2" align="center">Complete Component Ecosystems</Heading>
				<Text size="lg" color="var(--text-secondary)" align="center">
					Pre-built component systems for common use cases
				</Text>
			</div>

			<Grid cols="3" gap="4" class="ecosystems-grid">
				{#each ecosystems as ecosystem}
					<Card class="ecosystem-card" style="--accent-color: {ecosystem.color}">
						<Flex justify="space-between" align="center">
							<div>
								<Heading as="h4" size="5">{ecosystem.name}</Heading>
								<Text size="sm" color="var(--text-secondary)">{ecosystem.count} components</Text>
							</div>
							<div class="ecosystem-count" style="background: {ecosystem.color}20; color: {ecosystem.color}">
								{ecosystem.count}
							</div>
						</Flex>
					</Card>
				{/each}
			</Grid>

			<div class="ecosystems-cta">
				<Button variant="primary" size="lg" href="/demos">
					Explore All Components →
				</Button>
			</div>
		</Container>
	</section>

	<!-- Code Example Section -->
	<section class="code-example">
		<Container maxWidth="xl">
			<Grid cols="2" gap="8" align="center">
				<div>
					<Heading as="h2" size="2">Simple. Powerful. TypeScript.</Heading>
					<Text size="lg" color="var(--text-secondary)" style="margin: 1.5rem 0;">
						Get started in minutes with our intuitive API and comprehensive TypeScript support.
					</Text>
					<Stack gap="3">
						<div class="feature-point">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
							<Text>Full TypeScript support with exported types</Text>
						</div>
						<div class="feature-point">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
							<Text>Tree-shakeable imports for optimal bundle size</Text>
						</div>
						<div class="feature-point">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
							<Text>Consistent API across all components</Text>
						</div>
					</Stack>
				</div>

				<Card class="code-card">
					<pre><code>{`<script lang="ts">
  import { Button, Card, Input } from '@sv-prj-helper/ui';
  
  let email = $state('');
  let loading = $state(false);
  
  async function handleSubmit() {
    loading = true;
    // Your logic here
    loading = false;
  }
</script>

<Card>
  <form onsubmit={handleSubmit}>
    <Input 
      bind:value={email}
      type="email"
      label="Email Address"
      placeholder="Enter your email"
      required
    />
    <Button 
      type="submit" 
      variant="primary" 
      {loading}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </Button>
  </form>
</Card>`}</code></pre>
				</Card>
			</Grid>
		</Container>
	</section>

	<!-- Testimonials Section -->
	<section class="testimonials">
		<Container maxWidth="xl">
			<div class="section-header">
				<Heading as="h2" size="2" align="center">Loved by Developers</Heading>
				<Text size="lg" color="var(--text-secondary)" align="center">
					See what developers are saying about SV Project Helper
				</Text>
			</div>

			<Grid cols="3" gap="6" class="testimonials-grid">
				{#each testimonials as testimonial}
					<Card class="testimonial-card">
						<Stack gap="4">
							<Text style="font-style: italic;">"{testimonial.quote}"</Text>
							<Flex gap="3" align="center">
								<Avatar src={testimonial.avatar} name={testimonial.name} size="md" />
								<div>
									<Text weight="medium">{testimonial.name}</Text>
									<Text size="sm" color="var(--text-secondary)">{testimonial.role} at {testimonial.company}</Text>
								</div>
							</Flex>
						</Stack>
					</Card>
				{/each}
			</Grid>
		</Container>
	</section>

	<!-- CTA Section -->
	<section class="cta">
		<Container maxWidth="lg">
			<Card class="cta-card">
				<Stack gap="6" align="center" class="cta-content">
					<div class="cta-text">
						<Heading as="h2" size="2" align="center">Ready to Build Something Amazing?</Heading>
						<Text size="lg" color="var(--text-secondary)" align="center">
							Join thousands of developers building beautiful UIs with SV Project Helper
						</Text>
					</div>
					
					<Stack direction="row" gap="4" wrap justify="center">
						<Button variant="primary" size="lg" href="/demos">
							Get Started Now
						</Button>
						<Button variant="ghost" size="lg" href="https://github.com/yourusername/sv-project-helper">
							View Documentation
						</Button>
					</Stack>

					<Text size="sm" color="var(--text-secondary)" align="center">
						MIT Licensed • Free and Open Source • No Vendor Lock-in
					</Text>
				</Stack>
			</Card>
		</Container>
	</section>

	<!-- Footer -->
	<footer class="footer">
		<Container maxWidth="xl">
			<Grid cols="4" gap="8" class="footer-content">
				<div>
					<Heading as="h4" size="5">SV Project Helper</Heading>
					<Text size="sm" color="var(--text-secondary)" style="margin: 1rem 0;">
						Modern Svelte 5 component library with glassmorphism design and accessibility-first approach.
					</Text>
					<div class="social-links">
						<Link href="https://github.com/yourusername/sv-project-helper" external>GitHub</Link>
						<Link href="https://twitter.com/yourhandle" external>Twitter</Link>
						<Link href="https://discord.gg/yourserver" external>Discord</Link>
					</div>
				</div>

				<div>
					<Heading as="h5" size="6">Documentation</Heading>
					<Stack gap="2" class="footer-links">
						<Link href="/demos">Components</Link>
						<Link href="/docs/getting-started">Getting Started</Link>
						<Link href="/docs/theming">Theming</Link>
						<Link href="/docs/accessibility">Accessibility</Link>
					</Stack>
				</div>

				<div>
					<Heading as="h5" size="6">Community</Heading>
					<Stack gap="2" class="footer-links">
						<Link href="https://github.com/yourusername/sv-project-helper/discussions" external>Discussions</Link>
						<Link href="https://github.com/yourusername/sv-project-helper/issues" external>Issues</Link>
						<Link href="/contributing">Contributing</Link>
						<Link href="/changelog">Changelog</Link>
					</Stack>
				</div>

				<div>
					<Heading as="h5" size="6">Resources</Heading>
					<Stack gap="2" class="footer-links">
						<Link href="/examples">Examples</Link>
						<Link href="/templates">Templates</Link>
						<Link href="/blog">Blog</Link>
						<Link href="/support">Support</Link>
					</Stack>
				</div>
			</Grid>

			<Divider style="margin: 2rem 0;" />

			<Flex justify="space-between" align="center" wrap class="footer-bottom">
				<Text size="sm" color="var(--text-secondary)">
					© 2024 SV Project Helper. MIT Licensed.
				</Text>
				<Text size="sm" color="var(--text-secondary)">
					Built with ❤️ using Svelte 5
				</Text>
			</Flex>
		</Container>
	</footer>
</main>

<style>
	.landing-page {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	/* Hero Section */
	.hero {
		padding: 4rem 0 6rem;
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
		border-bottom: 1px solid var(--border-color);
	}

	.hero-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		min-height: 600px;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.hero-title {
		line-height: 1.1;
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-description {
		line-height: 1.6;
		max-width: 90%;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.hero-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border-color);
	}

	.stat {
		text-align: center;
	}

	.hero-visual {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.component-preview {
		position: relative;
		transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);
		transition: transform 0.3s ease;
	}

	.component-preview:hover {
		transform: perspective(1000px) rotateY(-10deg) rotateX(2deg);
	}

	.preview-card {
		width: 320px;
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.demo-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--glass-bg);
		color: var(--text-primary);
		font-size: 0.875rem;
	}

	.demo-input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
	}

	/* Sections */
	.features, .ecosystems, .code-example, .testimonials {
		padding: 6rem 0;
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.features-grid {
		margin-top: 4rem;
	}

	.feature-card {
		text-align: center;
		transition: transform 0.2s ease;
	}

	.feature-card:hover {
		transform: translateY(-4px);
	}

	.feature-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	/* Ecosystems */
	.ecosystems {
		background: var(--glass-bg);
		border-top: 1px solid var(--border-color);
		border-bottom: 1px solid var(--border-color);
	}

	.ecosystem-card {
		transition: all 0.2s ease;
		border-left: 4px solid var(--accent-color);
	}

	.ecosystem-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.ecosystem-count {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 0.875rem;
	}

	.ecosystems-cta {
		text-align: center;
		margin-top: 3rem;
	}

	/* Code Example */
	.code-card {
		background: var(--color-neutral-900);
		color: var(--color-neutral-100);
		overflow: hidden;
	}

	.code-card pre {
		margin: 0;
		padding: 2rem;
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.code-card code {
		color: inherit;
		background: none;
	}

	.feature-point {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.feature-point svg {
		color: var(--color-success);
		flex-shrink: 0;
	}

	/* Testimonials */
	.testimonial-card {
		height: 100%;
	}

	/* CTA */
	.cta {
		padding: 6rem 0;
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05));
	}

	.cta-card {
		text-align: center;
		padding: 4rem 2rem;
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	/* Footer */
	.footer {
		padding: 4rem 0 2rem;
		background: var(--color-neutral-900);
		color: var(--color-neutral-100);
	}

	.footer-content {
		margin-bottom: 2rem;
	}

	.footer-links {
		margin-top: 1rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.footer-bottom {
		gap: 1rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-content {
			grid-template-columns: 1fr;
			gap: 3rem;
			text-align: center;
		}

		.hero-stats {
			grid-template-columns: repeat(2, 1fr);
		}

		.features-grid,
		.ecosystems-grid,
		.testimonials-grid {
			grid-template-columns: 1fr;
		}

		.code-example .grid {
			grid-template-columns: 1fr;
		}

		.footer-content {
			grid-template-columns: repeat(2, 1fr);
		}

		.component-preview {
			transform: none;
		}

		.hero {
			padding: 2rem 0 4rem;
		}

		.features, .ecosystems, .code-example, .testimonials {
			padding: 4rem 0;
		}
	}

	@media (max-width: 480px) {
		.hero-stats {
			grid-template-columns: 1fr;
		}

		.footer-content {
			grid-template-columns: 1fr;
		}

		.hero-actions {
			flex-direction: column;
		}

		.cta-card {
			padding: 2rem 1rem;
		}
	}
</style>