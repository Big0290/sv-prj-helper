<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Progress from './Progress.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Progress',
		component: Progress,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A progress bar component for displaying completion status.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{ value: 50, label: 'Progress' }} />

<Story name="Low Progress" args={{ value: 25, label: '25% Complete' }} />

<Story name="High Progress" args={{ value: 80, label: '80% Complete' }} />

<Story name="Complete" args={{ value: 100, label: 'Complete' }} />

<Story name="Success Variant" args={{ value: 100, variant: 'success' }} />

<Story name="Warning Variant" args={{ value: 60, variant: 'warning' }} />

<Story name="Error Variant" args={{ value: 20, variant: 'error' }} />

<Story name="All Variants">
	<div class="progress-container">
		<Progress value={30} variant="default" label="Default - 30%" />
		<Progress value={70} variant="success" label="Success - 70%" />
		<Progress value={50} variant="warning" label="Warning - 50%" />
		<Progress value={20} variant="error" label="Error - 20%" />
	</div>
</Story>

<Story name="Without Label" args={{ value: 65 }} />

<style>
	.progress-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		max-width: 400px;
	}
</style>
