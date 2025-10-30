<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Skeleton from './Skeleton.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/Skeleton',
		component: Skeleton,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A skeleton loader component for displaying placeholder content while loading.'
				}
			}
		}
	});
</script>

<Story name="Text" args={{ variant: 'text' }} />

<Story name="Circular" args={{ variant: 'circular' }} />

<Story name="Rectangular" args={{ variant: 'rectangular' }} />

<Story name="Card Skeleton">
	<div class="card-skeleton">
		<Skeleton variant="circular" width="60px" height="60px" />
		<div class="content">
			<Skeleton variant="text" width="70%" />
			<Skeleton variant="text" width="50%" />
		</div>
	</div>
</Story>

<Story name="Article Skeleton">
	<div class="article-skeleton">
		<Skeleton variant="text" width="100%" height="20px" />
		<Skeleton variant="text" width="100%" height="16px" />
		<Skeleton variant="text" width="80%" height="16px" />
		<div style="margin-top: 1rem;">
			<Skeleton variant="rectangular" width="100%" height="200px" />
		</div>
	</div>
</Story>

<Story name="List Skeleton">
	<div class="list-skeleton">
		{#each Array(5) as _}
			<div class="list-item">
				<Skeleton variant="circular" width="40px" height="40px" />
				<div class="text-group">
					<Skeleton variant="text" width="150px" height="14px" />
					<Skeleton variant="text" width="100px" height="12px" />
				</div>
			</div>
		{/each}
	</div>
</Story>

<style>
	.card-skeleton {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		width: 300px;
	}
	
	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.article-skeleton {
		width: 100%;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.list-skeleton {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 300px;
	}
	
	.list-item {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	
	.text-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
