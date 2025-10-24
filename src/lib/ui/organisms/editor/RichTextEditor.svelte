<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		minHeight?: string;
	}

	let {
		value = $bindable(''),
		placeholder = 'Start typing...',
		disabled = false,
		minHeight = '200px'
	}: Props = $props();

	let editorEl: HTMLDivElement;

	function execCommand(command: string, value: string | undefined = undefined) {
		document.execCommand(command, false, value);
		editorEl?.focus();
	}

	function handleInput() {
		if (editorEl) {
			value = editorEl.innerHTML;
		}
	}

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		const text = e.clipboardData?.getData('text/plain');
		if (text) {
			document.execCommand('insertText', false, text);
		}
	}

	$effect(() => {
		if (editorEl && editorEl.innerHTML !== value) {
			editorEl.innerHTML = value;
		}
	});
</script>

<div class="rich-text-editor" class:disabled>
	<div class="toolbar">
		<button class="toolbar-btn" onclick={() => execCommand('bold')} title="Bold" type="button">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
			</svg>
		</button>
		<button class="toolbar-btn" onclick={() => execCommand('italic')} title="Italic" type="button">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="19" y1="4" x2="10" y2="4" />
				<line x1="14" y1="20" x2="5" y2="20" />
				<line x1="15" y1="4" x2="9" y2="20" />
			</svg>
		</button>
		<button class="toolbar-btn" onclick={() => execCommand('underline')} title="Underline" type="button">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16" />
			</svg>
		</button>

		<div class="toolbar-divider"></div>

		<button class="toolbar-btn" onclick={() => execCommand('insertUnorderedList')} title="Bullet List" type="button">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="8" y1="6" x2="21" y2="6" />
				<line x1="8" y1="12" x2="21" y2="12" />
				<line x1="8" y1="18" x2="21" y2="18" />
				<line x1="3" y1="6" x2="3.01" y2="6" />
				<line x1="3" y1="12" x2="3.01" y2="12" />
				<line x1="3" y1="18" x2="3.01" y2="18" />
			</svg>
		</button>
		<button class="toolbar-btn" onclick={() => execCommand('insertOrderedList')} title="Numbered List" type="button">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="10" y1="6" x2="21" y2="6" />
				<line x1="10" y1="12" x2="21" y2="12" />
				<line x1="10" y1="18" x2="21" y2="18" />
				<path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
			</svg>
		</button>

		<div class="toolbar-divider"></div>

		<button class="toolbar-btn" onclick={() => execCommand('justifyLeft')} title="Align Left" type="button">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="17" y1="10" x2="3" y2="10" />
				<line x1="21" y1="6" x2="3" y2="6" />
				<line x1="21" y1="14" x2="3" y2="14" />
				<line x1="17" y1="18" x2="3" y2="18" />
			</svg>
		</button>
		<button class="toolbar-btn" onclick={() => execCommand('justifyCenter')} title="Align Center" type="button">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="18" y1="10" x2="6" y2="10" />
				<line x1="21" y1="6" x2="3" y2="6" />
				<line x1="21" y1="14" x2="3" y2="14" />
				<line x1="18" y1="18" x2="6" y2="18" />
			</svg>
		</button>
		<button class="toolbar-btn" onclick={() => execCommand('justifyRight')} title="Align Right" type="button">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="21" y1="10" x2="7" y2="10" />
				<line x1="21" y1="6" x2="3" y2="6" />
				<line x1="21" y1="14" x2="3" y2="14" />
				<line x1="21" y1="18" x2="7" y2="18" />
			</svg>
		</button>
	</div>

	<div
		bind:this={editorEl}
		class="editor"
		contenteditable={!disabled}
		data-placeholder={placeholder}
		style="min-height: {minHeight};"
		oninput={handleInput}
		onpaste={handlePaste}
		role="textbox"
		aria-multiline="true"
	></div>
</div>

<style>
	.rich-text-editor {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.rich-text-editor.disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	.toolbar {
		display: flex;
		gap: var(--spacing-1);
		padding: var(--spacing-2);
		border-bottom: 1px solid var(--glass-border);
		background: rgba(255, 255, 255, 0.02);
	}

	.toolbar-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
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
		margin: 0 var(--spacing-2);
		align-self: center;
	}

	.editor {
		padding: var(--spacing-4);
		color: var(--text-primary);
		font-size: var(--font-size-base);
		line-height: 1.6;
		outline: none;
		overflow-y: auto;
	}

	.editor:empty:before {
		content: attr(data-placeholder);
		color: var(--text-tertiary);
		pointer-events: none;
	}

	.editor :global(b),
	.editor :global(strong) {
		font-weight: var(--font-weight-bold);
	}

	.editor :global(i),
	.editor :global(em) {
		font-style: italic;
	}

	.editor :global(u) {
		text-decoration: underline;
	}

	.editor :global(ul),
	.editor :global(ol) {
		padding-left: var(--spacing-6);
		margin: var(--spacing-2) 0;
	}

	.editor :global(li) {
		margin: var(--spacing-1) 0;
	}

	.editor :global(p) {
		margin: var(--spacing-2) 0;
	}
</style>
