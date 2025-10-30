<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BarcodeButton from './BarcodeButton.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Barcode/BarcodeButton',
		component: BarcodeButton,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A button component that opens a barcode scanner modal.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{}} />

<Story name="Primary">
	<BarcodeButton variant="primary" />
</Story>

<Story name="Secondary">
	<BarcodeButton variant="secondary" />
</Story>

<Story name="Outline">
	<BarcodeButton variant="outline" />
</Story>

<Story name="Ghost">
	<BarcodeButton variant="ghost" />
</Story>

<Story name="IconOnly">
	<BarcodeButton variant="icon" />
</Story>

<Story name="AllSizes">
	<div style="display: flex; gap: 1rem; align-items: center;">
		<BarcodeButton size="sm" />
		<BarcodeButton size="md" />
		<BarcodeButton size="lg" />
	</div>
</Story>

<Story name="Disabled">
	<BarcodeButton disabled={true} />
</Story>

<Story name="CustomLabel">
	<BarcodeButton label="Custom Scan Button" />
</Story>
