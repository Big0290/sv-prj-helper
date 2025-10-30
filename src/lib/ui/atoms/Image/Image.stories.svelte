<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Image from './Image.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Image',
		component: Image,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'An enhanced image component with loading states, error handling, and fallback support.'
				}
			}
		}
	});
</script>

<Story name="Basic" args={{}}>
	<script>
		// Using placeholder image service
		const src = 'https://picsum.photos/400/300';
	</script>
	<Image src={src} alt="Random placeholder image" width="400px" height="300px" />
</Story>

<Story name="DifferentSizes">
	<div style="display: flex; gap: 1rem; align-items: flex-start;">
		<Image src="https://picsum.photos/200/200" alt="Small" width="200px" height="200px" />
		<Image src="https://picsum.photos/300/300" alt="Medium" width="300px" height="300px" />
		<Image src="https://picsum.photos/400/400" alt="Large" width="400px" height="400px" />
	</div>
</Story>

<Story name="FitCover">
	<Image 
		src="https://picsum.photos/400/300" 
		alt="Cover fit" 
		width="400px" 
		height="300px" 
		fit="cover"
	/>
</Story>

<Story name="FitContain">
	<Image 
		src="https://picsum.photos/400/300" 
		alt="Contain fit" 
		width="300px" 
		height="300px" 
		fit="contain"
	/>
</Story>

<Story name="WithFallback" args={{}}>
	<script>
		const invalidSrc = 'https://invalid-url.com/image.jpg';
		const fallback = 'https://picsum.photos/400/300';
	</script>
	<Image 
		src={invalidSrc} 
		fallback={fallback}
		alt="Image with fallback" 
		width="400px" 
		height="300px" 
	/>
</Story>

<Story name="AspectRatio">
	<div style="display: flex; gap: 1rem;">
		<Image src="https://picsum.photos/400/300" alt="4:3" width="200px" height="150px" />
		<Image src="https://picsum.photos/400/400" alt="1:1" width="200px" height="200px" />
		<Image src="https://picsum.photos/400/200" alt="2:1" width="200px" height="100px" />
	</div>
</Story>
