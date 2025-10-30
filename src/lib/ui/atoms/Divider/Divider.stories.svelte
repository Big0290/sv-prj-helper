<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Divider from './Divider.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Divider',
		component: Divider,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A divider component for separating content sections horizontally or vertically.'
				}
			}
		}
	});
</script>

<Story name="Horizontal">
	<div style="width: 400px; padding: 2rem;">
		<div>Content above</div>
		<Divider orientation="horizontal" />
		<div>Content below</div>
	</div>
</Story>

<Story name="Vertical">
	<div style="display: flex; align-items: center; height: 40px; padding: 1rem;">
		<span>Left</span>
		<Divider orientation="vertical" />
		<span>Right</span>
	</div>
</Story>

<Story name="SpacingSmall">
	<div style="width: 400px; padding: 1rem;">
		<p>Line 1</p>
		<Divider spacing="2" />
		<p>Line 2</p>
		<Divider spacing="2" />
		<p>Line 3</p>
	</div>
</Story>

<Story name="SpacingLarge">
	<div style="width: 400px; padding: 1rem;">
		<p>Line 1</p>
		<Divider spacing="8" />
		<p>Line 2</p>
	</div>
</Story>
