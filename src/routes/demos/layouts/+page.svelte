<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link,
		Grid, Container, Stack, Divider, Card
	} from '$lib/ui';
	import '../../../lib/styles/theme.css';
</script>

<div class="layouts-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Layouts</Heading>
				<Text color="var(--text-secondary)">Layout and spacing components</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- Container -->
		<section class="demo-section">
			<Heading as="h2" size="3">Container</Heading>
			<Text>Content wrapper with max-width constraints - sm, md, lg, xl sizes available</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Container size="sm">
					<Text>Small container (max-width: 640px)</Text>
				</Container>
			</Box>
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 12px;">
				<Container size="md">
					<Text>Medium container (max-width: 768px)</Text>
				</Container>
			</Box>
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 12px;">
				<Container size="lg">
					<Text>Large container (max-width: 1024px)</Text>
				</Container>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					&lt;Container size="sm|md|lg|xl"&gt;...&lt;/Container&gt;
				</Text>
			</Box>
		</section>

		<!-- Box (from UI library) -->
		<section class="demo-section">
			<Heading as="h2" size="3">Box</Heading>
			<Text>Flexible container with customizable padding and styling</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Text>Default box with padding</Text>
				</Box>
				<Box padding="32px" bg="rgba(59, 130, 246, 0.1)" borderRadius="12px">
					<Text>Custom styled box</Text>
				</Box>
			</div>
		</section>

		<!-- Flex (from UI library) -->
		<section class="demo-section">
			<Heading as="h2" size="3">Flex</Heading>
			<Text>Flexbox layout utilities</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={16}>
					<div>
						<Text size="sm" weight="medium" style="margin-bottom: 8px;">Horizontal (space-between)</Text>
						<Flex justify="space-between" gap={8}>
							<Box padding="16px" bg="rgba(59, 130, 246, 0.2)" borderRadius="4px">
								<Text size="sm">Item 1</Text>
							</Box>
							<Box padding="16px" bg="rgba(59, 130, 246, 0.2)" borderRadius="4px">
								<Text size="sm">Item 2</Text>
							</Box>
							<Box padding="16px" bg="rgba(59, 130, 246, 0.2)" borderRadius="4px">
								<Text size="sm">Item 3</Text>
							</Box>
						</Flex>
					</div>

					<div>
						<Text size="sm" weight="medium" style="margin-bottom: 8px;">Centered</Text>
						<Flex justify="center" align="center" style="min-height: 100px;">
							<Box padding="16px" bg="rgba(16, 185, 129, 0.2)" borderRadius="4px">
								<Text size="sm">Centered Item</Text>
							</Box>
						</Flex>
					</div>

					<div>
						<Text size="sm" weight="medium" style="margin-bottom: 8px;">Wrap</Text>
						<Flex wrap="wrap" gap={8}>
							{#each Array(8) as _, i}
								<Box padding="12px 16px" bg="rgba(236, 72, 153, 0.2)" borderRadius="4px">
									<Text size="sm">Item {i + 1}</Text>
								</Box>
							{/each}
						</Flex>
					</div>
				</Flex>
			</Box>
		</section>

		<!-- Grid -->
		<section class="demo-section">
			<Heading as="h2" size="3">Grid</Heading>
			<Text>CSS Grid layout system with customizable columns and gap</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Grid columns={3} gap={16}>
					{#each Array(6) as _, i}
						<Card>
							<Text>Grid Item {i + 1}</Text>
						</Card>
					{/each}
				</Grid>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Stack -->
		<section class="demo-section">
			<Heading as="h2" size="3">Stack</Heading>
			<Text>Vertical spacing utility for consistent gaps between children</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Stack spacing={16}>
					<Card>
						<Text>Stack Item 1</Text>
					</Card>
					<Card>
						<Text>Stack Item 2</Text>
					</Card>
					<Card>
						<Text>Stack Item 3</Text>
					</Card>
				</Stack>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Divider -->
		<section class="demo-section">
			<Heading as="h2" size="3">Divider</Heading>
			<Text>Visual content separator with horizontal and vertical orientations</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={16}>
					<Text>Section 1</Text>
					<Divider />
					<Text>Section 2</Text>
					<Divider orientation="horizontal" />
					<Text>Section 3</Text>
				</Flex>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					&lt;Divider orientation="horizontal|vertical" spacing="sm|md|lg" /&gt;
				</Text>
			</Box>
		</section>

		<!-- Responsive Example -->
		<section class="demo-section">
			<Heading as="h2" size="3">Responsive Layout</Heading>
			<Text>Combining layout components for responsive design</Text>
			
			<Container size="xl">
				<Grid columns={3} gap={20}>
					<Card>
						<Stack spacing={12}>
							<Heading as="h4" size="5">Card 1</Heading>
							<Text size="sm" color="var(--text-secondary)">
								This demonstrates responsive grid layout
							</Text>
						</Stack>
					</Card>
					<Card>
						<Stack spacing={12}>
							<Heading as="h4" size="5">Card 2</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Automatically adjusts to screen size
							</Text>
						</Stack>
					</Card>
					<Card>
						<Stack spacing={12}>
							<Heading as="h4" size="5">Card 3</Heading>
							<Text size="sm" color="var(--text-secondary)">
								Mobile-friendly by default
							</Text>
						</Stack>
					</Card>
				</Grid>
			</Container>
		</section>
	</div>
</div>

<style>
	.layouts-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
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

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		margin: 24px 0;
	}

	@media (max-width: 768px) {
		.demo-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
