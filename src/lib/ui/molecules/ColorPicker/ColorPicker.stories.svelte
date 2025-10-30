<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ColorPicker from './ColorPicker.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/ColorPicker',
		component: ColorPicker,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A color picker component with preset colors and hex input support.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{}} />

<Story name="WithLabel">
	<ColorPicker 
		value="#3b82f6"
		label="Select Color"
	/>
</Story>

<Story name="CustomValue">
	<ColorPicker 
		value="#ef4444"
	/>
</Story>

<Story name="MultiplePickers">
	<div style="display: flex; gap: 2rem;">
		<div>
			<ColorPicker value="#3b82f6" label="Primary" />
		</div>
		<div>
			<ColorPicker value="#10b981" label="Success" />
		</div>
		<div>
			<ColorPicker value="#f59e0b" label="Warning" />
		</div>
		<div>
			<ColorPicker value="#ef4444" label="Error" />
		</div>
	</div>
</Story>
