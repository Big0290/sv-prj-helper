<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Text from './Text.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Text',
		component: Text,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A flexible text component with multiple sizes, weights, and alignment options.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<Text>Default text paragraph with normal weight and base size.</Text>
</Story>

<Story name="AllSizes">
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Text size="xs">Extra small text (xs)</Text>
		<Text size="sm">Small text (sm)</Text>
		<Text size="base">Base text size (base)</Text>
		<Text size="lg">Large text (lg)</Text>
		<Text size="xl">Extra large text (xl)</Text>
	</div>
</Story>

<Story name="AllWeights">
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Text weight="normal">Normal weight text</Text>
		<Text weight="medium">Medium weight text</Text>
		<Text weight="semibold">Semibold weight text</Text>
		<Text weight="bold">Bold weight text</Text>
	</div>
</Story>

<Story name="Alignments">
	<div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
		<Text align="left">Left aligned text</Text>
		<Text align="center">Center aligned text</Text>
		<Text align="right">Right aligned text</Text>
		<Text align="justify" style="max-width: 300px;">
			Justified text demonstrates how the text aligns to both left and right margins, creating a clean edge on both sides for better readability in large blocks of content.
		</Text>
	</div>
</Story>

<Story name="ParagraphExample">
	<div style="max-width: 400px;">
		<Text as="p" size="base" weight="normal">
			This is a paragraph of text demonstrating the default behavior with normal weight and base size. It wraps naturally and maintains proper line height for comfortable reading.
		</Text>
	</div>
</Story>

<Story name="Truncated">
	<div style="width: 200px;">
		<Text truncate={true}>
			This is a very long text that will be truncated with an ellipsis
		</Text>
	</div>
</Story>

<Story name="LineClamp">
	<div style="width: 300px;">
		<Text lineClamp={3}>
			This text demonstrates line clamping. When the content exceeds three lines, it will be cut off with an ellipsis. This is useful for previewing content before expanding it. You can use this technique to create consistent card layouts in grids and lists.
		</Text>
	</div>
</Story>

<Story name="DifferentElements">
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Text as="p">Paragraph element</Text>
		<Text as="span">Span element (inline)</Text>
		<Text as="strong" weight="bold">Strong element</Text>
		<Text as="em" style="font-style: italic;">Emphasized text</Text>
		<Text as="small" size="sm">Small element</Text>
	</div>
</Story>
