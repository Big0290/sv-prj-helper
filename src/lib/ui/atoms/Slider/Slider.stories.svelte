<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Slider from './Slider.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Slider',
		component: Slider,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A range slider component for numeric input with min/max constraints.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Volume', max: 100 }} />

<Story name="With Value" args={{ value: 50, label: 'Progress', max: 100 }} />

<Story name="With Min Max" args={{ min: 10, max: 90, value: 50, label: 'Range 10-90' }} />

<Story name="Disabled" args={{ disabled: true, value: 30, label: 'Disabled slider' }} />

<Story name="Without Label" args={{ value: 60, max: 100, ariaLabel: 'Slider control' }} />

<Story name="Multiple Sliders">
	<div class="sliders-container">
		<Slider label="Volume" value={70} max={100} />
		<Slider label="Brightness" value={50} max={100} />
		<Slider label="Contrast" value={40} max={100} />
	</div>
</Story>

<style>
	.sliders-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: 300px;
	}
</style>
