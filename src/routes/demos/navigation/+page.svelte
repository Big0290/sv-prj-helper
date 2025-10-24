<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link, Button,
		Breadcrumbs, Pagination, Tabs, Navbar, BottomNavigation, Sidebar
	} from '$lib/ui';
	import '../../../lib/styles/theme.css';

	let currentPage = $state(1);
	let activeTab = $state('home');
	let sidebarOpen = $state(false);

	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Demos', href: '/demos' },
		{ label: 'Navigation', href: '/demos/navigation' }
	];

	const tabs = [
		{ id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ id: 'explore', label: 'Explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
		{ id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
		{ id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
	];
</script>

<div class="navigation-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Navigation</Heading>
				<Text color="var(--text-secondary)">Navigation and routing components</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- Breadcrumbs -->
		<section class="demo-section">
			<Heading as="h2" size="3">Breadcrumbs</Heading>
			<Text>Hierarchical navigation trail</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Breadcrumbs items={breadcrumbItems} />
			</Box>
		</section>

		<!-- Navbar -->
		<section class="demo-section">
			<Heading as="h2" size="3">Navbar</Heading>
			<Text>Top navigation bar</Text>
			
			<Box padding="0" bg="var(--glass-bg)" borderRadius="8px" style="overflow: hidden;">
				<Navbar title="My Application" />
			</Box>
		</section>

		<!-- Tabs -->
		<section class="demo-section">
			<Heading as="h2" size="3">Tabs</Heading>
			<Text>Tabbed navigation interface</Text>
			
			<Tabs bind:activeTab={activeTab} {tabs}>
				<Box padding="24px">
					{#if activeTab === 'home'}
						<Heading as="h4" size="5">Home Content</Heading>
						<Text>Welcome to the home tab</Text>
					{:else if activeTab === 'explore'}
						<Heading as="h4" size="5">Explore Content</Heading>
						<Text>Discover new things here</Text>
					{:else if activeTab === 'notifications'}
						<Heading as="h4" size="5">Notifications</Heading>
						<Text>No new notifications</Text>
					{:else}
						<Heading as="h4" size="5">Profile</Heading>
						<Text>Your profile information</Text>
					{/if}
				</Box>
			</Tabs>
		</section>

		<!-- Pagination -->
		<section class="demo-section">
			<Heading as="h2" size="3">Pagination</Heading>
			<Text>Page navigation controls</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={16} align="center">
					<Pagination 
						bind:currentPage={currentPage}
						totalPages={10}
					/>
					<Text size="sm" color="var(--text-secondary)">
						Current page: {currentPage} of 10
					</Text>
				</Flex>
			</Box>
		</section>

		<!-- Sidebar -->
		<section class="demo-section">
			<Heading as="h2" size="3">Sidebar</Heading>
			<Text>Slide-out side navigation panel</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Button onclick={() => sidebarOpen = true}>Open Sidebar</Button>
				<Sidebar bind:isOpen={sidebarOpen}>
					<Flex direction="column" gap={12} style="padding: 16px;">
						<Heading as="h4" size="5">Navigation Menu</Heading>
						<Link href="#">Dashboard</Link>
						<Link href="#">Projects</Link>
						<Link href="#">Settings</Link>
						<Button onclick={() => sidebarOpen = false}>Close</Button>
					</Flex>
				</Sidebar>
			</Box>
		</section>

		<!-- Bottom Navigation -->
		<section class="demo-section">
			<Heading as="h2" size="3">BottomNavigation</Heading>
			<Text>Mobile-friendly bottom nav bar</Text>
			
			<Box 
				padding="0" 
				bg="var(--glass-bg)" 
				borderRadius="8px" 
				style="overflow: hidden; position: relative; height: 70px;"
			>
				<BottomNavigation bind:activeTab={activeTab} {tabs} />
			</Box>
		</section>
	</div>
</div>

<style>
	.navigation-demo {
		min-height: 100vh;
		background: var(--bg-primary);
		padding-bottom: 100px;
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
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
</style>
