<script lang="ts">
	import { 
		Box, Flex, Text, Heading, Label, Link, Code, Chip, Icon, Image 
	} from '$lib/ui';
	import '../../../lib/styles/theme.css';

	let removableChips = $state(['Design', 'Development', 'Marketing', 'Sales']);

	function removeChip(index: number) {
		removableChips = removableChips.filter((_, i) => i !== index);
	}
</script>

<div class="atoms-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Atoms</Heading>
				<Text color="var(--text-secondary)">Core primitive components</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- Box Component -->
		<section class="demo-section">
			<Heading as="h2" size="3">Box</Heading>
			<Text>Universal layout wrapper with style props - padding, margin, bg, border, borderRadius</Text>
			
			<div class="demo-grid">
				<Box padding="20px" bg="var(--glass-bg)" borderRadius="8px">
					<Text>Default Box</Text>
				</Box>
				<Box padding="20px" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" borderRadius="12px">
					<Text color="white" weight="bold">Gradient Box</Text>
				</Box>
				<Box 
					padding="20px" 
					border="2px solid var(--color-primary)" 
					borderRadius="8px"
					bg="transparent"
				>
					<Text>Bordered Box</Text>
				</Box>
			</div>

			<Code language="svelte" inline={false}>{`<Box padding="20px" bg="var(--glass-bg)" borderRadius="8px">
  Content
</Box>`}</Code>
		</section>

		<!-- Flex Component -->
		<section class="demo-section">
			<Heading as="h2" size="3">Flex</Heading>
			<Text>Flexbox wrapper with direction, justify, align, gap, and wrap props</Text>
			
			<div class="demo-grid">
				<Box padding="20px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5">Row Direction</Heading>
					<Flex direction="row" gap={12} align="center">
						<Box padding="12px" bg="var(--color-primary)" borderRadius="6px">
							<Text color="white">1</Text>
						</Box>
						<Box padding="12px" bg="var(--color-primary)" borderRadius="6px">
							<Text color="white">2</Text>
						</Box>
						<Box padding="12px" bg="var(--color-primary)" borderRadius="6px">
							<Text color="white">3</Text>
						</Box>
					</Flex>
				</Box>

				<Box padding="20px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5">Column Direction</Heading>
					<Flex direction="column" gap={12}>
						<Box padding="12px" bg="var(--color-success)" borderRadius="6px">
							<Text color="white">1</Text>
						</Box>
						<Box padding="12px" bg="var(--color-success)" borderRadius="6px">
							<Text color="white">2</Text>
						</Box>
						<Box padding="12px" bg="var(--color-success)" borderRadius="6px">
							<Text color="white">3</Text>
						</Box>
					</Flex>
				</Box>

				<Box padding="20px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5">Space Between</Heading>
					<Flex justify="space-between" align="center">
						<Text>Start</Text>
						<Text>Middle</Text>
						<Text>End</Text>
					</Flex>
				</Box>
			</div>

			<Code language="svelte" inline={false}>{`<Flex direction="row" gap={12} justify="space-between">
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</Flex>`}</Code>
		</section>

		<!-- Typography: Text & Heading -->
		<section class="demo-section">
			<Heading as="h2" size="3">Typography</Heading>
			<Text>Text and Heading components with size, weight, truncate, and lineClamp options</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={20}>
					<div>
						<Heading as="h1">Heading 1 - Hero Title</Heading>
						<Heading as="h2">Heading 2 - Section Title</Heading>
						<Heading as="h3">Heading 3 - Subsection</Heading>
						<Heading as="h4">Heading 4 - Card Title</Heading>
						<Heading as="h5">Heading 5 - Small Title</Heading>
						<Heading as="h6">Heading 6 - Tiny Title</Heading>
					</div>

					<Flex direction="column" gap={8}>
						<Text size="xl" weight="bold">Extra Large Text</Text>
						<Text size="lg" weight="semibold">Large Text</Text>
						<Text size="base" weight="medium">Base Text</Text>
						<Text size="sm" weight="normal">Small Text</Text>
						<Text size="xs" weight="normal">Extra Small Text</Text>
					</Flex>

					<Flex direction="column" gap={4}>
						<Text truncate style="max-width: 300px;">
							This is a very long text that will be truncated with ellipsis when it exceeds the container width
						</Text>
						<Text lineClamp={2} style="max-width: 300px;">
							This is a multi-line text that will be clamped to 2 lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
						</Text>
					</Flex>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Heading as="h1">Main Title</Heading>
<Text size="lg" weight="bold">Large bold text</Text>
<Text truncate>Truncated text...</Text>`}</Code>
		</section>

		<!-- Label Component -->
		<section class="demo-section">
			<Heading as="h2" size="3">Label</Heading>
			<Text>Form labels with required indicator and disabled state</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={16}>
					<div>
						<Label for="input1">Standard Label</Label>
					</div>
					<div>
						<Label for="input2" required>Required Label</Label>
					</div>
					<div>
						<Label for="input3" disabled>Disabled Label</Label>
					</div>
					<div>
						<Label for="input4" size="lg" required>Large Required Label</Label>
					</div>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Label for="email" required>Email</Label>
<Label disabled>Disabled Field</Label>`}</Code>
		</section>

		<!-- Link Component -->
		<section class="demo-section">
			<Heading as="h2" size="3">Link</Heading>
			<Text>Styled anchor element with external link support</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={16}>
					<Link href="#" underline="hover">Hover to underline</Link>
					<Link href="#" underline="always">Always underlined</Link>
					<Link href="#" underline="none">No underline</Link>
					<Link href="https://svelte.dev" external>External link →</Link>
					<Link href="#" size="lg" color="var(--color-success)">Large green link</Link>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Link href="/about">Internal link</Link>
<Link href="https://example.com" external>External →</Link>`}</Code>
		</section>

		<!-- Code Component -->
		<section class="demo-section">
			<Heading as="h2" size="3">Code</Heading>
			<Text>Inline and block code display</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={16}>
					<Text>
						This is <Code inline>inline code</Code> within text
					</Text>
					
					<Code language="typescript" inline={false}>{`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`}</Code>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Code inline>const x = 10;</Code>
<Code language="javascript" inline={false}>
  // Block code
</Code>`}</Code>
		</section>

		<!-- Chip Component -->
		<section class="demo-section">
			<Heading as="h2" size="3">Chip</Heading>
			<Text>Tags and removable items with filled, outlined, and soft variants in multiple colors</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={24}>
					<div>
						<Text weight="medium" style="margin-bottom: 12px;">Sizes</Text>
						<Flex gap={8} wrap="wrap">
							<Chip size="sm">Small</Chip>
							<Chip size="base">Base</Chip>
							<Chip size="lg">Large</Chip>
						</Flex>
					</div>

					<div>
						<Text weight="medium" style="margin-bottom: 12px;">Filled Variant</Text>
						<Flex gap={8} wrap="wrap">
							<Chip color="primary">Primary</Chip>
							<Chip color="secondary">Secondary</Chip>
							<Chip color="success">Success</Chip>
							<Chip color="warning">Warning</Chip>
							<Chip color="error">Error</Chip>
						</Flex>
					</div>

					<div>
						<Text weight="medium" style="margin-bottom: 12px;">Outlined Variant</Text>
						<Flex gap={8} wrap="wrap">
							<Chip variant="outlined" color="primary">Primary</Chip>
							<Chip variant="outlined" color="success">Success</Chip>
							<Chip variant="outlined" color="warning">Warning</Chip>
							<Chip variant="outlined" color="error">Error</Chip>
						</Flex>
					</div>

					<div>
						<Text weight="medium" style="margin-bottom: 12px;">Soft Variant</Text>
						<Flex gap={8} wrap="wrap">
							<Chip variant="soft" color="primary">Primary</Chip>
							<Chip variant="soft" color="success">Success</Chip>
							<Chip variant="soft" color="warning">Warning</Chip>
							<Chip variant="soft" color="error">Error</Chip>
						</Flex>
					</div>

					<div>
						<Text weight="medium" style="margin-bottom: 12px;">Removable</Text>
						<Flex gap={8} wrap="wrap">
							{#each removableChips as chip, i}
								<Chip removable onRemove={() => removeChip(i)}>{chip}</Chip>
							{/each}
						</Flex>
					</div>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Chip>Tag</Chip>
<Chip variant="outlined" color="success">Success</Chip>
<Chip removable onRemove={() => console.log('removed')}>
  Removable
</Chip>`}</Code>
		</section>

		<!-- Icon Component -->
		<section class="demo-section">
			<Heading as="h2" size="3">Icon</Heading>
			<Text>Icon wrapper with size variants and spin animation</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={20}>
					<div>
						<Text weight="medium" style="margin-bottom: 12px;">Sizes</Text>
						<Flex gap={16} align="center">
							<Icon size="xs" color="var(--color-primary)">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10" />
								</svg>
							</Icon>
							<Icon size="sm" color="var(--color-primary)">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10" />
								</svg>
							</Icon>
							<Icon size="base" color="var(--color-primary)">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10" />
								</svg>
							</Icon>
							<Icon size="lg" color="var(--color-primary)">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10" />
								</svg>
							</Icon>
							<Icon size="xl" color="var(--color-primary)">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10" />
								</svg>
							</Icon>
							<Icon size="2xl" color="var(--color-primary)">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10" />
								</svg>
							</Icon>
						</Flex>
					</div>

					<div>
						<Text weight="medium" style="margin-bottom: 12px;">Spinning (Loading)</Text>
						<Icon size="lg" color="var(--color-primary)" spin>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 12a9 9 0 11-6.219-8.56" />
							</svg>
						</Icon>
					</div>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Icon size="lg" color="var(--color-primary)">
  <svg>...</svg>
</Icon>
<Icon spin>Loading icon</Icon>`}</Code>
		</section>

		<!-- Image Component -->
		<section class="demo-section">
			<Heading as="h2" size="3">Image</Heading>
			<Text>Image component with loading states, fallback, and object-fit</Text>
			
			<div class="demo-grid">
				<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 12px;">Cover</Heading>
					<Image 
						src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" 
						alt="Mountain landscape" 
						width="100%"
						height="200px"
						fit="cover"
					/>
				</Box>

				<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 12px;">Contain</Heading>
					<Image 
						src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" 
						alt="Mountain landscape" 
						width="100%"
						height="200px"
						fit="contain"
					/>
				</Box>

				<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 12px;">With Fallback</Heading>
					<Image 
						src="https://invalid-url.com/image.jpg" 
						alt="Broken image" 
						width="100%"
						height="200px"
						fit="cover"
					/>
				</Box>
			</div>

			<Code language="svelte" inline={false}>{`<Image 
  src="/photo.jpg" 
  alt="Description" 
  width="300px"
  height="200px"
  fit="cover"
  fallback="/placeholder.jpg"
/>`}</Code>
		</section>
	</div>
</div>

<style>
	.atoms-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
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
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
		margin: 24px 0;
	}

	@media (max-width: 768px) {
		.demo-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
