<script lang="ts">
	import EnhancedPlayground from '$lib/components/docs/EnhancedPlayground.svelte';
	import ThemeToggle from '$lib/components/docs/ThemeToggle.svelte';
	import ResponsiveControls from '$lib/components/docs/ResponsiveControls.svelte';
	import ThemeProvider from '$lib/components/theme/ThemeProvider/ThemeProvider.svelte';
	import { Stack, Heading, Text, Card } from '$lib/components';
	import type { PropDefinition, CodeExample } from '$lib/docs/types.js';

	// Example component props for demonstration
	const buttonProps: PropDefinition[] = [
		{
			name: 'variant',
			type: "'primary' | 'secondary' | 'ghost' | 'danger'",
			defaultValue: 'primary',
			required: false,
			description: 'Visual style variant of the button'
		},
		{
			name: 'size',
			type: "'sm' | 'md' | 'lg'",
			defaultValue: 'md',
			required: false,
			description: 'Size of the button affecting padding and font size'
		},
		{
			name: 'disabled',
			type: 'boolean',
			defaultValue: 'false',
			required: false,
			description: 'Whether the button is disabled and non-interactive'
		},
		{
			name: 'loading',
			type: 'boolean',
			defaultValue: 'false',
			required: false,
			description: 'Shows loading spinner and disables interaction'
		}
	];

	const buttonExamples: CodeExample[] = [
		{
			title: 'Basic Button',
			description: 'Simple button with default styling',
			code: '<Button>Click me</Button>',
			language: 'svelte',
			category: 'basic'
		},
		{
			title: 'Button Variants',
			description: 'Different visual styles',
			code: '<Button variant="primary">Primary</Button>',
			language: 'svelte',
			category: 'variants'
		},
		{
			title: 'Interactive Button',
			description: 'Button with click handler',
			code: '<Button onclick={handleClick}>Click me</Button>',
			language: 'svelte',
			category: 'interactive'
		}
	];

	let theme = $state<'light' | 'dark' | 'system'>('system');
</script>

<svelte:head>
	<title>Interactive Playground - SV Project Helper UI</title>
	<meta name="description" content="Interactive component playground with theme switching and responsive controls" />
</svelte:head>

<ThemeProvider bind:theme>
	<div class="playground-page">
		<div class="page-header">
			<Stack gap="6">
				<div class="header-content">
					<Heading as="h1" size="8">Interactive Playground</Heading>
					<Text size="lg" color="var(--text-secondary)">
						Experience components with live prop controls, theme switching, and responsive testing
					</Text>
				</div>

				<div class="header-controls">
					<Card class="controls-card">
						<Stack gap="4">
							<Heading as="h3" size="5">Playground Controls</Heading>
							
							<div class="control-group">
								<Text size="sm" weight="medium">Theme:</Text>
								<ThemeToggle showLabel={true} />
							</div>
							
							<div class="control-group">
								<Text size="sm" weight="medium">Responsive Testing:</Text>
								<ResponsiveControls showLabels={true} />
							</div>
						</Stack>
					</Card>
				</div>
			</Stack>
		</div>

		<div class="playground-section">
			<Stack gap="8">
				<div class="section-header">
					<Heading as="h2" size="6">Button Component Playground</Heading>
					<Text color="var(--text-secondary)">
						Interact with props, switch themes, and test responsive behavior
					</Text>
				</div>

				<EnhancedPlayground
					componentName="Button"
					props={buttonProps}
					examples={buttonExamples}
					showThemeToggle={true}
					showResponsiveControls={true}
				/>
			</Stack>
		</div>

		<div class="features-section">
			<Stack gap="6">
				<Heading as="h2" size="6">Playground Features</Heading>
				
				<div class="features-grid">
					<Card class="feature-card">
						<Stack gap="3">
							<div class="feature-icon">🎨</div>
							<Heading as="h3" size="5">Theme Switching</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Test components in light, dark, and system themes with smooth transitions
							</Text>
						</Stack>
					</Card>

					<Card class="feature-card">
						<Stack gap="3">
							<div class="feature-icon">📱</div>
							<Heading as="h3" size="5">Responsive Testing</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Preview components across mobile, tablet, and desktop viewports
							</Text>
						</Stack>
					</Card>

					<Card class="feature-card">
						<Stack gap="3">
							<div class="feature-icon">⚙️</div>
							<Heading as="h3" size="5">Live Props Control</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Dynamically adjust component props and see changes in real-time
							</Text>
						</Stack>
					</Card>

					<Card class="feature-card">
						<Stack gap="3">
							<div class="feature-icon">💻</div>
							<Heading as="h3" size="5">Code Generation</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Generated code updates automatically based on your prop selections
							</Text>
						</Stack>
					</Card>

					<Card class="feature-card">
						<Stack gap="3">
							<div class="feature-icon">📋</div>
							<Heading as="h3" size="5">Copy & Export</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Copy code to clipboard or export examples as Svelte files
							</Text>
						</Stack>
					</Card>

					<Card class="feature-card">
						<Stack gap="3">
							<div class="feature-icon">♿</div>
							<Heading as="h3" size="5">Accessibility Testing</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Built-in accessibility features with keyboard navigation support
							</Text>
						</Stack>
					</Card>
				</div>
			</Stack>
		</div>
	</div>
</ThemeProvider>

<style>
	.playground-page {
		min-height: 100vh;
		background: var(--bg-primary);
		padding: 2rem;
		transition: background var(--transition-base);
	}

	.page-header {
		max-width: 1200px;
		margin: 0 auto 3rem;
	}

	.header-content {
		text-align: center;
	}

	.header-controls {
		display: flex;
		justify-content: center;
	}

	.controls-card {
		max-width: 400px;
		width: 100%;
	}

	.control-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
	}

	.playground-section {
		max-width: 1400px;
		margin: 0 auto 4rem;
	}

	.section-header {
		text-align: center;
	}

	.features-section {
		max-width: 1200px;
		margin: 0 auto;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.feature-card {
		text-align: center;
		padding: 2rem;
		transition: transform var(--transition-base);
	}

	.feature-card:hover {
		transform: translateY(-4px);
	}

	.feature-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	@media (max-width: 768px) {
		.playground-page {
			padding: 1rem;
		}

		.control-group {
			flex-direction: column;
			gap: 0.5rem;
			align-items: flex-start;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}

		.feature-card {
			padding: 1.5rem;
		}
	}
</style>