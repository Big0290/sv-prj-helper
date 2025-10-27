import type { CodeExample } from './types.js';

export interface ComponentExampleCategory {
	name: string;
	description: string;
	examples: ComponentExample[];
}

export interface ComponentExample {
	id: string;
	title: string;
	description: string;
	component: string;
	category: 'atoms' | 'molecules' | 'organisms' | 'layouts';
	tags: string[];
	code: string;
	language: 'svelte' | 'typescript' | 'javascript';
	complexity: 'basic' | 'intermediate' | 'advanced';
	useCase: string;
	dependencies?: string[];
}

export const componentExamples: ComponentExample[] = [
	// Button Examples
	{
		id: 'button-basic',
		title: 'Basic Button',
		description: 'Simple button with different variants and sizes',
		component: 'Button',
		category: 'atoms',
		tags: ['button', 'basic', 'variants'],
		code: `<script lang="ts">
	import { Button } from '$lib/ui';
</script>

<div class="button-examples">
	<Button variant="primary">Primary Button</Button>
	<Button variant="secondary">Secondary Button</Button>
	<Button variant="ghost">Ghost Button</Button>
	<Button variant="danger">Danger Button</Button>
</div>

<style>
	.button-examples {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
</style>`,
		language: 'svelte',
		complexity: 'basic',
		useCase: 'Use for primary actions, form submissions, and navigation'
	},
	{
		id: 'button-sizes',
		title: 'Button Sizes',
		description: 'Buttons in different sizes for various contexts',
		component: 'Button',
		category: 'atoms',
		tags: ['button', 'sizes', 'responsive'],
		code: `<script lang="ts">
	import { Button } from '$lib/ui';
</script>

<div class="size-examples">
	<Button size="sm">Small</Button>
	<Button size="md">Medium</Button>
	<Button size="lg">Large</Button>
</div>

<style>
	.size-examples {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
</style>`,
		language: 'svelte',
		complexity: 'basic',
		useCase: 'Adapt button size to context - small for inline actions, large for primary CTAs'
	},
	{
		id: 'button-states',
		title: 'Button States',
		description: 'Loading, disabled, and interactive button states',
		component: 'Button',
		category: 'atoms',
		tags: ['button', 'states', 'loading', 'disabled'],
		code: `<script lang="ts">
	import { Button } from '$lib/ui';
	
	let loading = $state(false);
	
	async function handleAsyncAction() {
		loading = true;
		// Simulate async operation
		await new Promise(resolve => setTimeout(resolve, 2000));
		loading = false;
	}
</script>

<div class="state-examples">
	<Button onclick={handleAsyncAction} {loading}>
		{loading ? 'Processing...' : 'Submit Form'}
	</Button>
	<Button disabled>Disabled Button</Button>
	<Button variant="primary" loading>Loading State</Button>
</div>

<style>
	.state-examples {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
</style>`,
		language: 'svelte',
		complexity: 'intermediate',
		useCase: 'Handle form submissions, async operations, and disabled states'
	},

	// Card Examples
	{
		id: 'card-basic',
		title: 'Basic Card',
		description: 'Simple card layout with header, content, and actions',
		component: 'Card',
		category: 'molecules',
		tags: ['card', 'layout', 'content'],
		code: `<script lang="ts">
	import { Card, Heading, Text, Button, Stack } from '$lib/ui';
</script>

<Card>
	<Stack gap="4">
		<div>
			<Heading as="h3" size="4">Card Title</Heading>
			<Text color="var(--text-secondary)">
				This is a basic card component that can contain any content.
			</Text>
		</div>
		
		<div class="card-actions">
			<Button variant="primary" size="sm">Primary Action</Button>
			<Button variant="ghost" size="sm">Secondary</Button>
		</div>
	</Stack>
</Card>

<style>
	.card-actions {
		display: flex;
		gap: 0.5rem;
	}
</style>`,
		language: 'svelte',
		complexity: 'basic',
		useCase: 'Display grouped content, product cards, user profiles, or feature highlights'
	},
	{
		id: 'card-stats',
		title: 'Stats Card',
		description: 'Card displaying key metrics and statistics',
		component: 'Card',
		category: 'molecules',
		tags: ['card', 'stats', 'metrics', 'dashboard'],
		code: `<script lang="ts">
	import { Card, Heading, Text, Stack, Badge } from '$lib/ui';
</script>

<div class="stats-grid">
	<Card class="stat-card">
		<Stack gap="2">
			<div class="stat-header">
				<Text size="sm" color="var(--text-secondary)">Total Users</Text>
				<Badge variant="success" size="sm">+12%</Badge>
			</div>
			<Heading as="h3" size="2">24,567</Heading>
			<Text size="sm" color="var(--text-secondary)">
				vs 21,890 last month
			</Text>
		</Stack>
	</Card>
	
	<Card class="stat-card">
		<Stack gap="2">
			<div class="stat-header">
				<Text size="sm" color="var(--text-secondary)">Revenue</Text>
				<Badge variant="info" size="sm">+8%</Badge>
			</div>
			<Heading as="h3" size="2">$45,231</Heading>
			<Text size="sm" color="var(--text-secondary)">
				vs $41,890 last month
			</Text>
		</Stack>
	</Card>
</div>

<style>
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}
	
	.stat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>`,
		language: 'svelte',
		complexity: 'intermediate',
		useCase: 'Dashboard metrics, KPI displays, analytics summaries'
	},

	// Form Examples
	{
		id: 'form-basic',
		title: 'Basic Form',
		description: 'Complete form with validation and submission',
		component: 'Input',
		category: 'atoms',
		tags: ['form', 'input', 'validation', 'submit'],
		code: `<script lang="ts">
	import { Input, Button, Stack, Card, Heading, Text } from '$lib/ui';
	
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});
	
	let errors = $state<Record<string, string>>({});
	let submitting = $state(false);
	
	function validateForm() {
		const newErrors: Record<string, string> = {};
		
		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
		}
		
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email';
		}
		
		if (!formData.message.trim()) {
			newErrors.message = 'Message is required';
		}
		
		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}
	
	async function handleSubmit() {
		if (!validateForm()) return;
		
		submitting = true;
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000));
		submitting = false;
		
		// Reset form
		formData = { name: '', email: '', message: '' };
		alert('Form submitted successfully!');
	}
</script>

<Card>
	<Stack gap="4">
		<div>
			<Heading as="h3" size="4">Contact Form</Heading>
			<Text color="var(--text-secondary)">
				Send us a message and we'll get back to you.
			</Text>
		</div>
		
		<form onsubmit|preventDefault={handleSubmit}>
			<Stack gap="3">
				<div>
					<Input
						bind:value={formData.name}
						placeholder="Your name"
						error={errors.name}
						required
					/>
				</div>
				
				<div>
					<Input
						bind:value={formData.email}
						type="email"
						placeholder="your.email@example.com"
						error={errors.email}
						required
					/>
				</div>
				
				<div>
					<textarea
						bind:value={formData.message}
						placeholder="Your message..."
						rows="4"
						class="message-input"
						class:error={errors.message}
					></textarea>
					{#if errors.message}
						<Text size="sm" color="var(--color-error)">
							{errors.message}
						</Text>
					{/if}
				</div>
				
				<Button 
					type="submit" 
					variant="primary"
					loading={submitting}
					disabled={submitting}
				>
					{submitting ? 'Sending...' : 'Send Message'}
				</Button>
			</Stack>
		</form>
	</Stack>
</Card>

<style>
	.message-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-primary);
		color: var(--text-primary);
		font-family: inherit;
		font-size: 0.875rem;
		resize: vertical;
		transition: border-color 0.2s ease;
	}
	
	.message-input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px var(--color-primary-light);
	}
	
	.message-input.error {
		border-color: var(--color-error);
	}
</style>`,
		language: 'svelte',
		complexity: 'advanced',
		useCase: 'Contact forms, user registration, feedback collection'
	},

	// Navigation Examples
	{
		id: 'navigation-menu',
		title: 'Navigation Menu',
		description: 'Responsive navigation with dropdown menus',
		component: 'Menu',
		category: 'molecules',
		tags: ['navigation', 'menu', 'responsive', 'dropdown'],
		code: `<script lang="ts">
	import { Menu, MenuItem, Button, Stack } from '$lib/ui';
	
	let activeItem = $state('home');
	
	function handleNavigation(item: string) {
		activeItem = item;
		console.log('Navigating to:', item);
	}
</script>

<nav class="main-nav">
	<div class="nav-brand">
		<h2>Brand</h2>
	</div>
	
	<Menu>
		<MenuItem 
			active={activeItem === 'home'}
			onclick={() => handleNavigation('home')}
		>
			Home
		</MenuItem>
		<MenuItem 
			active={activeItem === 'products'}
			onclick={() => handleNavigation('products')}
		>
			Products
		</MenuItem>
		<MenuItem 
			active={activeItem === 'about'}
			onclick={() => handleNavigation('about')}
		>
			About
		</MenuItem>
		<MenuItem 
			active={activeItem === 'contact'}
			onclick={() => handleNavigation('contact')}
		>
			Contact
		</MenuItem>
	</Menu>
	
	<div class="nav-actions">
		<Button variant="ghost" size="sm">Sign In</Button>
		<Button variant="primary" size="sm">Sign Up</Button>
	</div>
</nav>

<style>
	.main-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border-bottom: 1px solid var(--border-color);
	}
	
	.nav-brand h2 {
		margin: 0;
		color: var(--color-primary);
		font-size: 1.5rem;
	}
	
	.nav-actions {
		display: flex;
		gap: 0.5rem;
	}
	
	@media (max-width: 768px) {
		.main-nav {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>`,
		language: 'svelte',
		complexity: 'intermediate',
		useCase: 'Website navigation, app headers, menu systems'
	},

	// Dashboard Layout
	{
		id: 'dashboard-layout',
		title: 'Dashboard Layout',
		description: 'Complete dashboard with sidebar, header, and content areas',
		component: 'Container',
		category: 'layouts',
		tags: ['dashboard', 'layout', 'sidebar', 'responsive'],
		code: `<script lang="ts">
	import { Container, Card, Stack, Heading, Text, Button, Badge } from '$lib/ui';
	
	let sidebarOpen = $state(true);
	
	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
</script>

<div class="dashboard">
	<!-- Sidebar -->
	<aside class="sidebar" class:open={sidebarOpen}>
		<div class="sidebar-header">
			<Heading as="h3" size="5">Dashboard</Heading>
		</div>
		
		<nav class="sidebar-nav">
			<a href="#" class="nav-item active">
				<span class="nav-icon">📊</span>
				Overview
			</a>
			<a href="#" class="nav-item">
				<span class="nav-icon">👥</span>
				Users
			</a>
			<a href="#" class="nav-item">
				<span class="nav-icon">📈</span>
				Analytics
			</a>
			<a href="#" class="nav-item">
				<span class="nav-icon">⚙️</span>
				Settings
			</a>
		</nav>
	</aside>
	
	<!-- Main Content -->
	<main class="main-content">
		<!-- Header -->
		<header class="content-header">
			<div class="header-left">
				<Button variant="ghost" size="sm" onclick={toggleSidebar}>
					☰
				</Button>
				<Heading as="h1" size="3">Overview</Heading>
			</div>
			
			<div class="header-right">
				<Badge variant="info">3 notifications</Badge>
				<Button variant="ghost" size="sm">Profile</Button>
			</div>
		</header>
		
		<!-- Content -->
		<div class="content-body">
			<Container maxWidth="xl">
				<Stack gap="6">
					<!-- Stats Cards -->
					<div class="stats-grid">
						<Card>
							<Stack gap="2">
								<Text size="sm" color="var(--text-secondary)">Total Revenue</Text>
								<Heading as="h3" size="2">$45,231</Heading>
								<Badge variant="success" size="sm">+20.1%</Badge>
							</Stack>
						</Card>
						
						<Card>
							<Stack gap="2">
								<Text size="sm" color="var(--text-secondary)">Active Users</Text>
								<Heading as="h3" size="2">2,350</Heading>
								<Badge variant="info" size="sm">+180</Badge>
							</Stack>
						</Card>
						
						<Card>
							<Stack gap="2">
								<Text size="sm" color="var(--text-secondary)">Orders</Text>
								<Heading as="h3" size="2">1,234</Heading>
								<Badge variant="warning" size="sm">-5%</Badge>
							</Stack>
						</Card>
					</div>
					
					<!-- Main Content Card -->
					<Card>
						<Stack gap="4">
							<Heading as="h2" size="4">Recent Activity</Heading>
							<div class="activity-list">
								<div class="activity-item">
									<Text>New user registered: john@example.com</Text>
									<Text size="sm" color="var(--text-secondary)">2 minutes ago</Text>
								</div>
								<div class="activity-item">
									<Text>Order #1234 completed</Text>
									<Text size="sm" color="var(--text-secondary)">5 minutes ago</Text>
								</div>
								<div class="activity-item">
									<Text>Payment received: $299.00</Text>
									<Text size="sm" color="var(--text-secondary)">10 minutes ago</Text>
								</div>
							</div>
						</Stack>
					</Card>
				</Stack>
			</Container>
		</div>
	</main>
</div>

<style>
	.dashboard {
		display: flex;
		min-height: 100vh;
		background: var(--bg-primary);
	}
	
	.sidebar {
		width: 250px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border-right: 1px solid var(--border-color);
		transform: translateX(-100%);
		transition: transform 0.3s ease;
	}
	
	.sidebar.open {
		transform: translateX(0);
	}
	
	.sidebar-header {
		padding: 1.5rem;
		border-bottom: 1px solid var(--border-color);
	}
	
	.sidebar-nav {
		padding: 1rem 0;
	}
	
	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem;
		color: var(--text-secondary);
		text-decoration: none;
		transition: all 0.2s ease;
	}
	
	.nav-item:hover,
	.nav-item.active {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}
	
	.nav-item.active {
		border-right: 3px solid var(--color-primary);
	}
	
	.nav-icon {
		font-size: 1.2rem;
	}
	
	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	
	.content-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border-bottom: 1px solid var(--border-color);
	}
	
	.header-left,
	.header-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.content-body {
		flex: 1;
		padding: 2rem;
		overflow-y: auto;
	}
	
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
	}
	
	.activity-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.activity-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: var(--bg-secondary);
		border-radius: var(--radius-md);
	}
	
	@media (max-width: 768px) {
		.sidebar {
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			z-index: 1000;
		}
		
		.content-header {
			padding: 1rem;
		}
		
		.content-body {
			padding: 1rem;
		}
		
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>`,
		language: 'svelte',
		complexity: 'advanced',
		useCase: 'Admin dashboards, analytics interfaces, management systems'
	}
];

export const exampleCategories: ComponentExampleCategory[] = [
	{
		name: 'Getting Started',
		description: 'Basic examples to get you started with the component library',
		examples: componentExamples.filter(ex => ex.complexity === 'basic')
	},
	{
		name: 'Forms & Inputs',
		description: 'Form components, validation, and user input handling',
		examples: componentExamples.filter(ex => ex.tags.includes('form') || ex.tags.includes('input'))
	},
	{
		name: 'Navigation',
		description: 'Navigation patterns, menus, and routing examples',
		examples: componentExamples.filter(ex => ex.tags.includes('navigation') || ex.tags.includes('menu'))
	},
	{
		name: 'Layouts & Dashboards',
		description: 'Complex layouts, dashboard patterns, and responsive designs',
		examples: componentExamples.filter(ex => ex.tags.includes('dashboard') || ex.tags.includes('layout'))
	},
	{
		name: 'Advanced Patterns',
		description: 'Complex use cases and advanced component combinations',
		examples: componentExamples.filter(ex => ex.complexity === 'advanced')
	}
];

// Search and filter utilities
export function searchExamples(query: string, examples: ComponentExample[] = componentExamples): ComponentExample[] {
	if (!query.trim()) return examples;
	
	const searchTerm = query.toLowerCase();
	
	return examples.filter(example => 
		example.title.toLowerCase().includes(searchTerm) ||
		example.description.toLowerCase().includes(searchTerm) ||
		example.component.toLowerCase().includes(searchTerm) ||
		example.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
		example.useCase.toLowerCase().includes(searchTerm)
	);
}

export function filterExamplesByCategory(category: string, examples: ComponentExample[] = componentExamples): ComponentExample[] {
	if (category === 'all') return examples;
	return examples.filter(example => example.category === category);
}

export function filterExamplesByComplexity(complexity: string, examples: ComponentExample[] = componentExamples): ComponentExample[] {
	if (complexity === 'all') return examples;
	return examples.filter(example => example.complexity === complexity);
}

export function filterExamplesByComponent(component: string, examples: ComponentExample[] = componentExamples): ComponentExample[] {
	if (component === 'all') return examples;
	return examples.filter(example => example.component === component);
}