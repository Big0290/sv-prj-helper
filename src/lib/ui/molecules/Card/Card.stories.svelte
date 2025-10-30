<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/Card',
		component: Card,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A versatile card component with multiple variants, padding options, and interactive states.'
				}
			}
		}
	});
</script>

<Story name="Product Card">
	<script>
		let isFavorite = $state(false);
		let quantity = $state(1);
		
		function toggleFavorite() {
			isFavorite = !isFavorite;
		}
		
		function addToCart() {
			alert(`Added ${quantity} item(s) to cart!`);
		}
	</script>
	
	<Card class="product-card">
		<div class="product-image">🖼️</div>
		<h3>Premium Wireless Headphones</h3>
		<p class="price">$199.99</p>
		<p class="description">High-quality audio with noise cancellation</p>
		
		<div class="product-actions">
			<button class="favorite-btn" onclick={toggleFavorite}>
				{isFavorite ? '❤️' : '🤍'}
			</button>
			<button class="add-btn" onclick={addToCart}>Add to Cart</button>
		</div>
	</Card>
</Story>

<Story name="All Variants">
	<div class="variants-container">
		<Card variant="default">
			<h4>Default Card</h4>
			<p>This is the default card style with glass morphism effect.</p>
		</Card>
		
		<Card variant="elevated">
			<h4>Elevated Card</h4>
			<p>This card has enhanced shadow for more depth.</p>
		</Card>
		
		<Card variant="outlined">
			<h4>Outlined Card</h4>
			<p>This card uses a border instead of glass effect.</p>
		</Card>
	</div>
</Story>

<Story name="Interactive Card">
	<script>
		function handleClick() {
			alert('Card clicked!');
		}
	</script>
	
	<Card interactive onclick={handleClick}>
		<h4>Click Me!</h4>
		<p>This card responds to clicks and has hover effects.</p>
	</Card>
</Story>

<Story name="Profile Card">
	<Card class="profile-card">
		<div class="avatar">👤</div>
		<h3>John Doe</h3>
		<p class="role">Senior Developer</p>
		<div class="stats">
			<div class="stat">
				<span class="stat-value">127</span>
				<span class="stat-label">Projects</span>
			</div>
			<div class="stat">
				<span class="stat-value">1.2K</span>
				<span class="stat-label">Followers</span>
			</div>
			<div class="stat">
				<span class="stat-value">89</span>
				<span class="stat-label">Following</span>
			</div>
		</div>
	</Card>
</Story>

<Story name="With Different Padding">
	<div class="padding-container">
		<Card padding="sm">
			<h4>Small Padding</h4>
			<p>Compact card with minimal padding.</p>
		</Card>
		
		<Card padding="md">
			<h4>Medium Padding</h4>
			<p>Standard card with balanced padding.</p>
		</Card>
		
		<Card padding="lg">
			<h4>Large Padding</h4>
			<p>Spacious card with generous padding.</p>
		</Card>
	</div>
</Story>

<style>
	.variants-container,
	.padding-container {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		width: 100%;
		max-width: 900px;
	}
	
	.product-card {
		max-width: 300px;
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
	
	.description {
		color: #666;
		margin-bottom: 1rem;
	}
	
	.product-actions {
		display: flex;
		gap: 0.5rem;
	}
	
	.favorite-btn {
		padding: 0.5rem;
		border: none;
		background: transparent;
		cursor: pointer;
		font-size: 1.5rem;
	}
	
	.add-btn {
		flex: 1;
		padding: 0.5rem 1rem;
		background: var(--color-primary-500, #3b82f6);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.profile-card {
		max-width: 300px;
		text-align: center;
	}
	
	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		margin: 0 auto 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}
	
	.profile-card h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1.5rem;
	}
	
	.role {
		color: #666;
		margin-bottom: 1.5rem;
	}
	
	.stats {
		display: flex;
		justify-content: space-around;
		padding-top: 1rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.stat {
		display: flex;
		flex-direction: column;
	}
	
	.stat-value {
		font-size: 1.25rem;
		font-weight: bold;
	}
	
	.stat-label {
		font-size: 0.875rem;
		color: #666;
	}
</style>
