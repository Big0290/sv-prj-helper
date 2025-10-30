<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Chip from './Chip.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Chip',
		component: Chip,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A chip component for displaying tags, labels, or removable items.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<Chip>Default Chip</Chip>
</Story>

<Story name="Filled">
	<Chip variant="filled">Filled</Chip>
</Story>

<Story name="Outlined">
	<Chip variant="outlined">Outlined</Chip>
</Story>

<Story name="Soft">
	<Chip variant="soft">Soft</Chip>
</Story>

<Story name="AllColors">
	<div class="chips-container">
		<Chip color="primary">Primary</Chip>
		<Chip color="secondary">Secondary</Chip>
		<Chip color="success">Success</Chip>
		<Chip color="error">Error</Chip>
		<Chip color="warning">Warning</Chip>
	</div>
</Story>

<Story name="AllSizes">
	<div class="chips-container">
		<Chip size="sm">Small</Chip>
		<Chip size="base">Base</Chip>
		<Chip size="lg">Large</Chip>
	</div>
</Story>

<Story name="Removable">
	<Chip removable={true}>Click X to remove</Chip>
</Story>

<Story name="Disabled">
	<Chip disabled={true}>Disabled Chip</Chip>
</Story>

<Story name="TagList">
	<div class="chips-container">
		<Chip removable={true}>React</Chip>
		<Chip removable={true}>Vue</Chip>
		<Chip removable={true}>Svelte</Chip>
		<Chip removable={true}>Angular</Chip>
	</div>
</Story>

<Story name="StatusChips">
	<div class="chips-container">
		<Chip variant="soft" color="success">Active</Chip>
		<Chip variant="soft" color="warning">Pending</Chip>
		<Chip variant="soft" color="error">Inactive</Chip>
	</div>
</Story>

<style>
	.chips-container {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
