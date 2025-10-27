<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, placeholder as placeholderExtension } from '@codemirror/view';
	import { EditorState, Compartment } from '@codemirror/state';
	import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
	import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
	import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
	import { bracketMatching, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
	import { oneDark } from '@codemirror/theme-one-dark';
	
	// Language imports
	import { javascript } from '@codemirror/lang-javascript';
	import { python } from '@codemirror/lang-python';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';
	import { json } from '@codemirror/lang-json';
	import { markdown } from '@codemirror/lang-markdown';

	import type { CodeEditorProps } from './CodeEditor.types.js';

	let { value = $bindable(''),
		language = 'javascript',
		theme = 'dark',
		readOnly = false,
		lineNumbers: showLineNumbers = true,
		lineWrapping = false,
		placeholder = 'Start coding...',
		minHeight = '300px',
		maxHeight = '600px',
		tabSize = 2,
		indentUnit = '  ',
		onValueChange
	 }: CodeEditorProps = $props();

	let editorEl: HTMLDivElement;
	let view: EditorView;
	
	const languageConf = new Compartment();
	const themeConf = new Compartment();
	const readOnlyConf = new Compartment();

	function getLanguageExtension() {
		switch (language) {
			case 'javascript':
			case 'typescript':
				return javascript({ typescript: language === 'typescript', jsx: true });
			case 'python':
				return python();
			case 'html':
				return html();
			case 'css':
				return css();
			case 'json':
				return json();
			case 'markdown':
				return markdown();
			default:
				return [];
		}
	}

	function getThemeExtension() {
		return theme === 'dark' ? oneDark : [];
	}

	onMount(() => {
		const startState = EditorState.create({
			doc: value,
			extensions: [
				// Line numbers and gutter
				showLineNumbers ? lineNumbers() : [],
				showLineNumbers ? highlightActiveLineGutter() : [],
				showLineNumbers ? foldGutter() : [],
				
				// Basic features
				history(),
				drawSelection(),
				dropCursor(),
				EditorState.allowMultipleSelections.of(true),
				indentOnInput(),
				syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
				bracketMatching(),
				closeBrackets(),
				autocompletion(),
				rectangularSelection(),
				crosshairCursor(),
				highlightActiveLine(),
				highlightSelectionMatches(),
				highlightSpecialChars(),
				
				// Keymaps
				keymap.of([
					...closeBracketsKeymap,
					...defaultKeymap,
					...searchKeymap,
					...historyKeymap,
					...foldKeymap,
					...completionKeymap,
					indentWithTab
				]),
				
				// Tab size
				EditorState.tabSize.of(tabSize),
				
				// Line wrapping
				lineWrapping ? EditorView.lineWrapping : [],
				
				// Placeholder
				placeholderExtension(placeholder),
				
				// Update listener
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						const newValue = update.state.doc.toString();
						value = newValue;
						onValueChange?.(newValue);
					}
				}),
				
				// Language (dynamic)
				languageConf.of(getLanguageExtension()),
				
				// Theme (dynamic)
				themeConf.of(getThemeExtension()),
				
				// Read-only (dynamic)
				readOnlyConf.of(EditorState.readOnly.of(readOnly))
			]
		});

		view = new EditorView({
			state: startState,
			parent: editorEl
		});
	});

	// Update language when it changes
	$effect(() => {
		if (view) {
			view.dispatch({
				effects: languageConf.reconfigure(getLanguageExtension())
			});
		}
	});

	// Update theme when it changes
	$effect(() => {
		if (view) {
			view.dispatch({
				effects: themeConf.reconfigure(getThemeExtension())
			});
		}
	});

	// Update read-only when it changes
	$effect(() => {
		if (view) {
			view.dispatch({
				effects: readOnlyConf.reconfigure(EditorState.readOnly.of(readOnly))
			});
		}
	});

	// Update value from outside
	$effect(() => {
		if (view && value !== view.state.doc.toString()) {
			view.dispatch({
				changes: {
					from: 0,
					to: view.state.doc.length,
					insert: value
				}
			});
		}
	});

	onDestroy(() => {
		view?.destroy();
	});

	// Public methods via exports
	export function getValue(): string {
		return view?.state.doc.toString() || '';
	}

	export function setValue(newValue: string) {
		if (view) {
			view.dispatch({
				changes: {
					from: 0,
					to: view.state.doc.length,
					insert: newValue
				}
			});
		}
	}

	export function focus() {
		view?.focus();
	}

	export function insertText(text: string) {
		if (view) {
			const selection = view.state.selection.main;
			view.dispatch({
				changes: {
					from: selection.from,
					to: selection.to,
					insert: text
				}
			});
		}
	}

	export function getSelection(): string {
		if (view) {
			const selection = view.state.selection.main;
			return view.state.doc.sliceString(selection.from, selection.to);
		}
		return '';
	}
</script>

<div class="code-editor" style="--min-height: {minHeight}; --max-height: {maxHeight};">
	<div bind:this={editorEl} class="editor-container"></div>
</div>

<style>
	.code-editor {
		width: 100%;
		position: relative;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.editor-container {
		width: 100%;
		height: var(--min-height);
		min-height: var(--min-height);
		max-height: var(--max-height);
		overflow: auto;
	}

	/* CodeMirror customization */
	.editor-container :global(.cm-editor) {
		height: 100%;
		min-height: inherit;
		font-size: var(--font-size-sm);
		font-family: var(--font-family-mono, 'Monaco', 'Courier New', monospace);
		background: transparent;
	}

	.editor-container :global(.cm-scroller) {
		overflow: auto;
		font-family: var(--font-family-mono, 'Monaco', 'Courier New', monospace);
	}

	.editor-container :global(.cm-content) {
		padding: var(--spacing-2) 0;
		font-family: var(--font-family-mono, 'Monaco', 'Courier New', monospace);
	}

	.editor-container :global(.cm-line) {
		padding: 0 var(--spacing-2);
		line-height: 1.6;
	}

	.editor-container :global(.cm-gutters) {
		background: rgba(0, 0, 0, 0.2);
		border-right: 1px solid var(--glass-border);
		color: var(--text-tertiary);
	}

	.editor-container :global(.cm-activeLineGutter) {
		background: rgba(255, 255, 255, 0.05);
	}

	/* Light theme adjustments */
	.editor-container :global(.cm-editor:not(.cm-focused)) {
		outline: none;
	}

	/* Selection */
	.editor-container :global(.cm-selectionBackground) {
		background: rgba(59, 130, 246, 0.3) !important;
	}

	.editor-container :global(.cm-focused .cm-selectionBackground) {
		background: rgba(59, 130, 246, 0.4) !important;
	}

	/* Cursor */
	.editor-container :global(.cm-cursor) {
		border-left-color: var(--color-primary);
	}

	/* Matching brackets */
	.editor-container :global(.cm-matchingBracket) {
		background: rgba(59, 130, 246, 0.2);
		outline: 1px solid rgba(59, 130, 246, 0.4);
	}

	/* Search matches */
	.editor-container :global(.cm-searchMatch) {
		background: rgba(245, 158, 11, 0.3);
	}

	.editor-container :global(.cm-searchMatch-selected) {
		background: rgba(245, 158, 11, 0.5);
	}

	/* Autocomplete */
	.editor-container :global(.cm-tooltip-autocomplete) {
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-xl);
	}

	.editor-container :global(.cm-completionLabel) {
		color: var(--text-primary);
	}

	.editor-container :global(.cm-completionDetail) {
		color: var(--text-secondary);
	}

	/* Placeholder */
	.editor-container :global(.cm-placeholder) {
		color: var(--text-tertiary);
	}

	/* Scrollbar */
	.editor-container :global(.cm-scroller::-webkit-scrollbar) {
		width: 12px;
		height: 12px;
	}

	.editor-container :global(.cm-scroller::-webkit-scrollbar-track) {
		background: rgba(0, 0, 0, 0.1);
	}

	.editor-container :global(.cm-scroller::-webkit-scrollbar-thumb) {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 6px;
	}

	.editor-container :global(.cm-scroller::-webkit-scrollbar-thumb:hover) {
		background: rgba(255, 255, 255, 0.3);
	}
</style>
