<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Container from './Container.svelte';

	const { Story } = defineMeta({
		title: 'Layouts/Container',
		component: Container,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: 'A container component for centering and constraining content width.'
				}
			}
		}
	});
</script>

<Story name="Small" args={{ maxWidth: 'sm' }}>
	<div class="content-box">Small container (640px max)</div>
</Story>

<Story name="Medium" args={{ maxWidth: 'md' }}>
	<div class="content-box">Medium container (768px max)</div>
</Story>

<Story name="Large" args={{ maxWidth: 'lg' }}>
	<div class="content-box">Large container (1024px max)</div>
</Story>

<Story name="Extra Large" args={{ maxWidth: 'xl' }}>
	<div class="content-box">Extra Large container (1280px max)</div>
</Story>

<Story name="FullWidth" args={{ maxWidth: 'full' }}>
	<div class="content-box">Full width container (no max-width)</div>
</Story>

<Story name="WithoutPadding" args={{ padding: false }}>
	<div class="content-box">Container without padding</div>
</Story>

<Story name="ArticleLayout">
	<Container maxWidth="lg">
		<article class="article">
			<h1>Article Title</h1>
			<p>This demonstrates a typical article layout using the Container component to constrain the content width for better readability.</p>
			<p>The content is centered and has a maximum width that ensures optimal reading experience across different screen sizes.</p>
		</article>
	</Container>
</Story>

<Story name="AllSizesComparison">
	<div class="comparison-container">
		<Container maxWidth="sm">
			<div class="size-box small">Small</div>
		</Container>
		<Container maxWidth="md">
			<div class="size-box medium">Medium</div>
		</Container>
		<Container maxWidth="lg">
			<div class="size-box large">Large</div>
		</Container>
		<Container maxWidth="xl">
			<div class="size-box xlarge">Extra Large</div>
		</Container>
	</div>
</Story>

<style>
	.content-box {
		padding: 2rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		text-align: center;
	}
	
	.article {
		padding: 2rem 0;
		max-width: 100%;
	}
	
	.article h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	
	.article p {
		margin-bottom: 1rem;
		line-height: 1.6;
	}
	
	.comparison-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem 0;
	}
	
	.size-box {
		padding: 1rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		text-align: center;
		font-weight: 600;
	}
</style>
