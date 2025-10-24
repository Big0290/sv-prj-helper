<script lang="ts">
	import { Heading, Text, Box, Flex, Link, ThemeProvider, useTheme, Button, Card } from '$lib/ui';
	import { Input, Badge } from '$lib/ui';
	import '../../../lib/styles/theme.css';

	const { theme, setTheme } = useTheme();

	const themes = [
		{ name: 'Light', value: 'light', bg: '#ffffff', fg: '#000000' },
		{ name: 'Dark', value: 'dark', bg: '#1a1a1a', fg: '#ffffff' },
		{ name: 'Purple', value: 'purple', bg: '#6b21a8', fg: '#faf5ff' },
		{ name: 'Blue', value: 'blue', bg: '#1e40af', fg: '#dbeafe' }
	];

	const colorVars = [
		{ name: 'Primary', var: '--color-primary' },
		{ name: 'Secondary', var: '--color-secondary' },
		{ name: 'Success', var: '--color-success' },
		{ name: 'Warning', var: '--color-warning' },
		{ name: 'Error', var: '--color-error' },
		{ name: 'Info', var: '--color-info' }
	];
</script>

<ThemeProvider>
	<div class="theme-demo">
		<header class="page-header">
			<Flex justify="space-between" align="center" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
				<div>
					<Heading as="h1">Theme</Heading>
					<Text color="var(--text-secondary)">Theme customization and dark mode</Text>
				</div>
				<Link href="/demos">← Back to Demos</Link>
			</Flex>
		</header>

		<div class="demo-container">
			<!-- Theme Switcher -->
			<section class="demo-section">
				<Heading as="h2" size="3">ThemeProvider</Heading>
				<Text>Global theme management with dark mode support and localStorage persistence</Text>
				
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Flex direction="column" gap={20}>
						<div>
							<Text weight="medium" style="margin-bottom: 12px;">
								Current Theme: {$theme}
							</Text>
							<Flex gap={12} wrap="wrap">
								{#each themes as t}
									<Button 
										variant={$theme === t.value ? 'primary' : 'ghost'}
										onclick={() => setTheme(t.value)}
									>
										{t.name}
									</Button>
								{/each}
							</Flex>
						</div>

						<div>
							<Text size="sm" color="var(--text-secondary)">
								The theme is persisted in localStorage and automatically applied on page load
							</Text>
						</div>
					</Flex>
				</Box>

				<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
					<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					</Text>
				</Box>
			</section>

			<!-- Color System -->
			<section class="demo-section">
				<Heading as="h2" size="3">Color System</Heading>
				<Text>CSS custom properties for theming</Text>
				
				<div class="color-grid">
					{#each colorVars as { name, var: cssVar }}
						<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
							<Flex direction="column" gap={12} align="center">
								<div 
									class="color-swatch"
									style="background: var({cssVar});"
								></div>
								<Text weight="medium">{name}</Text>
								<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
									{cssVar}
								</Text>
							</Flex>
						</Box>
					{/each}
				</div>
			</section>

			<!-- Component Examples -->
			<section class="demo-section">
				<Heading as="h2" size="3">Themed Components</Heading>
				<Text>See how components adapt to the current theme</Text>
				
				<Flex direction="column" gap={20}>
					<!-- Buttons -->
					<Card>
						<Heading as="h4" size="5" style="margin-bottom: 16px;">Buttons</Heading>
						<Flex gap={12} wrap="wrap">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="danger">Danger</Button>
						</Flex>
					</Card>

					<!-- Badges -->
					<Card>
						<Heading as="h4" size="5" style="margin-bottom: 16px;">Badges</Heading>
						<Flex gap={8} wrap="wrap">
							<Badge variant="primary">Primary</Badge>
							<Badge variant="success">Success</Badge>
							<Badge variant="warning">Warning</Badge>
							<Badge variant="error">Error</Badge>
							<Badge variant="info">Info</Badge>
						</Flex>
					</Card>

					<!-- Form Controls -->
					<Card>
						<Heading as="h4" size="5" style="margin-bottom: 16px;">Form Controls</Heading>
						<Flex direction="column" gap={12}>
							<Input placeholder="Input field" />
							<Input value="Filled input" />
							<Input disabled placeholder="Disabled input" />
						</Flex>
					</Card>

					<!-- Cards -->
					<div class="demo-grid">
						<Card>
							<Heading as="h5" size="6">Card 1</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Cards adapt to theme automatically
							</Text>
						</Card>
						<Card hoverable>
							<Heading as="h5" size="6">Card 2</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Hover states adjust accordingly
							</Text>
						</Card>
						<Card variant="bordered">
							<Heading as="h5" size="6">Card 3</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Borders use theme colors
							</Text>
						</Card>
					</div>
				</Flex>
			</section>

			<!-- Typography -->
			<section class="demo-section">
				<Heading as="h2" size="3">Typography</Heading>
				<Text>Text colors adapt to theme</Text>
				
				<Card>
					<Flex direction="column" gap={16}>
						<Heading as="h1">Heading 1</Heading>
						<Heading as="h2">Heading 2</Heading>
						<Heading as="h3">Heading 3</Heading>
						<Text>Regular body text with proper contrast</Text>
						<Text color="var(--text-secondary)">
							Secondary text for less emphasis
						</Text>
						<Text size="sm" color="var(--text-secondary)">
							Small secondary text
						</Text>
					</Flex>
				</Card>
			</section>

			<!-- Custom Theme -->
			<section class="demo-section">
				<Heading as="h2" size="3">Custom Theming</Heading>
				<Text>Override CSS variables to create custom themes</Text>
				
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Flex direction="column" gap={16}>
						<Text size="sm" style="font-family: monospace;">
							:root &#123;<br />
							&nbsp;&nbsp;--color-primary: #your-color;<br />
							&nbsp;&nbsp;--bg-primary: #your-bg;<br />
							&nbsp;&nbsp;--text-primary: #your-text;<br />
						</Text>
						<Text size="sm" color="var(--text-secondary)">
							All components will automatically use your custom values
						</Text>
					</Flex>
				</Box>
			</section>
		</div>
	</div>
</ThemeProvider>

<style>
	.theme-demo {
		min-height: 100vh;
		background: var(--bg-primary);
		transition: background-color 0.3s ease;
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(79, 70, 229, 0.1));
		border-bottom: 1px solid var(--border-color);
		margin-bottom: 40px;
	}

	.demo-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px 80px;
	}

	.demo-section {
		margin-bottom: 60px;
	}

	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 20px;
		margin: 24px 0;
	}

	.color-swatch {
		width: 80px;
		height: 80px;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		margin: 24px 0;
	}

	@media (max-width: 768px) {
		.color-grid,
		.demo-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
