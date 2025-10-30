<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Box from './Box.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Box',
		component: Box,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A flexible box component for layout and styling with inline styles and semantic HTML elements.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<Box>Default Box</Box>
</Story>

<Story name="WithPadding">
	<Box padding="1.5rem">Box with padding</Box>
</Story>

<Story name="WithBackground">
	<Box bg="rgba(59, 130, 246, 0.1)" padding="2rem">
		Colored Box
	</Box>
</Story>

<Story name="WithBorder">
	<Box border="2px solid #3b82f6" borderRadius="0.5rem" padding="1.5rem">
		Box with border
	</Box>
</Story>

<Story name="WithCustomDimensions">
	<Box width="300px" height="200px" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" borderRadius="1rem" style="display: flex; align-items: center; justify-content: center; color: white;">
		300x200px Box
	</Box>
</Story>

<Story name="AsParagraph">
	<Box as="p" padding="1rem" bg="rgba(0, 0, 0, 0.05)" borderRadius="0.25rem">
		This box renders as a paragraph element
	</Box>
</Story>

<Story name="DifferentDisplays">
	<div class="displays-container">
		<Box display="flex" gap="1rem" padding="1rem" border="1px solid" borderRadius="0.5rem">
			<span>Flex 1</span>
			<span>Flex 2</span>
		</Box>
		<Box display="inline-block" padding="1rem" bg="rgba(0, 0, 0, 0.05)" borderRadius="0.25rem">
			Inline Block
		</Box>
		<Box display="grid" gap="0.5rem" padding="1rem" border="1px solid" borderRadius="0.5rem">
			<div>Grid 1</div>
			<div>Grid 2</div>
		</Box>
	</div>
</Story>

<Story name="WithOverflow">
	<Box width="200px" height="100px" overflow="scroll" padding="1rem" bg="rgba(0, 0, 0, 0.05)" borderRadius="0.5rem">
		<div style="height: 200px;">
			This content is scrollable because it overflows the box height. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		</div>
	</Box>
</Story>

<Story name="NestedBoxes">
	<Box bg="rgba(59, 130, 246, 0.1)" padding="2rem" borderRadius="1rem">
		<Box bg="rgba(59, 130, 246, 0.2)" padding="1.5rem" borderRadius="0.5rem" margin="1rem 0">
			<Box bg="rgba(59, 130, 246, 0.3)" padding="1rem" borderRadius="0.25rem">
				Nested Box
			</Box>
		</Box>
	</Box>
</Story>

<style>
	.displays-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
		max-width: 500px;
	}
</style>
