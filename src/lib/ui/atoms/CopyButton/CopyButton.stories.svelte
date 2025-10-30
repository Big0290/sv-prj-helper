<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CopyButton from './CopyButton.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/CopyButton',
		component: CopyButton,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A button component that copies text to clipboard with visual feedback.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<CopyButton value="This text will be copied" />
</Story>

<Story name="CopyCode">
	<div class="code-block-container">
		<code>npm install svelte</code>
		<CopyButton value="npm install svelte" />
	</div>
</Story>

<Story name="CopyURL">
	<div class="url-container">
		<span>https://svelte.dev/docs</span>
		<CopyButton value="https://svelte.dev/docs" />
	</div>
</Story>

<Story name="CopyEmail">
	<div class="email-container">
		<span>contact@example.com</span>
		<CopyButton value="contact@example.com" />
	</div>
</Story>

<Story name="DefaultVariant">
	<CopyButton value="Click to copy" variant="default" />
</Story>

<Story name="GhostVariant">
	<CopyButton value="Ghost style" variant="ghost" />
</Story>

<Story name="IconOnly">
	<CopyButton value="Icon only button" variant="icon" />
</Story>

<Story name="Small">
	<CopyButton value="Small button" size="sm" />
</Story>

<Story name="Medium">
	<CopyButton value="Medium button" size="md" />
</Story>

<Story name="Large">
	<CopyButton value="Large button" size="lg" />
</Story>

<Story name="AllVariants">
	<div class="variants-container">
		<CopyButton value="Default" variant="default" />
		<CopyButton value="Ghost" variant="ghost" />
		<CopyButton value="Icon" variant="icon" />
	</div>
</Story>

<Story name="AllSizes">
	<div class="sizes-container">
		<CopyButton value="Small" size="sm" />
		<CopyButton value="Medium" size="md" />
		<CopyButton value="Large" size="lg" />
	</div>
</Story>

<style>
	.code-block-container,
	.url-container,
	.email-container {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
	}
	
	.code-block-container code,
	.url-container span,
	.email-container span {
		font-family: monospace;
		flex: 1;
	}
	
	.variants-container,
	.sizes-container {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
