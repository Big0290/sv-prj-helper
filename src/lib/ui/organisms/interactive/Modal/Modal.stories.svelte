<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from './Modal.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Interactive/Modal',
		component: Modal,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A modal dialog component with customizable sizes and behaviors.'
				}
			}
		}
	});
</script>

<Story name="Small Modal" args={{ open: true, size: 'sm', title: 'Small Modal' }}>
	<p>This is a small modal dialog.</p>
</Story>

<Story name="Medium Modal" args={{ open: true, size: 'md', title: 'Medium Modal' }}>
	<p>This is a medium-sized modal dialog with more content.</p>
</Story>

<Story name="Large Modal" args={{ open: true, size: 'lg', title: 'Large Modal' }}>
	<p>This is a large modal dialog with extensive content that can wrap to multiple lines.</p>
</Story>

<Story name="Confirmation" args={{ open: true, title: 'Confirm Action' }}>
	<p>Are you sure you want to proceed with this action?</p>
	<div class="actions">
		<button class="cancel-btn">Cancel</button>
		<button class="confirm-btn">Confirm</button>
	</div>
</Story>

<Story name="Information" args={{ open: true, title: 'Information', size: 'md' }}>
	<p>This is an informational modal to display important information to the user.</p>
	<ul>
		<li>First point of information</li>
		<li>Second point of information</li>
		<li>Third point of information</li>
	</ul>
</Story>

<style>
	.actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 2rem;
	}
	
	.actions button {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.cancel-btn {
		background: #e5e7eb;
		color: #374151;
	}
	
	.confirm-btn {
		background: var(--color-primary-500, #3b82f6);
		color: white;
	}
</style>
