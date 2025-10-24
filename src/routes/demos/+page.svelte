<script lang="ts">
	import { Heading, Text, Box, Flex, Link } from '$lib/ui';
	import '../../lib/styles/theme.css';

	interface CategoryLink {
		title: string;
		description: string;
		href: string;
		count: number;
		color: string;
	}

	const categories: CategoryLink[] = [
		{
			title: 'Atoms',
			description: 'Core primitives: Box, Flex, Text, Heading, Label, Link, Code, Chip, Icon, Image',
			href: '/demos/atoms',
			count: 10,
			color: '#a855f7'
		},
		{
			title: 'Molecules',
			description: 'Simple composed components: Card, Button, Input, Menu, Accordion, Select, etc.',
			href: '/demos/molecules',
			count: 40,
			color: '#3b82f6'
		},
		{
			title: 'Organisms',
			description: 'Complex components: Chat, DataTable, Navbar, Sidebar, CommandPalette, etc.',
			href: '/demos/organisms',
			count: 25,
			color: '#10b981'
		},
		{
			title: 'Layouts',
			description: 'Layout templates: Container, Grid, Stack, AppLayout, DashboardLayout',
			href: '/demos/layouts',
			count: 6,
			color: '#f59e0b'
		},
		{
			title: 'Forms',
			description: 'Form controls: Input, Select, Checkbox, Radio, DatePicker, FileUpload, etc.',
			href: '/demos/forms',
			count: 22,
			color: '#ef4444'
		},
		{
			title: 'Navigation',
			description: 'Navigation components: Navbar, Sidebar, Tabs, Breadcrumb, Pagination, Menu',
			href: '/demos/navigation',
			count: 9,
			color: '#8b5cf6'
		},
		{
			title: 'Feedback',
			description: 'Feedback components: Alert, Toast, Modal, Progress, Spinner, Loading, etc.',
			href: '/demos/feedback',
			count: 11,
			color: '#ec4899'
		},
		{
			title: 'Data Display',
			description: 'Data components: Table, Timeline, Carousel, TreeView, Gallery, Stats',
			href: '/demos/data-display',
			count: 16,
			color: '#06b6d4'
		},
		{
			title: 'Media',
			description: 'Media components: Video, Audio, Webcam, ImageCropper, BarcodeScanner',
			href: '/demos/media',
			count: 12,
			color: '#f97316'
		},
		{
			title: 'Utility',
			description: 'Utility components: Portal, ScrollArea, FocusTrap, VisuallyHidden, etc.',
			href: '/demos/utility',
			count: 7,
			color: '#84cc16'
		},
		{
			title: 'Hooks',
			description: 'React-like hooks: useTheme, useMediaQuery, useLocalStorage, useToast, useDialog',
			href: '/demos/hooks',
			count: 5,
			color: '#14b8a6'
		},
		{
			title: 'Theme',
			description: 'Theme system: ThemeProvider, CSS variables, color schemes',
			href: '/demos/theme',
			count: 1,
			color: '#6366f1'
		}
	];
</script>

<div class="demo-index">
	<header class="hero">
		<Heading as="h1">UI Component Library</Heading>
		<Text size="lg" color="var(--text-secondary)">
			Comprehensive Svelte 5 component library with 150+ components
		</Text>
		<Flex gap={16} justify="center" style="margin-top: 24px;">
			<a href="/demos/atoms" class="cta-button primary">Get Started</a>
			<a href="https://github.com/yourusername/ui-lib" class="cta-button secondary">GitHub</a>
		</Flex>
	</header>

	<section class="categories">
		<div class="category-grid">
			{#each categories as category}
				<a href={category.href} class="category-card" style:--accent={category.color}>
					<Box padding="24px" class="card-inner">
						<Flex direction="column" gap={12}>
							<Flex justify="space-between" align="center">
								<Heading as="h3" size="4">{category.title}</Heading>
								<span class="count-badge">{category.count}</span>
							</Flex>
							<Text size="sm" color="var(--text-secondary)">
								{category.description}
							</Text>
							<Flex align="center" gap={8} style="margin-top: 8px;">
								<Text size="sm" weight="medium" color="var(--accent)">
									View demos →
								</Text>
							</Flex>
						</Flex>
					</Box>
				</a>
			{/each}
		</div>
	</section>

	<section class="features">
		<Heading as="h2" align="center">Features</Heading>
		<div class="features-grid">
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="12px">
				<Heading as="h4" size="5">🎨 Modern Design</Heading>
				<Text size="sm" color="var(--text-secondary)">
					Beautiful glassmorphism with purple/blue tints
				</Text>
			</Box>
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="12px">
				<Heading as="h4" size="5">♿ Accessible</Heading>
				<Text size="sm" color="var(--text-secondary)">
					ARIA attributes and keyboard navigation
				</Text>
			</Box>
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="12px">
				<Heading as="h4" size="5">🔧 Composable</Heading>
				<Text size="sm" color="var(--text-secondary)">
					Build complex UIs with simple primitives
				</Text>
			</Box>
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="12px">
				<Heading as="h4" size="5">⚡ Svelte 5</Heading>
				<Text size="sm" color="var(--text-secondary)">
					Built with runes and modern TypeScript
				</Text>
			</Box>
		</div>
	</section>
</div>

<style>
	.demo-index {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.hero {
		text-align: center;
		padding: 80px 20px 60px;
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
		border-bottom: 1px solid var(--border-color);
	}

	.cta-button {
		padding: 12px 32px;
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s;
		font-size: 16px;
	}

	.cta-button.primary {
		background: var(--color-primary);
		color: white;
	}

	.cta-button.secondary {
		background: var(--glass-bg);
		color: var(--text-primary);
		border: 1px solid var(--glass-border);
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.categories {
		padding: 60px 20px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.category-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 24px;
	}

	.category-card {
		display: block;
		text-decoration: none;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: 12px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.category-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	.category-card:hover::before {
		transform: scaleX(1);
	}

	.category-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-xl);
		border-color: var(--accent);
	}

	.count-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 32px;
		height: 32px;
		padding: 0 10px;
		background: color-mix(in srgb, var(--accent) 15%, transparent);
		color: var(--accent);
		border-radius: 16px;
		font-size: 14px;
		font-weight: 600;
	}

	.features {
		padding: 60px 20px 80px;
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 24px;
		margin-top: 40px;
	}

	@media (max-width: 768px) {
		.category-grid {
			grid-template-columns: 1fr;
		}
		
		.hero {
			padding: 60px 20px 40px;
		}
	}
</style>
