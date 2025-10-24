<script lang="ts">
	interface Props {
		tags?: string[];
		placeholder?: string;
		maxTags?: number;
		allowDuplicates?: boolean;
		onAdd?: (tag: string) => void;
		onRemove?: (tag: string) => void;
		disabled?: boolean;
	}

	let {
		tags = $bindable([]),
		placeholder = 'Add tags...',
		maxTags = 0,
		allowDuplicates = false,
		onAdd,
		onRemove,
		disabled = false
	}: Props = $props();

	let inputValue = $state('');
	let inputElement = $state<HTMLInputElement>();

	function addTag() {
		const tag = inputValue.trim();
		
		if (!tag) return;
		if (maxTags > 0 && tags.length >= maxTags) return;
		if (!allowDuplicates && tags.includes(tag)) return;
		
		tags = [...tags, tag];
		inputValue = '';
		onAdd?.(tag);
	}

	function removeTag(index: number) {
		const tag = tags[index];
		tags = tags.filter((_, i) => i !== index);
		onRemove?.(tag);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag();
		} else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
			removeTag(tags.length - 1);
		}
	}

	const canAddMore = $derived(maxTags === 0 || tags.length < maxTags);
</script>

<div class="tag-input-wrapper" class:disabled>
	<div class="tag-input-container">
		<div class="tags">
			{#each tags as tag, i}
				<div class="tag">
					<span class="tag-text">{tag}</span>
					<button
						type="button"
						class="tag-remove"
						onclick={() => removeTag(i)}
						{disabled}
						aria-label={`Remove ${tag}`}
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</button>
				</div>
			{/each}
		</div>
		
		{#if canAddMore}
			<input
				bind:this={inputElement}
				bind:value={inputValue}
				type="text"
				class="tag-input"
				{placeholder}
				{disabled}
				onkeydown={handleKeydown}
				aria-label="Add tag"
			/>
		{/if}
	</div>
	
	{#if maxTags > 0}
		<div class="tag-count">
			{tags.length} / {maxTags}
		</div>
	{/if}
</div>

<style>
	.tag-input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.tag-input-wrapper.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.tag-input-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		min-height: 42px;
		transition: all var(--transition-normal);
	}

	.tag-input-container:focus-within {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-2);
	}

	.tag {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-1-5);
		padding: var(--spacing-1) var(--spacing-2);
		background: rgba(139, 92, 246, 0.15);
		border: 1px solid rgba(139, 92, 246, 0.3);
		border-radius: var(--radius-md);
		color: var(--color-primary-300);
		font-size: var(--font-size-sm);
		animation: scaleIn 0.2s ease-out;
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.tag-text {
		line-height: 1;
	}

	.tag-remove {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		background: transparent;
		border: none;
		color: var(--color-primary-400);
		cursor: pointer;
		transition: all var(--transition-fast);
		border-radius: var(--radius-sm);
	}

	.tag-remove:hover:not(:disabled) {
		color: var(--color-danger-400);
		background: rgba(239, 68, 68, 0.1);
	}

	.tag-remove:disabled {
		cursor: not-allowed;
	}

	.tag-input {
		flex: 1;
		min-width: 120px;
		padding: var(--spacing-1);
		background: transparent;
		border: none;
		color: var(--color-neutral-50);
		font-size: var(--font-size-sm);
		outline: none;
	}

	.tag-input::placeholder {
		color: var(--color-neutral-500);
	}

	.tag-input:disabled {
		cursor: not-allowed;
	}

	.tag-count {
		text-align: right;
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
	}
</style>
