<script lang="ts">
	import { 
		Box, Flex, Text, Heading, Label, Link, Code, Chip, Icon, Image,
		Menu, MenuItem,
		ScrollArea, FocusTrap, VisuallyHidden,
		ThemeProvider,
		useMediaQuery, useLocalStorage, useDialog
	} from '$lib/ui';

	const mobile = useMediaQuery('(max-width: 768px)');
	const storage = useLocalStorage('demo-count', 0);
	const dialog = useDialog();

	function incrementCount() {
		storage.value++;
	}
</script>

<ThemeProvider>
	<div class="demo-container">
		<Heading as="h1">New UI Components Demo</Heading>
		
		<!-- Box & Flex -->
		<section>
			<Heading as="h2" size="2">Layout Primitives</Heading>
			<Box padding="20px" bg="var(--glass-bg)" borderRadius="12px">
				<Flex direction="column" gap={16}>
					<Text weight="semibold">Box with Flex layout</Text>
					<Flex gap={8} align="center">
						<Chip>Primary</Chip>
						<Chip variant="outlined" color="success">Success</Chip>
						<Chip variant="soft" color="warning">Warning</Chip>
					</Flex>
				</Flex>
			</Box>
		</section>

		<!-- Typography -->
		<section>
			<Heading as="h2" size="2">Typography</Heading>
			<Box padding="20px" bg="var(--glass-bg)" borderRadius="12px">
				<Flex direction="column" gap={12}>
					<Text size="lg" weight="bold">Large Bold Text</Text>
					<Text size="base">Base text with <Code inline>inline code</Code></Text>
					<Text size="sm" color="var(--text-secondary)">Small secondary text</Text>
					<Link href="#" external>External Link →</Link>
				</Flex>
			</Box>
		</section>

		<!-- Menu -->
		<section>
			<Heading as="h2" size="2">Menu Component</Heading>
			<Menu>
				{#snippet trigger()}
					<button class="menu-btn">Open Menu</button>
				{/snippet}
				{#snippet children()}
					<MenuItem onclick={() => alert('Edit clicked')}>
						Edit
					</MenuItem>
					<MenuItem onclick={() => alert('Share clicked')}>
						Share
					</MenuItem>
					<MenuItem danger onclick={() => alert('Delete clicked')}>
						Delete
					</MenuItem>
				{/snippet}
			</Menu>
		</section>

		<!-- Hooks Demo -->
		<section>
			<Heading as="h2" size="2">Hooks Demo</Heading>
			<Box padding="20px" bg="var(--glass-bg)" borderRadius="12px">
				<Flex direction="column" gap={12}>
					<Text>
						Screen size: {mobile.matches ? 'Mobile' : 'Desktop'}
					</Text>
					<Text>
						LocalStorage count: {storage.value}
					</Text>
					<button onclick={incrementCount} class="count-btn">
						Increment Count
					</button>
					<button onclick={() => dialog.toggle()} class="dialog-btn">
						{dialog.isOpen ? 'Close' : 'Open'} Dialog
					</button>
				</Flex>
			</Box>
		</section>

		<!-- ScrollArea -->
		<section>
			<Heading as="h2" size="2">Scroll Area</Heading>
			<ScrollArea height="200px" type="hover">
				<Box padding="16px">
					{#each Array(20) as _, i}
						<Text>Scroll item {i + 1}</Text>
					{/each}
				</Box>
			</ScrollArea>
		</section>

		<!-- Image -->
		<section>
			<Heading as="h2" size="2">Image Component</Heading>
			<Image 
				src="https://via.placeholder.com/300x200" 
				alt="Placeholder" 
				width="300px"
				height="200px"
				fit="cover"
			/>
		</section>

		<!-- Chips Collection -->
		<section>
			<Heading as="h2" size="2">Chips</Heading>
			<Flex gap={8} wrap="wrap">
				<Chip size="sm">Small</Chip>
				<Chip size="base">Base</Chip>
				<Chip size="lg">Large</Chip>
				<Chip removable onRemove={() => alert('Removed')}>Removable</Chip>
				<Chip variant="outlined" color="error">Outlined Error</Chip>
				<Chip variant="soft" color="success">Soft Success</Chip>
			</Flex>
		</section>

		<!-- Visually Hidden -->
		<section>
			<Heading as="h2" size="2">Accessibility</Heading>
			<button>
				Click me
				<VisuallyHidden>This text is hidden visually but read by screen readers</VisuallyHidden>
			</button>
		</section>
	</div>
</ThemeProvider>

<style>
	.demo-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 40px 20px;
	}

	section {
		margin-bottom: 40px;
	}

	.menu-btn,
	.count-btn,
	.dialog-btn {
		padding: 8px 16px;
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 14px;
		transition: all 0.2s;
	}

	.menu-btn:hover,
	.count-btn:hover,
	.dialog-btn:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	button {
		padding: 8px 16px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: 6px;
		cursor: pointer;
	}
</style>
