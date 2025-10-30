<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingOverlay from './LoadingOverlay.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/LoadingOverlay',
		component: LoadingOverlay,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A loading overlay component with multiple animation variants and blur effects.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{}}>
	<div style="position: relative; width: 400px; height: 300px; background: white; border-radius: 8px;">
		<div style="padding: 2rem;">
			<h3>Content Area</h3>
			<p>This content will be overlaid with a loading indicator.</p>
		</div>
		<LoadingOverlay isLoading={true} />
	</div>
</Story>

<Story name="Spinner" args={{}}>
	<div style="position: relative; width: 400px; height: 300px; background: white; border-radius: 8px;">
		<div style="padding: 2rem;">
			<h3>Loading with Spinner</h3>
		</div>
		<LoadingOverlay isLoading={true} variant="spinner" message="Please wait..." />
	</div>
</Story>

<Story name="Dots" args={{}}>
	<div style="position: relative; width: 400px; height: 300px; background: white; border-radius: 8px;">
		<div style="padding: 2rem;">
			<h3>Loading with Dots</h3>
		</div>
		<LoadingOverlay isLoading={true} variant="dots" message="Loading..." />
	</div>
</Story>

<Story name="Pulse" args={{}}>
	<div style="position: relative; width: 400px; height: 300px; background: white; border-radius: 8px;">
		<div style="padding: 2rem;">
			<h3>Loading with Pulse</h3>
		</div>
		<LoadingOverlay isLoading={true} variant="pulse" message="Processing..." />
	</div>
</Story>

<Story name="WithoutBlur" args={{}}>
	<div style="position: relative; width: 400px; height: 300px; background: white; border-radius: 8px;">
		<div style="padding: 2rem;">
			<h3>No Blur Effect</h3>
			<p>Content is fully visible behind overlay</p>
		</div>
		<LoadingOverlay isLoading={true} blur={false} />
	</div>
</Story>

<Story name="CustomMessage" args={{}}>
	<div style="position: relative; width: 400px; height: 300px; background: white; border-radius: 8px;">
		<div style="padding: 2rem;">
			<h3>Uploading Files</h3>
		</div>
		<LoadingOverlay isLoading={true} message="Uploading files... 75%" />
	</div>
</Story>
