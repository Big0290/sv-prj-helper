<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';
	
	// Import language support
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-python';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-markup'; // HTML
	import 'prismjs/components/prism-markdown';
	import 'prismjs/components/prism-bash';

	interface Props {
		code: string;
		language?: 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json' | 'markdown' | 'bash' | 'plaintext';
		showLineNumbers?: boolean;
		title?: string;
		copyable?: boolean;
		maxHeight?: string;
		theme?: 'dark' | 'light';
	}

	let {
		code,
		language = 'javascript',
		showLineNumbers = true,
		title,
		copyable = true,
		maxHeight = 'none',
		theme = 'dark'
	}: Props = $props();

	let codeEl: HTMLElement;
	let copied = $state(false);

	const languageMap: Record<string, string> = {
		javascript: 'language-javascript',
		typescript: 'language-typescript',
		python: 'language-python',
		html: 'language-markup',
		css: 'language-css',
		json: 'language-json',
		markdown: 'language-markdown',
		bash: 'language-bash',
		plaintext: 'language-plaintext'
	};

	onMount(() => {
		if (codeEl && language !== 'plaintext') {
			Prism.highlightElement(codeEl);
		}
	});

	$effect(() => {
		if (codeEl && language !== 'plaintext') {
			Prism.highlightElement(codeEl);
		}
	});

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => copied = false, 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	}

	function getLines(): string[] {
		return code.split('\n');
	}
</script>

<div class="code-block {theme}" style="--max-height: {maxHeight};">
	{#if title || copyable}
		<div class="header">
			{#if title}
				<div class="title">{title}</div>
			{/if}
			{#if copyable}
				<button class="copy-btn" onclick={copyCode} aria-label="Copy code">
					{#if copied}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
						<span>Copied!</span>
					{:else}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
						</svg>
						<span>Copy</span>
					{/if}
				</button>
			{/if}
		</div>
	{/if}
	
	<div class="code-container">
		{#if showLineNumbers}
			<div class="line-numbers" aria-hidden="true">
				{#each getLines() as _, i}
					<div class="line-number">{i + 1}</div>
				{/each}
			</div>
		{/if}
		<pre class="code-content {showLineNumbers ? 'with-line-numbers' : ''}"><code 
			bind:this={codeEl}
			class={languageMap[language]}
		>{code}</code></pre>
	</div>
</div>

<style>
	.code-block {
		width: 100%;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		font-family: var(--font-family-mono, 'Monaco', 'Courier New', monospace);
	}

	.code-block.dark {
		--code-bg: #1e1e1e;
		--code-text: #d4d4d4;
		--code-gutter: #252526;
		--code-border: rgba(255, 255, 255, 0.1);
		--code-line-number: #858585;
	}

	.code-block.light {
		--code-bg: #f5f5f5;
		--code-text: #1e1e1e;
		--code-gutter: #e8e8e8;
		--code-border: rgba(0, 0, 0, 0.1);
		--code-line-number: #999;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 16px;
		background: rgba(0, 0, 0, 0.2);
		border-bottom: 1px solid var(--code-border);
	}

	.title {
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--text-primary);
	}

	.copy-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 4px 12px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		cursor: pointer;
		transition: all 0.2s;
	}

	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.25);
		color: var(--text-primary);
	}

	.copy-btn svg {
		flex-shrink: 0;
	}

	.code-container {
		display: flex;
		max-height: var(--max-height);
		overflow: auto;
	}

	.line-numbers {
		padding: var(--spacing-3) var(--spacing-2);
		background: var(--code-gutter);
		border-right: 1px solid var(--code-border);
		text-align: right;
		user-select: none;
		color: var(--code-line-number);
		font-size: var(--font-size-sm);
		line-height: 1.6;
	}

	.line-number {
		padding: 0 8px;
		min-width: 40px;
	}

	.code-content {
		flex: 1;
		margin: 0;
		padding: var(--spacing-3);
		background: var(--code-bg);
		color: var(--code-text);
		font-size: var(--font-size-sm);
		line-height: 1.6;
		overflow-x: auto;
	}

	.code-content.with-line-numbers {
		padding-left: var(--spacing-3);
	}

	.code-content code {
		display: block;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		white-space: pre;
	}

	/* Scrollbar */
	.code-container::-webkit-scrollbar {
		width: 12px;
		height: 12px;
	}

	.code-container::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.1);
	}

	.code-container::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 6px;
	}

	.code-container::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.3);
	}
</style>
