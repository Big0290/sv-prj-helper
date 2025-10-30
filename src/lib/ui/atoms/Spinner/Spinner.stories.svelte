<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from './Spinner.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Spinner',
		component: Spinner,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A loading spinner component for indicating async operations.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{}} />

<Story name="Small" args={{ size: 16 }} />

<Story name="Medium" args={{ size: 24 }} />

<Story name="Large" args={{ size: 48 }} />

<Story name="Extra Large" args={{ size: 64 }} />

<Story name="Custom Color" args={{ color: '#3b82f6' }} />

<Story name="All Sizes">
	<div class="spinners-container">
		<div>
			<Spinner size={16} />
			<p>Small (16px)</p>
		</div>
		<div>
			<Spinner size={24} />
			<p>Medium (24px)</p>
		</div>
		<div>
			<Spinner size={48} />
			<p>Large (48px)</p>
		</div>
		<div>
			<Spinner size={64} />
			<p>Extra Large (64px)</p>
		</div>
	</div>
</Story>

<Story name="With Text">
	<div class="loading-container">
		<Spinner size={32} />
		<p>Loading...</p>
	</div>
</Story>

<style>
	.spinners-container {
		display: flex;
		gap: 3rem;
		align-items: center;
	}
	
	.spinners-container div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
</style>
