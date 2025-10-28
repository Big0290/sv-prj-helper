<script lang="ts">
	import { Card, Button, Text, Flex } from '$lib/ui';
	import CodeEditor from './CodeEditor.svelte';
	import LivePreview from './LivePreview.svelte';
	import CopyButton from './CopyButton.svelte';

	interface Props {
		code: string;
		language?: string;
		copyable?: boolean;
		live?: boolean;
		title?: string;
		description?: string;
		height?: string;
	}

	let { 
		code,
		language = 'javascript',
		copyable = false,
		live = false,
		title,
		description,
		height = '200px'
	}: Props = $props();

	let showPreview = $state(false);

	function togglePreview() {
		showPreview = !showPreview;
	}
</script>

<div class="code-example">
	{#if title || description || copyable || live}
		<div class="example-header">
			<div class="example-info">
				{#if title}
					<Text weight="medium">{title}</Text>
				{/if}
				{#if description}
					<Text size="sm" color="var(--text-secondary)">{description}</Text>
				{/if}
			</div>
			
			<div class="example-actions">
				{#if live && language === 'svelte'}
					<Button 
						variant="ghost" 
						size="sm"
						onclick={togglePreview}
					>
						{showPreview ? 'Hide' : 'Show'} Preview
					</Button>
				{/if}
				
				{#if copyable}
					<CopyButton text={code} />
				{/if}
			</div>
		</div>
	{/if}

	<div class="example-content">
		{#if showPreview && live}
			<div class="preview-layout">
				<div class="code-panel">
					<CodeEditor 
						value={code}
						{language}
						readonly={true}
						{height}
					/>
				</div>
				<div class="preview-panel">
					<Card class="preview-container">
						<div class="preview-header">
							<Text size="sm" weight="medium">Live Preview</Text>
						</div>
						<div class="preview-content">
							<LivePreview {code} />
						</div>
					</Card>
				</div>
			</div>
		{:else}
			<CodeEditor 
				value={code}
				{language}
				readonly={true}
				{height}
			/>
		{/if}
	</div>
</div>

<style>
	.code-example {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.example-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		padding: 0.5rem 0;
	}

	.example-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.example-actions {
		display: flex;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.example-content {
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.preview-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		min-height: 300px;
	}

	.code-panel,
	.preview-panel {
		display: flex;
		flex-direction: column;
	}

	:global(.preview-container) {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.preview-header {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-color);
		background: var(--bg-secondary);
	}

	.preview-content {
		flex: 1;
		padding: 1rem;
		min-height: 200px;
	}

	@media (max-width: 768px) {
		.example-header {
			flex-direction: column;
			align-items: stretch;
			gap: 0.75rem;
		}

		.example-actions {
			justify-content: flex-end;
		}

		.preview-layout {
			grid-template-columns: 1fr;
		}
	}
</style>