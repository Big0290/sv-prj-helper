<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link,
		DataTable, SimpleTable, TreeView, Timeline, StatsCard, Badge, Avatar, Rating, Carousel, VirtualList
	} from '$lib/ui';
	import '../../../lib/styles/theme.css';

	let ratingValue = $state(3.5);

	const tableData = [
		{ id: 1, name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
		{ id: 2, name: 'Bob Smith', role: 'Designer', status: 'Active' },
		{ id: 3, name: 'Carol White', role: 'Manager', status: 'Away' }
	];

	const tableColumns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status' }
	];

	const treeData = [
		{
			id: '1',
			label: 'src',
			children: [
				{
					id: '1-1',
					label: 'components',
					children: [
						{ id: '1-1-1', label: 'Button.svelte' },
						{ id: '1-1-2', label: 'Input.svelte' },
						{ id: '1-1-3', label: 'Modal.svelte' }
					]
				},
				{ 
					id: '1-2', 
					label: 'routes', 
					children: [
						{ id: '1-2-1', label: '+page.svelte' },
						{ id: '1-2-2', label: '+layout.svelte' }
					] 
				}
			]
		},
		{ id: '2', label: 'package.json' },
		{ id: '3', label: 'README.md' }
	];

	const timelineItems = [
		{ id: '1', title: 'Account created', description: 'Welcome to the platform', timestamp: '2024-01-15T10:30:00' },
		{ id: '2', title: 'Profile updated', description: 'Added profile picture', timestamp: '2024-01-16T14:20:00', variant: 'success' as const },
		{ id: '3', title: 'First post', description: 'Shared your first project', timestamp: '2024-01-17T09:45:00', variant: 'info' as const },
		{ id: '4', title: 'Milestone reached', description: '100 followers achieved!', timestamp: '2024-01-18T16:00:00', variant: 'success' as const }
	];

	const carouselItems = [
		{ 
			id: '1', 
			image: 'https://picsum.photos/800/400?random=1',
			title: 'Slide 1',
			description: 'Beautiful landscape',
			content: () => {}
		},
		{ 
			id: '2', 
			image: 'https://picsum.photos/800/400?random=2',
			title: 'Slide 2',
			description: 'City skyline',
			content: () => {}
		},
		{ 
			id: '3', 
			image: 'https://picsum.photos/800/400?random=3',
			title: 'Slide 3',
			description: 'Nature scene',
			content: () => {}
		}
	];

	const virtualListItems = Array.from({ length: 10000 }, (_, i) => ({
		id: i,
		title: `Item ${i + 1}`,
		description: `Description for item ${i + 1}`
	}));
</script>

<div class="data-display-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1400px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Data Display</Heading>
				<Text color="var(--text-secondary)">Components for displaying data</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- Tables -->
		<section class="demo-section">
			<Heading as="h2" size="3">DataTable</Heading>
			<Text>Advanced data table with sorting and selection - click column headers to sort</Text>
			
			<DataTable rows={tableData} columns={tableColumns} selectable={true} />

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<section class="demo-section">
			<Heading as="h2" size="3">SimpleTable</Heading>
			<Text>Basic table display with striped, hoverable, and compact variants</Text>
			
			<SimpleTable rows={tableData} columns={tableColumns} striped={true} hoverable={true} />

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Stats Cards -->
		<section class="demo-section">
			<Heading as="h2" size="3">StatsCard</Heading>
			<Text>Statistical data display with trend indicators and variant styles</Text>
			
			<div class="stats-grid">
				<StatsCard 
					label="Total Users" 
					value="12,345" 
					trend={12.5}
					variant="success"
				/>
				<StatsCard 
					label="Revenue" 
					value="$45,678" 
					trend={8.2}
					variant="default"
				/>
				<StatsCard 
					label="Active Sessions" 
					value="1,234" 
					trend={-3.1}
					variant="warning"
				/>
				<StatsCard 
					label="Errors" 
					value="23" 
					trend={-45}
					variant="danger"
				/>
			</div>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- TreeView -->
		<section class="demo-section">
			<Heading as="h2" size="3">TreeView</Heading>
			<Text>Hierarchical tree structure for file systems or nested data</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<TreeView nodes={treeData} onNodeClick={(node) => console.log('Clicked:', node.label)} />
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Timeline -->
		<section class="demo-section">
			<Heading as="h2" size="3">Timeline</Heading>
			<Text>Chronological event timeline with variants and position options</Text>
			
			<Timeline 
				items={timelineItems} 
				variant="default"
				position="left"
				showLine={true}
				showTime={true}
				timeFormat="relative"
			/>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Badge & Avatar -->
		<section class="demo-section">
			<Heading as="h2" size="3">Badge & Avatar</Heading>
			<Text>User identifiers and status badges with multiple variants and sizes</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Badges</Heading>
					<Flex direction="column" gap={12}>
						<Flex gap={8} wrap="wrap" align="center">
							<Badge variant="default">Default</Badge>
							<Badge variant="success">Success</Badge>
							<Badge variant="warning">Warning</Badge>
							<Badge variant="error">Error</Badge>
							<Badge variant="info">Info</Badge>
						</Flex>
						<Flex gap={8} wrap="wrap" align="center">
							<Badge size="sm">Small</Badge>
							<Badge size="md">Medium</Badge>
							<Badge size="lg">Large</Badge>
						</Flex>
					</Flex>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Avatars</Heading>
					<Flex direction="column" gap={16}>
						<Flex gap={12} wrap="wrap" align="center">
							<Avatar initials="AJ" size="sm" />
							<Avatar initials="BS" size="md" />
							<Avatar initials="CW" size="lg" />
							<Avatar initials="DX" size="xl" />
						</Flex>
						<Flex gap={12} wrap="wrap" align="center">
							<Avatar initials="ON" status="online" size="md" />
							<Avatar initials="AW" status="away" size="md" />
							<Avatar initials="BY" status="busy" size="md" />
							<Avatar initials="OF" status="offline" size="md" />
						</Flex>
					</Flex>
				</Box>
			</div>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					&lt;Badge variant="default|success|warning|error|info" size="sm|md|lg"&gt;Text&lt;/Badge&gt; | &lt;Avatar initials="AB" src="..." size="sm|md|lg|xl" status="online|away|busy|offline" /&gt;
				</Text>
			</Box>
		</section>

		<!-- Rating -->
		<section class="demo-section">
			<Heading as="h2" size="3">Rating</Heading>
			<Text>Star rating display and input with multiple sizes</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={20}>
					<div>
						<Text weight="medium" style="margin-bottom: 8px;">Interactive rating</Text>
						<Rating bind:value={ratingValue} size="md" showValue={false} />
						<Text size="sm" color="var(--text-secondary)" style="margin-top: 8px;">
							Current rating: {ratingValue.toFixed(1)} / 5
						</Text>
					</div>
					<div>
						<Text weight="medium" style="margin-bottom: 8px;">Read-only rating with value display</Text>
						<Rating value={4.5} readonly={true} showValue={true} />
					</div>
					<div>
						<Text weight="medium" style="margin-bottom: 8px;">Different sizes</Text>
						<Flex gap={16} align="center">
							<Rating value={5} readonly={true} size="sm" />
							<Rating value={4} readonly={true} size="md" />
							<Rating value={3} readonly={true} size="lg" />
						</Flex>
					</div>
				</Flex>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Carousel -->
		<section class="demo-section">
			<Heading as="h2" size="3">Carousel</Heading>
			<Text>Image carousel slider with autoplay, dots, and arrow navigation</Text>
			
			<Carousel 
				items={carouselItems} 
				autoPlay={true} 
				interval={4000}
				showDots={true}
				showArrows={true}
				loop={true}
				aspectRatio="16/9"
			/>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Virtual List -->
		<section class="demo-section">
			<Heading as="h2" size="3">VirtualList</Heading>
			<Text>Virtualized list for large datasets - efficiently renders 10,000+ items</Text>
			
			<Box 
				padding="0" 
				bg="var(--glass-bg)" 
				borderRadius="8px" 
				style="overflow: hidden;"
			>
				<VirtualList items={virtualListItems} itemHeight={60} height={400}>
					{#snippet item(listItem)}
						<div style="padding: 16px; border-bottom: 1px solid var(--border-color); background: var(--glass-bg);">
							<Text weight="medium">{listItem.title}</Text>
							<Text size="sm" color="var(--text-secondary)">{listItem.description}</Text>
						</div>
					{/snippet}
				</VirtualList>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>
	</div>
</div>

<style>
	.data-display-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.1));
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

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		margin: 24px 0;
	}

	@media (max-width: 768px) {
		.demo-grid,
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
