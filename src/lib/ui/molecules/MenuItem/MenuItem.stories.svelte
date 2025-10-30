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

<Story name="AllVariants">
	<div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 8px; width: 250px; display: flex; flex-direction: column; gap: 0.25rem;">
		<MenuItem>Default Item</MenuItem>
		<MenuItem disabled>Disabled Item</MenuItem>
		<div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 0.25rem 0;"></div>
		<MenuItem danger>Delete</MenuItem>
	</div>
</Story>
