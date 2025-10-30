<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import EmptyState from './EmptyState.svelte';
	import Button from '../../atoms/Button/Button.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/EmptyState',
		component: EmptyState,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'An empty state component for displaying helpful messages when no content is available.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{}}>
	<EmptyState 
		title="No items found"
		description="You don't have any items yet. Add one to get started."
	/>
</Story>

<Story name="Compact">
	<EmptyState 
		title="No results"
		description="Try adjusting your search filters"
		compact={true}
	/>
</Story>

<Story name="WithDescription">
	<EmptyState 
		title="No projects yet"
		description="Get started by creating your first project"
	/>
</Story>
