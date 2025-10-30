<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './Avatar.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Avatar',
		component: Avatar,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'An avatar component for displaying user profile pictures or initials.'
				}
			}
		}
	});
</script>

<Story name="With Image" args={{ src: 'https://i.pravatar.cc/150?img=1' }} />

<Story name="With Initials" args={{ name: 'John Doe' }} />

<Story name="Small" args={{ size: 'sm', name: 'JD' }} />

<Story name="Medium" args={{ size: 'md', name: 'JD' }} />

<Story name="Large" args={{ size: 'lg', name: 'JD' }} />

<Story name="XL" args={{ size: 'xl', name: 'JD' }} />

<Story name="All Sizes">
	<div class="avatars-container">
		<Avatar size="sm" name="S" />
		<Avatar size="md" name="M" />
		<Avatar size="lg" name="L" />
		<Avatar size="xl" name="XL" />
	</div>
</Story>

<style>
	.avatars-container {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}
</style>
