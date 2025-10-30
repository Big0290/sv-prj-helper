<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Grid from './Grid.svelte';

	const { Story } = defineMeta({
		title: 'Layouts/Grid',
		component: Grid,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: 'A grid layout component for creating responsive grid layouts.'
				}
			}
		}
	});
</script>

<Story name="TwoColumns" args={{ cols: '2' }}>
	{#each Array(4) as _}
		<div class="grid-item">Item</div>
	{/each}
</Story>

<Story name="ThreeColumns" args={{ cols: '3' }}>
	{#each Array(6) as _}
		<div class="grid-item">Item</div>
	{/each}
</Story>

<Story name="FourColumns" args={{ cols: '4' }}>
	{#each Array(8) as _}
		<div class="grid-item">Item</div>
	{/each}
</Story>

<Story name="ProductGrid">
	<Grid cols="3" gap="6">
		{#each Array(6) as _, i}
			<div class="product-card">
				<div class="product-image">🖼️</div>
				<h3>Product {i + 1}</h3>
				<p class="price">$99.99</p>
				<button class="add-button">Add to Cart</button>
			</div>
		{/each}
	</Grid>
</Story>

<Story name="DashboardCards">
	<Grid cols="4" gap="4">
		<div class="dashboard-card">
			<h4>Users</h4>
			<p class="stat">1,234</p>
		</div>
		<div class="dashboard-card">
			<h4>Revenue</h4>
			<p class="stat">$45,678</p>
		</div>
		<div class="dashboard-card">
			<h4>Orders</h4>
			<p class="stat">567</p>
		</div>
		<div class="dashboard-card">
			<h4>Products</h4>
			<p class="stat">89</p>
		</div>
	</Grid>
</Story>

<Story name="GalleryLayout">
	<Grid cols="6" gap="2">
		{#each Array(12) as _}
			<div class="gallery-item">📷</div>
		{/each}
	</Grid>
</Story>

<Story name="DifferentGaps">
	<div class="gaps-comparison">
		<div>
			<h4>Gap 2</h4>
			<Grid cols="3" gap="2">
				{#each Array(3) as _}
					<div class="grid-item">Item</div>
				{/each}
			</Grid>
		</div>
		<div>
			<h4>Gap 4</h4>
			<Grid cols="3" gap="4">
				{#each Array(3) as _}
					<div class="grid-item">Item</div>
				{/each}
			</Grid>
		</div>
		<div>
			<h4>Gap 8</h4>
			<Grid cols="3" gap="8">
				{#each Array(3) as _}
					<div class="grid-item">Item</div>
				{/each}
			</Grid>
		</div>
	</div>
</Story>

<style>
	.grid-item {
		padding: 2rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		text-align: center;
	}
	
	.product-card {
		padding: 1rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
	}
	
	.product-image {
		width: 100%;
		height: 200px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 4rem;
		margin-bottom: 1rem;
	}
	
	.product-card h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
	}
	
	.price {
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--color-primary-600, #2563eb);
		margin: 0.5rem 0;
	}
	
	.add-button {
		width: 100%;
		padding: 0.75rem;
		background: var(--color-primary-500, #3b82f6);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.dashboard-card {
		padding: 1.5rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
	}
	
	.dashboard-card h4 {
		margin: 0 0 0.5rem 0;
		font-size: 0.875rem;
		color: #666;
	}
	
	.stat {
		margin: 0;
		font-size: 2rem;
		font-weight: bold;
	}
	
	.gallery-item {
		aspect-ratio: 1;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}
	
	.gaps-comparison {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	
	.gaps-comparison h4 {
		margin: 0 0 1rem 0;
		font-size: 1rem;
	}
</style>
