<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link, Portal, ScrollArea, FocusTrap, VisuallyHidden,
		InfiniteScroll, ContextMenu, Popover, Dropdown, Button, Card
	} from '$lib/ui';
  import Input from '$lib/ui/atoms/Input.svelte';
  import Input from '$lib/ui/atoms/Input.svelte';
	import '../../../lib/styles/theme.css';

	let showPortal = $state(false);
	let showPopover = $state(false);
	let showContextMenu = $state(false);
	let contextMenuPosition = $state({ x: 0, y: 0 });
	let items = $state(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		contextMenuPosition = { x: e.clientX, y: e.clientY };
		showContextMenu = true;
	}

	function loadMore() {
		const currentLength = items.length;
		const newItems = Array.from({ length: 10 }, (_, i) => `Item ${currentLength + i + 1}`);
		items = [...items, ...newItems];
	}

	const dropdownItems = [
		{ label: 'Profile', value: 'profile' },
		{ label: 'Settings', value: 'settings' },
		{ label: 'Logout', value: 'logout' }
	];
</script>

<div class="utility-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Utility</Heading>
				<Text color="var(--text-secondary)">Helper and utility components</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
	<!-- Portal -->
		<section class="demo-section">
			<Heading as="h2" size="3">Portal</Heading>
			<Text>Render content outside the component tree for modals, toasts, etc.</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Button onclick={() => showPortal = !showPortal}>
					Toggle Portal Content
				</Button>

				{#if showPortal}
					<Portal>
						<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999;">
							<Card>
								<Flex direction="column" gap={16}>
									<Heading as="h4" size="5">Portal Content</Heading>
									<Text>This is rendered outside the normal DOM hierarchy</Text>
									<Button onclick={() => showPortal = false}>Close</Button>
								</Flex>
							</Card>
						</div>
						<button 
							type="button"
							style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9998; border: none; cursor: pointer;"
							onclick={() => showPortal = false}
							aria-label="Close portal"
						></button>
					</Portal>
				{/if}
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					&lt;Portal target="body"&gt;Content rendered outside component tree&lt;/Portal&gt;
				</Text>
			</Box>
		</section>

		<!-- ScrollArea -->
		<section class="demo-section">
			<Heading as="h2" size="3">ScrollArea</Heading>
			<Text>Custom scrollable container</Text>
			
			<Box padding="0" bg="var(--glass-bg)" borderRadius="8px" style="overflow: hidden;">
				<ScrollArea height="300px">
					<Box padding="24px">
						{#each Array(20) as _, i}
							<Text style="margin-bottom: 12px;">Scrollable content line {i + 1}</Text>
						{/each}
					</Box>
				</ScrollArea>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- InfiniteScroll -->
		<section class="demo-section">
			<Heading as="h2" size="3">InfiniteScroll</Heading>
			<Text>Load more content on scroll</Text>
			
			<Box 
				padding="0" 
				bg="var(--glass-bg)" 
				borderRadius="8px" 
				style="overflow: hidden; max-height: 400px; overflow-y: auto;"
			>
				<Box padding="24px">
					<Flex direction="column" gap={12}>
						{#each items as item}
							<Card>
								<Text>{item}</Text>
							</Card>
						{/each}
					</Flex>
					<InfiniteScroll onLoadMore={loadMore} />
				</Box>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Popover -->
		<section class="demo-section">
			<Heading as="h2" size="3">Popover</Heading>
			<Text>Floating content overlay</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Button onclick={() => showPopover = !showPopover}>
					Toggle Popover
				</Button>

				{#if showPopover}
					<Popover onClose={() => showPopover = false}>
						<Box padding="16px">
							<Heading as="h5" size="6">Popover Title</Heading>
							<Text size="sm" style="margin-top: 8px;">
								This is popover content that floats above other elements
							</Text>
						</Box>
					</Popover>
				{/if}
			</Box>
		</section>

		<!-- Dropdown -->
		<section class="demo-section">
			<Heading as="h2" size="3">Dropdown</Heading>
			<Text>Menu with selectable items</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Dropdown 
					items={dropdownItems}
					onSelect={(item) => console.log('Selected:', item)}
				>
					<Button>Menu ▾</Button>
				</Dropdown>
			</Box>
		</section>

		<!-- Context Menu -->
		<section class="demo-section">
			<Heading as="h2" size="3">ContextMenu</Heading>
			<Text>Right-click menu</Text>
			
			<Box 
				padding="80px" 
				bg="var(--glass-bg)" 
				borderRadius="8px"
				style="text-align: center;"
				oncontextmenu={handleContextMenu}
			>
				<Text>Right-click here to open context menu</Text>
			</Box>

			{#if showContextMenu}
				<ContextMenu 
					x={contextMenuPosition.x}
					y={contextMenuPosition.y}
					onClose={() => showContextMenu = false}
				/>
			{/if}
		</section>

		<!-- FocusTrap -->
		<section class="demo-section">
			<Heading as="h2" size="3">FocusTrap</Heading>
			<Text>Trap keyboard focus within a component</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<FocusTrap>
					<Flex direction="column" gap={12}>
						<Text>Focus is trapped in this area. Tab between elements:</Text>
						<Input placeholder="First input" />
						<Input placeholder="Second input" />
						<Button>Focusable button</Button>
					</Flex>
				</FocusTrap>
			</Box>
		</section>

		<!-- VisuallyHidden -->
		<section class="demo-section">
			<Heading as="h2" size="3">VisuallyHidden</Heading>
			<Text>Screen reader accessible hidden content</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={12}>
					<Text>The following text is hidden visually but accessible to screen readers:</Text>
					<VisuallyHidden>
						<Text>This content is only visible to screen readers</Text>
					</VisuallyHidden>
					<Text size="sm" color="var(--text-secondary)">
						(Check with a screen reader to verify)
					</Text>
				</Flex>
			</Box>
		</section>
	</div>
</div>

<style>
	.utility-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(14, 165, 233, 0.1));
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
