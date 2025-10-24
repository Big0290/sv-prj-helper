<script lang="ts">
	import { marked } from 'marked';
	
	interface Props {
		value?: string;
		placeholder?: string;
		minHeight?: string;
		maxHeight?: string;
		showPreview?: boolean;
		previewMode?: 'side' | 'tabs';
		disabled?: boolean;
		toolbar?: boolean;
		onValueChange?: (value: string) => void;
	}

	let {
		value = $bindable(''),
		placeholder = 'Write markdown...',
		minHeight = '400px',
		maxHeight = '600px',
		showPreview = true,
		previewMode = 'side',
		disabled = false,
		toolbar = true,
		onValueChange
	}: Props = $props();

	let activeTab = $state<'write' | 'preview'>('write');
	let textareaEl = $state<HTMLTextAreaElement>();

	// Configure marked for safe rendering
	marked.setOptions({
		gfm: true,
		breaks: true
	});

	const html = $derived(() => {
		try {
			return marked.parse(value || '');
		} catch (e) {
			return '<p>Error parsing markdown</p>';
		}
	});

	function insertMarkdown(before: string, after: string = '') {
		if (!textareaEl) return;
		
		const start = textareaEl.selectionStart;
		const end = textareaEl.selectionEnd;
		const selectedText = value.substring(start, end);
		const beforeText = value.substring(0, start);
		const afterText = value.substring(end);
		
		value = beforeText + before + selectedText + after + afterText;
		
		// Set cursor position after insertion
		setTimeout(() => {
			const newPos = start + before.length + selectedText.length;
			textareaEl.setSelectionRange(newPos, newPos);
			textareaEl.focus();
		}, 0);
		
		onValueChange?.(value);
	}

	function insertAtLine(text: string) {
		if (!textareaEl) return;
		
		const start = textareaEl.selectionStart;
		const beforeText = value.substring(0, start);
		const lineStart = beforeText.lastIndexOf('\n') + 1;
		
		value = value.substring(0, lineStart) + text + value.substring(lineStart);
		
		setTimeout(() => {
			const newPos = lineStart + text.length;
			textareaEl.setSelectionRange(newPos, newPos);
			textareaEl.focus();
		}, 0);
		
		onValueChange?.(value);
	}

	function handleInput() {
		onValueChange?.(value);
	}
</script>

<div class="markdown-editor" class:disabled>
	{#if toolbar}
		<div class="toolbar">
			<button class="toolbar-btn" onclick={() => insertMarkdown('**', '**')} title="Bold" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
				</svg>
			</button>
			<button class="toolbar-btn" onclick={() => insertMarkdown('*', '*')} title="Italic" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="19" y1="4" x2="10" y2="4" />
					<line x1="14" y1="20" x2="5" y2="20" />
					<line x1="15" y1="4" x2="9" y2="20" />
				</svg>
			</button>
			<button class="toolbar-btn" onclick={() => insertMarkdown('~~', '~~')} title="Strikethrough" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="4" y1="12" x2="20" y2="12" />
					<path d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6" />
				</svg>
			</button>

			<div class="toolbar-divider"></div>

			<button class="toolbar-btn" onclick={() => insertAtLine('# ')} title="Heading 1" type="button">H1</button>
			<button class="toolbar-btn" onclick={() => insertAtLine('## ')} title="Heading 2" type="button">H2</button>
			<button class="toolbar-btn" onclick={() => insertAtLine('### ')} title="Heading 3" type="button">H3</button>

			<div class="toolbar-divider"></div>

			<button class="toolbar-btn" onclick={() => insertMarkdown('`', '`')} title="Inline Code" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="16 18 22 12 16 6" />
					<polyline points="8 6 2 12 8 18" />
				</svg>
			</button>
			<button class="toolbar-btn" onclick={() => insertMarkdown('```\n', '\n```')} title="Code Block" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="3" width="18" height="18" rx="2" />
					<polyline points="10 8 14 12 10 16" />
				</svg>
			</button>

			<div class="toolbar-divider"></div>

			<button class="toolbar-btn" onclick={() => insertMarkdown('[', '](url)')} title="Link" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
				</svg>
			</button>
			<button class="toolbar-btn" onclick={() => insertMarkdown('![alt](', ')')} title="Image" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="3" width="18" height="18" rx="2" />
					<circle cx="8.5" cy="8.5" r="1.5" />
					<polyline points="21 15 16 10 5 21" />
				</svg>
			</button>

			<div class="toolbar-divider"></div>

			<button class="toolbar-btn" onclick={() => insertAtLine('- ')} title="Bullet List" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="8" y1="6" x2="21" y2="6" />
					<line x1="8" y1="12" x2="21" y2="12" />
					<line x1="8" y1="18" x2="21" y2="18" />
					<line x1="3" y1="6" x2="3.01" y2="6" />
					<line x1="3" y1="12" x2="3.01" y2="12" />
					<line x1="3" y1="18" x2="3.01" y2="18" />
				</svg>
			</button>
			<button class="toolbar-btn" onclick={() => insertAtLine('1. ')} title="Numbered List" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="10" y1="6" x2="21" y2="6" />
					<line x1="10" y1="12" x2="21" y2="12" />
					<line x1="10" y1="18" x2="21" y2="18" />
					<path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
				</svg>
			</button>
			<button class="toolbar-btn" onclick={() => insertAtLine('- [ ] ')} title="Task List" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="5" width="6" height="6" />
					<path d="M21 12H13M21 6H13M21 18H13M11 13L9 15L7 13" />
				</svg>
			</button>

			<div class="toolbar-divider"></div>

			<button class="toolbar-btn" onclick={() => insertMarkdown('> ')} title="Quote" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
					<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
				</svg>
			</button>
			<button class="toolbar-btn" onclick={() => insertMarkdown('\n---\n')} title="Horizontal Rule" type="button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="4" y1="12" x2="20" y2="12" />
				</svg>
			</button>

			{#if showPreview && previewMode === 'tabs'}
				<div class="toolbar-divider"></div>
				<div class="tab-buttons">
					<button 
						class="tab-btn" 
						class:active={activeTab === 'write'} 
						onclick={() => activeTab = 'write'}
						type="button"
					>
						Write
					</button>
					<button 
						class="tab-btn" 
						class:active={activeTab === 'preview'} 
						onclick={() => activeTab = 'preview'}
						type="button"
					>
						Preview
					</button>
				</div>
			{/if}
		</div>
	{/if}

	<div class="editor-container" class:split={showPreview && previewMode === 'side'}>
		{#if !showPreview || previewMode === 'side' || activeTab === 'write'}
			<div class="editor-pane">
				<textarea
					bind:this={textareaEl}
					bind:value
					{placeholder}
					{disabled}
					class="textarea"
					style="min-height: {minHeight}; max-height: {maxHeight};"
					oninput={handleInput}
					spellcheck="false"
				></textarea>
			</div>
		{/if}

		{#if showPreview && ((previewMode === 'side') || (previewMode === 'tabs' && activeTab === 'preview'))}
			<div class="preview-pane">
				<div class="preview-content" style="min-height: {minHeight}; max-height: {maxHeight};">
					{@html html()}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.markdown-editor {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.markdown-editor.disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	.toolbar {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
		padding: var(--spacing-2);
		border-bottom: 1px solid var(--glass-border);
		background: rgba(255, 255, 255, 0.02);
		flex-wrap: wrap;
	}

	.toolbar-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 32px;
		height: 32px;
		padding: 0 var(--spacing-2);
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
	}

	.toolbar-btn:hover {
		background: var(--glass-bg-hover);
		border-color: var(--glass-border);
		color: var(--text-primary);
	}

	.toolbar-divider {
		width: 1px;
		height: 24px;
		background: var(--glass-border);
		margin: 0 var(--spacing-1);
	}

	.tab-buttons {
		display: flex;
		gap: var(--spacing-1);
		margin-left: auto;
	}

	.tab-btn {
		padding: var(--spacing-2) var(--spacing-3);
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
	}

	.tab-btn:hover {
		color: var(--text-primary);
		background: var(--glass-bg-hover);
	}

	.tab-btn.active {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	.editor-container {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	.editor-container.split {
		gap: 0;
	}

	.editor-pane {
		flex: 1;
		display: flex;
		flex-direction: column;
		border-right: 1px solid var(--glass-border);
	}

	.editor-container.split .editor-pane {
		width: 50%;
	}

	.textarea {
		flex: 1;
		width: 100%;
		padding: var(--spacing-4);
		background: transparent;
		border: none;
		color: var(--text-primary);
		font-family: var(--font-family-mono, 'Monaco', 'Courier New', monospace);
		font-size: var(--font-size-sm);
		line-height: 1.6;
		resize: vertical;
		outline: none;
		overflow-y: auto;
	}

	.textarea::placeholder {
		color: var(--text-tertiary);
	}

	.preview-pane {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: rgba(0, 0, 0, 0.02);
	}

	.editor-container.split .preview-pane {
		width: 50%;
	}

	.preview-content {
		flex: 1;
		padding: var(--spacing-4);
		color: var(--text-primary);
		font-size: var(--font-size-base);
		line-height: 1.6;
		overflow-y: auto;
	}

	/* Markdown Preview Styles */
	.preview-content :global(h1) {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		margin-top: var(--spacing-6);
		margin-bottom: var(--spacing-4);
		border-bottom: 2px solid var(--glass-border);
		padding-bottom: var(--spacing-2);
	}

	.preview-content :global(h2) {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		margin-top: var(--spacing-5);
		margin-bottom: var(--spacing-3);
	}

	.preview-content :global(h3) {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		margin-top: var(--spacing-4);
		margin-bottom: var(--spacing-2);
	}

	.preview-content :global(h4),
	.preview-content :global(h5),
	.preview-content :global(h6) {
		font-weight: var(--font-weight-semibold);
		margin-top: var(--spacing-3);
		margin-bottom: var(--spacing-2);
	}

	.preview-content :global(p) {
		margin: var(--spacing-3) 0;
	}

	.preview-content :global(a) {
		color: var(--color-primary);
		text-decoration: underline;
	}

	.preview-content :global(a:hover) {
		color: var(--color-primary-600);
	}

	.preview-content :global(ul),
	.preview-content :global(ol) {
		margin: var(--spacing-3) 0;
		padding-left: var(--spacing-6);
	}

	.preview-content :global(li) {
		margin: var(--spacing-1) 0;
	}

	.preview-content :global(code) {
		background: rgba(0, 0, 0, 0.1);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		font-family: var(--font-family-mono, monospace);
		font-size: 0.9em;
	}

	.preview-content :global(pre) {
		background: rgba(0, 0, 0, 0.2);
		padding: var(--spacing-4);
		border-radius: var(--radius-md);
		overflow-x: auto;
		margin: var(--spacing-3) 0;
	}

	.preview-content :global(pre code) {
		background: none;
		padding: 0;
	}

	.preview-content :global(blockquote) {
		border-left: 4px solid var(--color-primary);
		padding-left: var(--spacing-4);
		margin: var(--spacing-3) 0;
		color: var(--text-secondary);
		font-style: italic;
	}

	.preview-content :global(hr) {
		border: none;
		border-top: 2px solid var(--glass-border);
		margin: var(--spacing-5) 0;
	}

	.preview-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: var(--spacing-3) 0;
	}

	.preview-content :global(th),
	.preview-content :global(td) {
		border: 1px solid var(--glass-border);
		padding: var(--spacing-2) var(--spacing-3);
		text-align: left;
	}

	.preview-content :global(th) {
		background: rgba(0, 0, 0, 0.1);
		font-weight: var(--font-weight-semibold);
	}

	.preview-content :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: var(--radius-md);
		margin: var(--spacing-3) 0;
	}

	.preview-content :global(input[type="checkbox"]) {
		margin-right: var(--spacing-2);
	}

	@media (max-width: 768px) {
		.editor-container.split {
			flex-direction: column;
		}

		.editor-container.split .editor-pane,
		.editor-container.split .preview-pane {
			width: 100%;
		}

		.editor-pane {
			border-right: none;
			border-bottom: 1px solid var(--glass-border);
		}
	}
</style>
