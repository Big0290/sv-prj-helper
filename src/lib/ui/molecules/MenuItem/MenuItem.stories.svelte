<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MenuItem from './MenuItem.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/MenuItem',
		component: MenuItem,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A menu item component with icon support, danger states, and disabled modes.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 8px; width: 200px;">
		<MenuItem>Menu Item</MenuItem>
	</div>
</Story>

{/* @ts-expect-error - Storybook CSF doesn't understand Svelte 5 snippets in Story body */}
<Story name="WithIcon" args={{}}>
	{#snippet icon()}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	{/snippet}
	
	<div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 8px; width: 200px;">
		<MenuItem {icon}>Profile</MenuItem>
	</div>
</Story>

<Story name="Disabled">
	<div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 8px; width: 200px;">
		<MenuItem disabled>Disabled Item</MenuItem>
	</div>
</Story>

<Story name="Danger">
	<div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 8px; width: 200px;">
		<MenuItem danger>Delete</MenuItem>
	</div>
</Story>

{/* @ts-expect-error - Storybook CSF doesn't understand Svelte 5 snippets in Story body */}
<Story name="MenuExample" args={{}}>
	{#snippet userIcon()}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	{/snippet}
	
	{#snippet settingsIcon()}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
			<circle cx="12" cy="12" r="3" />
			<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
		</svg>
	{/snippet}
	
	{#snippet deleteIcon()}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
			<polyline points="3 6 5 6 21 6" />
			<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		</svg>
	{/snippet}
	
	<div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 8px; width: 250px; display: flex; flex-direction: column; gap: 0.25rem;">
		<MenuItem icon={userIcon}>View Profile</MenuItem>
		<MenuItem icon={settingsIcon}>Settings</MenuItem>
		<div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 0.25rem 0;"></div>
		<MenuItem danger icon={deleteIcon}>Delete Account</MenuItem>
	</div>
</Story>
