<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Rating from './Rating.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/Rating',
		component: Rating,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'An interactive rating component for displaying and collecting user ratings.'
				}
			}
		}
	});
</script>

<Story name="Interactive Rating">
	<div class="rating-container">
		<h3>Rate your experience</h3>
		<Rating 
			value={0} 
			max={5} 
			size="lg"
			onChange={(value) => console.log('Rating:', value)}
		/>
		<p class="rating-text">
			Click to rate
		</p>
		<button onclick={() => console.log('Submit rating')} class="submit-btn">
			Submit Rating
		</button>
	</div>
</Story>

<Story name="Read-only Ratings">
	<div class="ratings-container">
		<div class="rating-item">
			<span>Product Quality:</span>
			<Rating value={5} max={5} readonly size="md" />
			<span>4.8</span>
		</div>
		
		<div class="rating-item">
			<span>Customer Service:</span>
			<Rating value={4} max={5} readonly size="md" />
			<span>4.2</span>
		</div>
		
		<div class="rating-item">
			<span>Value for Money:</span>
			<Rating value={3} max={5} readonly size="md" />
			<span>3.5</span>
		</div>
	</div>
</Story>

<Story name="All Sizes">
	<div class="sizes-container">
		<div>
			<Rating value={4} max={5} size="sm" />
			<p>Small</p>
		</div>
		
		<div>
			<Rating value={4} max={5} size="md" />
			<p>Medium</p>
		</div>
		
		<div>
			<Rating value={4} max={5} size="lg" />
			<p>Large</p>
		</div>
	</div>
</Story>

<Story name="With Value Display">
	<Rating value={4} max={5} showValue size="lg" />
</Story>

<Story name="Customer Review">
	<div class="review-card">
		<div class="review-header">
			<div class="reviewer">
				<div class="reviewer-avatar">JS</div>
				<div class="reviewer-info">
					<h4>John Smith</h4>
					<p>Verified Buyer</p>
				</div>
			</div>
			<Rating value={5} max={5} readonly size="sm" />
		</div>
		<p class="review-text">
			"Excellent product! The quality exceeded my expectations. 
			Fast shipping and great customer service."
		</p>
		<p class="review-date">Reviewed on January 15, 2024</p>
	</div>
</Story>

<style>
	.rating-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
	}
	
	.rating-text {
		margin: 0;
		color: #666;
	}
	
	.submit-btn {
		padding: 0.75rem 1.5rem;
		background: var(--color-primary-500, #3b82f6);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	.ratings-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 300px;
	}
	
	.rating-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border-radius: 0.5rem;
	}
	
	.sizes-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
	
	.review-card {
		max-width: 400px;
		padding: 1.5rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border-radius: 1rem;
	}
	
	.review-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}
	
	.reviewer {
		display: flex;
		gap: 1rem;
	}
	
	.reviewer-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: bold;
	}
	
	.reviewer-info h4 {
		margin: 0;
		font-size: 1rem;
	}
	
	.reviewer-info p {
		margin: 0;
		font-size: 0.875rem;
		color: #666;
	}
	
	.review-text {
		margin: 1rem 0;
		line-height: 1.6;
	}
	
	.review-date {
		margin: 0;
		font-size: 0.875rem;
		color: #999;
	}
</style>
