<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Flex from './Flex.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Flex',
		component: Flex,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: 'A flexible container component that provides flexbox layout capabilities.'
				}
			}
		}
	});
</script>

<Story name="RowDirection">
	<Flex direction="row" gap="1rem" style="padding: 2rem;">
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 1</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 2</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 3</div>
	</Flex>
</Story>

<Story name="ColumnDirection">
	<Flex direction="column" gap="1rem" style="padding: 2rem;">
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 1</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 2</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 3</div>
	</Flex>
</Story>

<Story name="JustifyCenter">
	<Flex justify="center" gap="1rem" style="padding: 2rem;">
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 1</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 2</div>
	</Flex>
</Story>

<Story name="JustifySpaceBetween">
	<Flex justify="space-between" style="padding: 2rem;">
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Left</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Right</div>
	</Flex>
</Story>

<Story name="AlignCenter">
	<Flex align="center" gap="1rem" style="padding: 2rem; height: 200px;">
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 1</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 3rem 1rem; border-radius: 8px;">Tall Item</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 3</div>
	</Flex>
</Story>

<Story name="WithWrap">
	<Flex wrap="wrap" gap="1rem" style="padding: 2rem; max-width: 400px;">
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px; white-space: nowrap;">Long Text Item 1</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 2</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">Item 3</div>
		<div style="background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px; white-space: nowrap;">Long Text Item 4</div>
	</Flex>
</Story>
