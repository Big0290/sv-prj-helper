<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Stack from './Stack.svelte';

	const { Story } = defineMeta({
		title: 'Layouts/Stack',
		component: Stack,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: 'A stack layout component for flexible box layouts with various alignment options.'
				}
			}
		}
	});
</script>

<Story name="Column" args={{ direction: 'column' }}>
	<div class="stack-item">Item 1</div>
	<div class="stack-item">Item 2</div>
	<div class="stack-item">Item 3</div>
</Story>

<Story name="Row" args={{ direction: 'row' }}>
	<div class="stack-item">Item 1</div>
	<div class="stack-item">Item 2</div>
	<div class="stack-item">Item 3</div>
</Story>

<Story name="CardLayout">
	<Stack direction="column" gap="4">
		<div class="card-header">
			<h2>Card Title</h2>
		</div>
		<div class="card-content">
			<p>This is the main content of the card. It can contain any number of paragraphs and other elements.</p>
		</div>
		<div class="card-footer">
			<button class="card-button">Action</button>
		</div>
	</Stack>
</Story>

<Story name="NavigationBar">
	<Stack direction="row" gap="8" justify="between" align="center">
		<div class="logo">Logo</div>
		<Stack direction="row" gap="4">
			<span class="nav-link">Home</span>
			<span class="nav-link">About</span>
			<span class="nav-link">Contact</span>
		</Stack>
		<button class="nav-button">Sign In</button>
	</Stack>
</Story>

<Story name="FormLayout">
	<Stack direction="column" gap="6">
		<div class="form-field">
			<label>Email</label>
			<input type="email" placeholder="Enter email" class="form-input" />
		</div>
		<div class="form-field">
			<label>Password</label>
			<input type="password" placeholder="Enter password" class="form-input" />
		</div>
		<Stack direction="row" gap="4" justify="between" align="center">
			<label class="checkbox-label">
				<input type="checkbox" />
				Remember me
			</label>
			<button class="submit-button">Sign In</button>
		</Stack>
	</Stack>
</Story>

<Story name="CenteredContent">
	<Stack align="center" justify="center" gap="4">
		<div class="stack-item large">Centered Item</div>
	</Stack>
</Story>

<Story name="SpaceBetween">
	<Stack direction="row" justify="between" align="center">
		<span>Left Content</span>
		<span>Right Content</span>
	</Stack>
</Story>

<Story name="WrappedItems">
	<Stack direction="row" gap="4" wrap={true} style="max-width: 400px;">
		{#each Array(8) as _, i}
			<div class="chip">Tag {i + 1}</div>
		{/each}
	</Stack>
</Story>

<style>
	.stack-item {
		padding: 1rem 2rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		text-align: center;
	}
	
	.stack-item.large {
		padding: 3rem 4rem;
		font-size: 1.5rem;
	}
	
	.card-header,
	.card-content,
	.card-footer {
		padding: 1rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
	}
	
	.card-button {
		padding: 0.75rem 1.5rem;
		background: var(--color-primary-500, #3b82f6);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.logo {
		font-size: 1.5rem;
		font-weight: bold;
	}
	
	.nav-link {
		cursor: pointer;
		padding: 0.5rem;
	}
	
	.nav-button {
		padding: 0.5rem 1rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		cursor: pointer;
	}
	
	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.form-field label {
		font-size: 0.875rem;
		font-weight: 600;
	}
	
	.form-input {
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.05));
	}
	
	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
	
	.submit-button {
		padding: 0.75rem 1.5rem;
		background: var(--color-primary-500, #3b82f6);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.chip {
		padding: 0.5rem 1rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1rem;
		font-size: 0.875rem;
	}
</style>
