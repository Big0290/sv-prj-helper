<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from './Icon.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Icon',
		component: Icon,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'An icon component for displaying emoji or SVG icons.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{ name: 'Favorite Icon' }}>⭐</Story>

<Story name="Heart" args={{ name: 'Heart', size: 'lg' }}>❤️</Story>

<Story name="Settings" args={{ name: 'Settings', size: 'lg' }}>⚙️</Story>

<Story name="Checkmark" args={{ name: 'Check' }}>✓</Story>

<Story name="Spinning Icon">
	<Icon name="Loading" spin={true} size="lg">🔄</Icon>
</Story>

<Story name="Small Size" args={{ size: 'sm' }}>📧</Story>

<Story name="Large Size" args={{ size: 'lg' }}>📧</Story>

<Story name="XL Size" args={{ size: 'xl' }}>📧</Story>

<Story name="Custom Color" args={{ color: '#3b82f6' }}>🎨</Story>

<Story name="Icon Grid">
	<div class="icons-grid">
		<Icon size="lg">⭐</Icon>
		<Icon size="lg">❤️</Icon>
		<Icon size="lg">🎉</Icon>
		<Icon size="lg">🚀</Icon>
		<Icon size="lg">💡</Icon>
		<Icon size="lg">✅</Icon>
		<Icon size="lg">📱</Icon>
		<Icon size="lg">💻</Icon>
	</div>
</Story>

<Story name="All Sizes">
	<div class="sizes-container">
		<Icon size="xs">X</Icon>
		<Icon size="sm">S</Icon>
		<Icon size="base">M</Icon>
		<Icon size="lg">L</Icon>
		<Icon size="xl">XL</Icon>
		<Icon size="2xl">XXL</Icon>
	</div>
</Story>

<style>
	.icons-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}
	
	.sizes-container {
		display: flex;
		gap: 2rem;
		align-items: center;
	}
</style>
