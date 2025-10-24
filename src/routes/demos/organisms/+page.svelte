<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link,
		Chat, DataTable, Navbar, CommandPalette, Tabs, Stepper, Timeline,
		ImageGallery, FileUpload, Drawer, Sidebar, Button
	} from '$lib/ui';
	import '../../../lib/styles/theme.css';

	// State
	let commandPaletteOpen = $state(false);
	let drawerOpen = $state(false);
	let sidebarOpen = $state(false);
	let activeTab = $state('tab1');
	let currentStep = $state(0);

	// Command palette commands
	const commands = [
		{ id: '1', label: 'New File', description: 'Create a new file', category: 'File', action: () => console.log('New file') },
		{ id: '2', label: 'Open', description: 'Open existing file', category: 'File', action: () => console.log('Open') },
		{ id: '3', label: 'Search', description: 'Search in project', category: 'Edit', action: () => console.log('Search') },
		{ id: '4', label: 'Settings', description: 'Open settings', category: 'View', action: () => console.log('Settings') }
	];

	const tableData = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
	];

	const tableColumns = [
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'role', label: 'Role' }
	];

	const tabs = [
		{ id: 'tab1', label: 'Overview' },
		{ id: 'tab2', label: 'Details' },
		{ id: 'tab3', label: 'Settings' }
	];

	const steps = [
		{ label: 'Account', description: 'Create your account' },
		{ label: 'Profile', description: 'Setup your profile' },
		{ label: 'Preferences', description: 'Set preferences' },
		{ label: 'Complete', description: 'All done!' }
	];

	const timelineItems = [
		{ title: 'Project started', description: 'Initial commit', timestamp: '2h ago' },
		{ title: 'First milestone', description: 'Completed core features', timestamp: '1h ago' },
		{ title: 'Beta release', description: 'Released to testers', timestamp: '30m ago' }
	];

	const galleryImages = [
		{ src: 'https://picsum.photos/400/300?random=1', alt: 'Image 1' },
		{ src: 'https://picsum.photos/400/300?random=2', alt: 'Image 2' },
		{ src: 'https://picsum.photos/400/300?random=3', alt: 'Image 3' }
	];
</script>

<div class="organisms-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1400px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Organisms</Heading>
				<Text color="var(--text-secondary)">Complex composed components</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- Navbar -->
		<section class="demo-section">
			<Heading as="h2" size="3">Navbar</Heading>
			<Text>Navigation bar with branding and actions</Text>
			
			<Box padding="0" bg="var(--glass-bg)" borderRadius="8px" style="overflow: hidden;">
				<Navbar>
					<Flex justify="space-between" align="center" style="width: 100%;">
						<Heading as="h3" size="4">My App</Heading>
						<Flex gap={12}>
							<Button size="sm" variant="ghost">Home</Button>
							<Button size="sm" variant="ghost">About</Button>
							<Button size="sm" variant="primary">Sign In</Button>
						</Flex>
					</Flex>
				</Navbar>
			</Box>
		</section>

		<!-- Tabs -->
		<section class="demo-section">
			<Heading as="h2" size="3">Tabs</Heading>
			<Text>Tabbed interface for content organization</Text>
			
			<Tabs bind:activeTab={activeTab} {tabs}>
				{#if activeTab === 'tab1'}
					<Box padding="24px">
						<Text>Overview content goes here</Text>
					</Box>
				{:else if activeTab === 'tab2'}
					<Box padding="24px">
						<Text>Details content goes here</Text>
					</Box>
				{:else}
					<Box padding="24px">
						<Text>Settings content goes here</Text>
					</Box>
				{/if}
			</Tabs>
		</section>

		<!-- DataTable -->
		<section class="demo-section">
			<Heading as="h2" size="3">DataTable</Heading>
			<Text>Advanced table with sorting and selection</Text>
			
			<DataTable rows={tableData} columns={tableColumns} selectable />
		</section>

		<!-- Stepper -->
		<section class="demo-section">
			<Heading as="h2" size="3">Stepper</Heading>
			<Text>Step-by-step wizard interface</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Stepper {steps} bind:currentStep={currentStep} />
				<Flex gap={12} justify="end" style="margin-top: 24px;">
					<Button 
						variant="ghost" 
						disabled={currentStep === 0}
						onclick={() => currentStep--}
					>
						Previous
					</Button>
					<Button 
						variant="primary"
						disabled={currentStep === steps.length - 1}
						onclick={() => currentStep++}
					>
						Next
					</Button>
				</Flex>
			</Box>
		</section>

		<!-- Timeline -->
		<section class="demo-section">
			<Heading as="h2" size="3">Timeline</Heading>
			<Text>Chronological event display</Text>
			
			<Timeline items={timelineItems} />
		</section>

		<!-- CommandPalette -->
		<section class="demo-section">
			<Heading as="h2" size="3">CommandPalette</Heading>
			<Text>Quick action search interface</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Button onclick={() => commandPaletteOpen = true}>
					Open Command Palette (⌘K)
				</Button>
			</Box>

			<CommandPalette bind:isOpen={commandPaletteOpen} {commands} />
		</section>

		<!-- Chat -->
		<section class="demo-section">
			<Heading as="h2" size="3">Chat</Heading>
			<Text>Full-featured messaging interface</Text>
			
			<Box 
				padding="0" 
				bg="var(--glass-bg)" 
				borderRadius="8px" 
				style="overflow: hidden; height: 500px;"
			>
				<Chat />
			</Box>
		</section>

		<!-- Sidebar & Drawer -->
		<section class="demo-section">
			<Heading as="h2" size="3">Sidebar & Drawer</Heading>
			<Text>Side navigation panels</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Sidebar</Heading>
					<Button onclick={() => sidebarOpen = true}>Open Sidebar</Button>
					<Sidebar bind:isOpen={sidebarOpen}>
						<Flex direction="column" gap={12} style="padding: 16px;">
							<Heading as="h5" size="6">Sidebar Menu</Heading>
							<Text>Navigation items go here</Text>
							<Button onclick={() => sidebarOpen = false}>Close</Button>
						</Flex>
					</Sidebar>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Drawer</Heading>
					<Button onclick={() => drawerOpen = true}>Open Drawer</Button>
					<Drawer bind:isOpen={drawerOpen} title="Drawer Menu">
						<Flex direction="column" gap={12}>
							<Text>Drawer content goes here</Text>
							<Button onclick={() => drawerOpen = false}>Close</Button>
						</Flex>
					</Drawer>
				</Box>
			</div>
		</section>

		<!-- ImageGallery -->
		<section class="demo-section">
			<Heading as="h2" size="3">ImageGallery</Heading>
			<Text>Interactive photo gallery with lightbox</Text>
			
			<ImageGallery images={galleryImages} />
		</section>

		<!-- FileUpload -->
		<section class="demo-section">
			<Heading as="h2" size="3">FileUpload</Heading>
			<Text>Drag-and-drop file uploader</Text>
			
			<FileUpload 
				accept="image/*"
				maxSize={5 * 1024 * 1024}
				onupload={(files) => console.log('Uploaded:', files)}
			/>
		</section>
	</div>
</div>

<style>
	.organisms-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1));
		border-bottom: 1px solid var(--border-color);
		margin-bottom: 40px;
	}

	.demo-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 20px 80px;
	}

	.demo-section {
		margin-bottom: 60px;
	}

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		margin: 24px 0;
	}

	@media (max-width: 768px) {
		.demo-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
