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

{/* @ts-expect-error - Storybook CSF doesn't understand Svelte 5 snippets in Story body */}
<Story name="WithAction" args={{ title: "No projects yet", description: "Get started by creating your first project" }}>
	{#snippet icon()}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 48px; height: 48px;">
			<path d="M12 5v14m-7-7h14" />
		</svg>
	{/snippet}
	
	{#snippet action()}
		<Button variant="primary">Create Item</Button>
	{/snippet}
	
	<EmptyState 
		title="No projects yet"
		description="Get started by creating your first project"
		{icon}
		{action}
	/>
</Story>

<Story name="Compact">
	<EmptyState 
		title="No results"
		description="Try adjusting your search filters"
		compact={true}
	/>
</Story>

{/* @ts-expect-error - Storybook CSF doesn't understand Svelte 5 snippets in Story body */}
<Story name="CustomIcon" args={{ title: "Nothing here", description: "Start adding content to see it appear here" }}>
	{#snippet customIcon()}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 64px; height: 64px;">
			<circle cx="12" cy="12" r="10" />
			<path d="M8 12h8M12 8v8" />
		</svg>
	{/snippet}
	
	<EmptyState 
		title="Nothing here"
		description="Start adding content to see it appear here"
		icon={customIcon}
	/>
</Story>
