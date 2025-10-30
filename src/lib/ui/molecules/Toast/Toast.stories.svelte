<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toast from './Toast.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/Toast',
		component: Toast,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: 'A toast notification component for displaying temporary messages.'
				}
			}
		}
	});
</script>

<Story name="Success">
	<Toast message="Success! Your changes have been saved" variant="success" />
</Story>

<Story name="Error">
	<Toast message="Error: Failed to save changes" variant="error" />
</Story>

<Story name="Warning">
	<Toast message="Warning: Please check your connection" variant="warning" />
</Story>

<Story name="Info">
	<Toast message="Info: New update available" variant="info" />
</Story>

<Story name="TopLeft">
	<Toast message="Top left position" position="top-left" />
</Story>

<Story name="BottomRight">
	<Toast message="Bottom right position" position="bottom-right" />
</Story>

<Story name="WithoutClose">
	<Toast message="Cannot be dismissed" showClose={false} />
</Story>

<Story name="AllVariants">
	<div style="position: fixed; top: 20px; right: 20px; display: flex; flex-direction: column; gap: 1rem;">
		<Toast message="Success toast" variant="success" position="top-right" />
		<Toast message="Error toast" variant="error" position="top-right" />
		<Toast message="Warning toast" variant="warning" position="top-right" />
		<Toast message="Info toast" variant="info" position="top-right" />
	</div>
</Story>
