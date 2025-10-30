<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Badge',
		component: Badge,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A badge component for displaying labels, counts, or status indicators.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<Badge>Badge</Badge>
</Story>

<Story name="Primary">
	<Badge variant="primary">New</Badge>
</Story>

<Story name="Success">
	<Badge variant="success">Success</Badge>
</Story>

<Story name="Warning">
	<Badge variant="warning">Warning</Badge>
</Story>

<Story name="Error">
	<Badge variant="error">Error</Badge>
</Story>

<Story name="Info">
	<Badge variant="info">Info</Badge>
</Story>

<Story name="WithNumber">
	<Badge>42</Badge>
</Story>

<Story name="AllSizes">
	<div class="badges-container">
		<Badge size="sm">Small</Badge>
		<Badge size="md">Medium</Badge>
		<Badge size="lg">Large</Badge>
	</div>
</Story>

<Story name="AllVariants">
	<div class="badges-container">
		<Badge>Default</Badge>
		<Badge variant="primary">Primary</Badge>
		<Badge variant="success">Success</Badge>
		<Badge variant="warning">Warning</Badge>
		<Badge variant="error">Error</Badge>
		<Badge variant="info">Info</Badge>
	</div>
</Story>

<style>
	.badges-container {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
