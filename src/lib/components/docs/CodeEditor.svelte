<script lang="ts">
	import { onMount } from 'svelte';
	import { useCodeEditor } from '$lib/hooks/useCodeEditor.js';

	interface Props {
		value: string;
		language?: string;
		readonly?: boolean;
		theme?: 'light' | 'dark';
		height?: string;
		placeholder?: string;
	}

	let { 
		value = $bindable(''),
		language = 'javascript',
		readonly = false,
		theme = 'dark',
		height = '300px',
		placeholder = ''
	}: Props = $props();

	let editorContainer: HTMLDivElement;
	let editor: any = null;

	onMount(async () => {
		try {
			const { createEditor } = useCodeEditor();
			
			editor = await createEditor(editorContainer, {
				value,
				language,
				theme,
				readOnly: readonly,
				placeholder,
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				fontSize: 14,
				lineNumbers: 'on',
				wordWrap: 'on',
				automaticLayout: true,
				tabSize: 2,
				insertSpaces: true,
				folding: true,
				lineDecorationsWidth: 10,
				lineNumbersMinChars: 3,
				renderLineHighlight: 'line',
				scrollbar: {
					vertical: 'auto',
					horizontal: 'auto',
					verticalScrollbarSize: 8,
					horizontalScrollbarSize: 8
				}
			});

			// Listen for content changes
			editor.onDidChangeModelContent(() => {
				const newValue = editor.getValue();
				if (newValue !== value) {
					value = newValue;
				}
			});

			return () => {
				if (editor) {
					editor.dispose();
				}
			};
		} catch (error) {
			console.error('Failed to initialize code editor:', error);
		}
	});

	// Update editor value when prop changes
	$effect(() => {
		if (editor && editor.getValue() !== value) {
			editor.setValue(value);
		}
	});

	// Update editor language when prop changes
	$effect(() => {
		if (editor) {
			const model = editor.getModel();
			if (model) {
				// Monaco language mapping
				const languageMap: Record<string, string> = {
					'svelte': 'html',
					'javascript': 'javascript',
					'typescript': 'typescript',
					'json': 'json',
					'css': 'css',
					'html': 'html',
					'bash': 'shell'
				};
				
				const monacoLanguage = languageMap[language] || language;
				monaco.editor.setModelLanguage(model, monacoLanguage);
			}
		}
	});

	function formatCode() {
		if (editor) {
			editor.getAction('editor.action.formatDocument')?.run();
		}
	}

	function copyCode() {
		if (navigator.clipboard && value) {
			navigator.clipboard.writeText(value);
		}
	}
</script>

<div class="code-editor" style="height: {height}">
	<div class="editor-header">
		<div class="editor-info">
			<span class="language-badge">{language}</span>
			{#if readonly}
				<span class="readonly-badge">Read Only</span>
			{/if}
		</div>
		
		<div class="editor-actions">
			{#if !readonly}
				<button 
					class="editor-btn"
					onclick={formatCode}
					title="Format Code"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="16 18 22 12 16 6"></polyline>
						<polyline points="8 6 2 12 8 18"></polyline>
					</svg>
				</button>
			{/if}
			
			<button 
				class="editor-btn"
				onclick={copyCode}
				title="Copy Code"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
				</svg>
			</button>
		</div>
	</div>
	
	<div 
		bind:this={editorContainer}
		class="editor-container"
	></div>
</div>

<style>
	.code-editor {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--color-neutral-900);
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.75rem;
		background: var(--color-neutral-800);
		border-bottom: 1px solid var(--border-color);
	}

	.editor-info {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.language-badge {
		font-size: 0.75rem;
		padding: 0.125rem 0.375rem;
		background: var(--color-primary);
		color: white;
		border-radius: var(--radius-sm);
		text-transform: uppercase;
		font-weight: 500;
	}

	.readonly-badge {
		font-size: 0.75rem;
		padding: 0.125rem 0.375rem;
		background: var(--color-warning);
		color: var(--color-neutral-900);
		border-radius: var(--radius-sm);
		text-transform: uppercase;
		font-weight: 500;
	}

	.editor-actions {
		display: flex;
		gap: 0.25rem;
	}

	.editor-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		background: transparent;
		color: var(--color-neutral-300);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.editor-btn:hover {
		background: var(--color-neutral-700);
		color: var(--color-neutral-100);
	}

	.editor-container {
		flex: 1;
		min-height: 0;
	}

	/* Monaco Editor Overrides */
	:global(.monaco-editor) {
		background: var(--color-neutral-900) !important;
	}

	:global(.monaco-editor .margin) {
		background: var(--color-neutral-900) !important;
	}

	:global(.monaco-editor .monaco-editor-background) {
		background: var(--color-neutral-900) !important;
	}

	:global(.monaco-editor .current-line) {
		background: rgba(255, 255, 255, 0.05) !important;
	}

	:global(.monaco-editor .line-numbers) {
		color: var(--color-neutral-500) !important;
	}

	:global(.monaco-scrollable-element .scrollbar) {
		background: var(--color-neutral-800) !important;
	}

	:global(.monaco-scrollable-element .slider) {
		background: var(--color-neutral-600) !important;
	}

	:global(.monaco-scrollable-element .slider:hover) {
		background: var(--color-neutral-500) !important;
	}
</style>