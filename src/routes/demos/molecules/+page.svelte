<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link, Code,
		Button, Input, Card, Modal, Alert, Select, Checkbox, Radio, Switch, Slider,
		Textarea, Tooltip, Badge, Avatar, Progress, Spinner
	} from '$lib/ui';
	import { Accordion } from '$lib/ui';
	import '../../../lib/styles/theme.css';

	// State
	let modalOpen = $state(false);
	let inputValue = $state('');
	let textareaValue = $state('');
	let checkboxChecked = $state(false);
	let switchChecked = $state(false);
	let radioValue = $state('option1');
	let selectValue = $state('');
	let sliderValue = $state(50);
	let accordionOpen = $state(false);

	const selectOptions = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];
</script>

<div class="molecules-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Molecules</Heading>
				<Text color="var(--text-secondary)">Composed UI components</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- Buttons -->
		<section class="demo-section">
			<Heading as="h2" size="3">Button</Heading>
			<Text>Interactive button with multiple variants and sizes</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={20}>
					<div>
						<Text weight="medium" style="margin-bottom: 12px;">Variants</Text>
						<Flex gap={12} wrap="wrap">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="danger">Danger</Button>
						</Flex>
					</div>

					<div>
						<Text weight="medium" style="margin-bottom: 12px;">Sizes</Text>
						<Flex gap={12} wrap="wrap" align="center">
							<Button size="sm">Small</Button>
							<Button size="md">Medium</Button>
							<Button size="lg">Large</Button>
						</Flex>
					</div>

					<div>
						<Text weight="medium" style="margin-bottom: 12px;">States</Text>
						<Flex gap={12} wrap="wrap">
							<Button disabled>Disabled</Button>
							<Button loading>Loading...</Button>
						</Flex>
					</div>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Button variant="primary">Click me</Button>
<Button variant="secondary" size="lg">Large Button</Button>
<Button disabled>Disabled</Button>`}</Code>
		</section>

		<!-- Input -->
		<section class="demo-section">
			<Heading as="h2" size="3">Input</Heading>
			<Text>Text input field with variants and states</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={16}>
					<Input 
						bind:value={inputValue} 
						placeholder="Basic input"
						label="Username"
					/>
					<Input 
						value="user@example.com" 
						type="email"
						label="Email"
						helperText="We'll never share your email"
					/>
					<Input 
						value="Invalid email" 
						error="Please enter a valid email address"
						label="Email with error"
					/>
					<Input 
						value="Disabled input" 
						disabled
						label="Disabled"
					/>
					<Input 
						value="Read only" 
						readonly
						label="Read Only"
					/>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Input bind:value={inputValue} label="Username" />
<Input error="Invalid email" label="Email" />
<Input disabled label="Disabled" />`}</Code>
		</section>

		<!-- Card -->
		<section class="demo-section">
			<Heading as="h2" size="3">Card</Heading>
			<Text>Container component with glassmorphism styling</Text>
			
			<div class="demo-grid">
				<Card>
					<Heading as="h4" size="5">Simple Card</Heading>
					<Text size="sm" color="var(--text-secondary)">
						This is a basic card with glassmorphism effect.
					</Text>
				</Card>

				<Card variant="bordered">
					<Heading as="h4" size="5">Bordered Card</Heading>
					<Text size="sm" color="var(--text-secondary)">
						Card with a prominent border.
					</Text>
				</Card>

				<Card hoverable>
					<Heading as="h4" size="5">Hoverable Card</Heading>
					<Text size="sm" color="var(--text-secondary)">
						Hover me for an interactive effect!
					</Text>
				</Card>
			</div>

			<Code language="svelte" inline={false}>{`<Card>
  <Heading as="h4">Card Title</Heading>
  <Text>Card content goes here</Text>
</Card>`}</Code>
		</section>

		<!-- Modal -->
		<section class="demo-section">
			<Heading as="h2" size="3">Modal</Heading>
			<Text>Dialog overlay for focused interactions</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Button onclick={() => modalOpen = true}>Open Modal</Button>
			</Box>

			<Modal bind:open={modalOpen} title="Example Modal">
				<Flex direction="column" gap={16}>
					<Text>This is a modal dialog with glassmorphism styling.</Text>
					<Text size="sm" color="var(--text-secondary)">
						You can place any content here - forms, images, text, etc.
					</Text>
					<Flex gap={12} justify="end">
						<Button variant="ghost" onclick={() => modalOpen = false}>Cancel</Button>
						<Button variant="primary" onclick={() => modalOpen = false}>Confirm</Button>
					</Flex>
				</Flex>
			</Modal>

			<Code language="svelte" inline={false}>{`<Button onclick={() => modalOpen = true}>Open Modal</Button>

<Modal bind:open={modalOpen} title="My Modal">
  <p>Modal content...</p>
</Modal>`}</Code>
		</section>

		<!-- Alert -->
		<section class="demo-section">
			<Heading as="h2" size="3">Alert</Heading>
			<Text>Notification messages with different severities</Text>
			
			<Flex direction="column" gap={12}>
				<Alert variant="info">
					<strong>Info:</strong> This is an informational message.
				</Alert>
				<Alert variant="success">
					<strong>Success:</strong> Operation completed successfully!
				</Alert>
				<Alert variant="warning">
					<strong>Warning:</strong> Please review before proceeding.
				</Alert>
				<Alert variant="error">
					<strong>Error:</strong> Something went wrong.
				</Alert>
			</Flex>

			<Code language="svelte" inline={false}>{`<Alert variant="success">
  <strong>Success:</strong> Task completed!
</Alert>`}</Code>
		</section>

		<!-- Select -->
		<section class="demo-section">
			<Heading as="h2" size="3">Select</Heading>
			<Text>Dropdown selection component</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={16}>
					<Select 
						bind:value={selectValue} 
						options={selectOptions} 
						placeholder="Choose an option"
					/>
					<Text size="sm" color="var(--text-secondary)">
						Selected: {selectValue || 'None'}
					</Text>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Select 
  bind:value={selectValue} 
  options={options} 
  placeholder="Select..."
/>`}</Code>
		</section>

		<!-- Checkbox & Radio -->
		<section class="demo-section">
			<Heading as="h2" size="3">Checkbox & Radio</Heading>
			<Text>Selection controls for forms</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Checkbox</Heading>
					<Flex direction="column" gap={12}>
						<Checkbox bind:checked={checkboxChecked} label="Accept terms" />
						<Checkbox checked label="Pre-checked" />
						<Checkbox disabled label="Disabled" />
					</Flex>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Radio</Heading>
					<Flex direction="column" gap={12}>
						<Radio bind:group={radioValue} value="option1" label="Option 1" />
						<Radio bind:group={radioValue} value="option2" label="Option 2" />
						<Radio bind:group={radioValue} value="option3" label="Option 3" />
					</Flex>
				</Box>
			</div>

			<Code language="svelte" inline={false}>{`<Checkbox bind:checked={accepted} label="I agree" />
<Radio bind:group={selected} value="a" label="Choice A" />`}</Code>
		</section>

		<!-- Switch & Slider -->
		<section class="demo-section">
			<Heading as="h2" size="3">Switch & Slider</Heading>
			<Text>Toggle and range input controls</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Switch</Heading>
					<Flex direction="column" gap={12}>
						<Switch bind:checked={switchChecked} label="Enable feature" />
						<Switch checked label="Always on" />
						<Switch disabled label="Disabled" />
					</Flex>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Slider</Heading>
					<Flex direction="column" gap={12}>
						<Slider bind:value={sliderValue} min={0} max={100} />
						<Text size="sm" color="var(--text-secondary)">Value: {sliderValue}</Text>
					</Flex>
				</Box>
			</div>

			<Code language="svelte" inline={false}>{`<Switch bind:checked={enabled} label="Dark mode" />
<Slider bind:value={volume} min={0} max={100} />`}</Code>
		</section>

		<!-- Textarea -->
		<section class="demo-section">
			<Heading as="h2" size="3">Textarea</Heading>
			<Text>Multi-line text input</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Textarea 
					bind:value={textareaValue} 
					placeholder="Enter your message..."
					rows={5}
				/>
			</Box>

			<Code language="svelte" inline={false}>{`<Textarea 
  bind:value={message} 
  placeholder="Type here..."
  rows={4}
/>`}</Code>
		</section>

		<!-- Badge & Avatar -->
		<section class="demo-section">
			<Heading as="h2" size="3">Badge & Avatar</Heading>
			<Text>Status indicators and user representation</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Badge</Heading>
					<Flex gap={8} wrap="wrap">
						<Badge variant="primary">Primary</Badge>
						<Badge variant="success">Success</Badge>
						<Badge variant="warning">Warning</Badge>
						<Badge variant="error">Error</Badge>
						<Badge variant="info">Info</Badge>
					</Flex>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Avatar</Heading>
					<Flex gap={12} align="center">
						<Avatar name="John Doe" size="sm" />
						<Avatar name="Jane Smith" size="md" />
						<Avatar name="Bob Johnson" size="lg" />
					</Flex>
				</Box>
			</div>

			<Code language="svelte" inline={false}>{`<Badge variant="success">Active</Badge>
<Avatar name="John Doe" size="md" />`}</Code>
		</section>

		<!-- Progress & Spinner -->
		<section class="demo-section">
			<Heading as="h2" size="3">Progress & Spinner</Heading>
			<Text>Loading and progress indicators</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Progress</Heading>
					<Flex direction="column" gap={16}>
						<div>
							<Text size="sm" style="margin-bottom: 4px;">Default (50%)</Text>
							<Progress value={50} max={100} variant="default" />
						</div>
						<div>
							<Text size="sm" style="margin-bottom: 4px;">Success (100%)</Text>
							<Progress value={100} max={100} variant="success" />
						</div>
						<div>
							<Text size="sm" style="margin-bottom: 4px;">Warning (75%)</Text>
							<Progress value={75} max={100} variant="warning" />
						</div>
						<div>
							<Text size="sm" style="margin-bottom: 4px;">Error (45%)</Text>
							<Progress value={45} max={100} variant="error" />
						</div>
					</Flex>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Spinner</Heading>
					<Flex gap={16} align="center">
						<Spinner size="sm" />
						<Spinner size="md" />
						<Spinner size="lg" />
					</Flex>
				</Box>
			</div>

			<Code language="svelte" inline={false}>{`<Progress value={50} />
<Spinner size="md" />`}</Code>
		</section>

		<!-- Tooltip -->
		<section class="demo-section">
			<Heading as="h2" size="3">Tooltip</Heading>
			<Text>Contextual information on hover</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex gap={12} wrap="wrap">
					<Tooltip content="This is a tooltip" placement="top">
						<Button>Hover me (top)</Button>
					</Tooltip>
					<Tooltip content="Bottom tooltip" placement="bottom">
						<Button>Hover me (bottom)</Button>
					</Tooltip>
					<Tooltip content="Left tooltip" placement="left">
						<Button>Hover me (left)</Button>
					</Tooltip>
					<Tooltip content="Right tooltip" placement="right">
						<Button>Hover me (right)</Button>
					</Tooltip>
				</Flex>
			</Box>

			<Code language="svelte" inline={false}>{`<Tooltip content="Help text" placement="top">
  <Button>Hover me</Button>
</Tooltip>`}</Code>
		</section>

		<!-- Accordion -->
		<section class="demo-section">
			<Heading as="h2" size="3">Accordion</Heading>
			<Text>Expandable content sections</Text>
			
			<Flex direction="column" gap={12}>
				<Accordion title="What is this library?">
					<Text>
						This is a comprehensive Svelte 5 UI component library with glassmorphism styling
						and modern design patterns.
					</Text>
				</Accordion>
				<Accordion title="How do I use it?">
					<Text>
						Import components from the library and use them in your Svelte applications.
						All components support TypeScript and follow accessibility best practices.
					</Text>
				</Accordion>
				<Accordion title="Is it customizable?" bind:open={accordionOpen}>
					<Text>
						Yes! All components use CSS variables for theming and support various props
						for customization.
					</Text>
				</Accordion>
			</Flex>

			<Code language="svelte" inline={false}>{`<Accordion title="Section 1">
  <p>Hidden content...</p>
</Accordion>`}</Code>
		</section>
	</div>
</div>

<style>
	.molecules-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
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
