<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switch from './Switch.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Switch',
		component: Switch,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A toggle switch component for boolean input.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Enable notifications' }} />

<Story name="Checked" args={{ checked: true, label: 'Notifications enabled' }} />

<Story name="Disabled" args={{ disabled: true, label: 'Cannot toggle' }} />

<Story name="Disabled Checked" args={{ disabled: true, checked: true, label: 'Locked on' }} />

<Story name="Without Label" args={{ ariaLabel: 'Toggle switch' }} />

<Story name="All States">
	<div class="states-container">
		<Switch label="Off" />
		<Switch label="On" checked={true} />
		<Switch label="Disabled Off" disabled={true} />
		<Switch label="Disabled On" disabled={true} checked={true} />
	</div>
</Story>

<style>
	.states-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>
