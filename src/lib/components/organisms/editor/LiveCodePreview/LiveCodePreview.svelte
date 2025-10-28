<script lang="ts">
	import CodeEditor from '../CodeEditor/CodeEditor.svelte';
	import Button from '$lib/ui/atoms/Button.svelte';
	import { onMount } from 'svelte';

	import type { LiveCodePreviewProps } from './LiveCodePreview.types.js';

	let {
		initialHtml = '<h1>Hello World</h1>\n<p>Edit the code to see live changes!</p>',
		initialCss = 'body {\n  font-family: system-ui;\n  padding: 20px;\n}\n\nh1 {\n  color: #8b5cf6;\n}',
		initialJs = 'console.log("Hello from LiveCodePreview!");',
		layout = 'horizontal',
		showPreview = $bindable(true),
		autoRun = true,
		minHeight = '500px'
	}: LiveCodePreviewProps = $props();

	let html = $state(initialHtml);
	let css = $state(initialCss);
	let js = $state(initialJs);
	let activeTab = $state<'html' | 'css' | 'js'>('html');
	let previewFrame = $state<HTMLIFrameElement>();
	let consoleOutput = $state<Array<{type: string, message: string}>>([]);
	let showConsole = $state(false);
	let iframeContent = $derived(generateIframeContent());

	function generateIframeContent() {
		return `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		${css}
	</style>
	<script>
		// Setup console interception early
		(function() {
			const originalLog = console.log;
			const originalError = console.error;
			const originalWarn = console.warn;
			
			console.log = function(...args) {
				originalLog.apply(console, args);
				window.parent.postMessage({ 
					type: 'console', 
					level: 'log', 
					message: args.join(' ') 
				}, '*');
			};
			
			console.error = function(...args) {
				originalError.apply(console, args);
				window.parent.postMessage({ 
					type: 'console', 
					level: 'error', 
					message: args.join(' ') 
				}, '*');
			};
			
			console.warn = function(...args) {
				originalWarn.apply(console, args);
				window.parent.postMessage({ 
					type: 'console', 
					level: 'warn', 
					message: args.join(' ') 
				}, '*');
			};
			
			// Catch runtime errors
			window.onerror = function(message, source, lineno, colno, error) {
				window.parent.postMessage({ 
					type: 'console', 
					level: 'error', 
					message: message 
				}, '*');
				return false;
			};
		})();
	<\/script>
</head>
<body>
	${html}
	<script>
		// User code runs after DOM is loaded
		(function() {
			try {
				${js}
			} catch (error) {
				console.error('Runtime error: ' + error.message);
			}
		})();
	<\/script>
</body>
</html>`;
	}

	onMount(() => {
		// Listen for console messages from iframe
		const handleMessage = (event: MessageEvent) => {
			if (event.data?.type === 'console') {
				consoleOutput = [...consoleOutput, {
					type: event.data.level,
					message: event.data.message
				}];
			}
		};
		
		window.addEventListener('message', handleMessage);
		
		return () => {
			window.removeEventListener('message', handleMessage);
		};
	});

	// Auto-update preview when code changes
	$effect(() => {
		if (autoRun && previewFrame) {
			// Track changes to html, css, js
			html;
			css;
			js;
			
			const timeoutId = setTimeout(() => {
				updatePreview();
			}, 500);
			return () => clearTimeout(timeoutId);
		}
	});

	function updatePreview() {
		if (previewFrame) {
			const doc = previewFrame.contentDocument;
			if (doc) {
				doc.open();
				doc.write(iframeContent);
				doc.close();
			}
		}
	}

	function clearConsole() {
		consoleOutput = [];
	}

	function runCode() {
		consoleOutput = [];
		updatePreview();
	}
</script>

<div class="live-code-preview {layout}" style="--min-height: {minHeight};">
	<div class="editor-section">
		<!-- Tab Bar -->
		<div class="tab-bar">
			<button 
				class="tab {activeTab === 'html' ? 'active' : ''}"
				onclick={() => activeTab = 'html'}
			>
				HTML
			</button>
			<button 
				class="tab {activeTab === 'css' ? 'active' : ''}"
				onclick={() => activeTab = 'css'}
			>
				CSS
			</button>
			<button 
				class="tab {activeTab === 'js' ? 'active' : ''}"
				onclick={() => activeTab = 'js'}
			>
				JavaScript
			</button>
			
			<div class="tab-actions">
				{#if !autoRun}
					<Button size="sm" onclick={runCode}>Run</Button>
				{/if}
				<button 
					class="toggle-preview"
					onclick={() => showPreview = !showPreview}
					aria-label="Toggle preview"
				>
					{showPreview ? 'Hide Preview' : 'Show Preview'}
				</button>
			</div>
		</div>

		<!-- Editors -->
		<div class="editors">
			{#if activeTab === 'html'}
				<CodeEditor 
					bind:value={html}
					language="html"
					theme="dark"
					lineNumbers={true}
					minHeight={minHeight}
					maxHeight="none"
				/>
			{:else if activeTab === 'css'}
				<CodeEditor 
					bind:value={css}
					language="css"
					theme="dark"
					lineNumbers={true}
					minHeight={minHeight}
					maxHeight="none"
				/>
			{:else}
				<CodeEditor 
					bind:value={js}
					language="javascript"
					theme="dark"
					lineNumbers={true}
					minHeight={minHeight}
					maxHeight="none"
				/>
			{/if}
		</div>
	</div>

	{#if showPreview}
		<div class="preview-section">
			<div class="preview-header">
				<span>Preview</span>
				<button 
					class="console-toggle"
					onclick={() => showConsole = !showConsole}
				>
					Console {#if consoleOutput.length > 0}({consoleOutput.length}){/if}
				</button>
			</div>
			
			<iframe
				bind:this={previewFrame}
				class="preview-frame"
				title="Preview"
				sandbox="allow-scripts allow-same-origin"
				onload={() => {
					console.log('LiveCodePreview: iframe loaded, autoRun:', autoRun);
					if (autoRun) {
						setTimeout(() => updatePreview(), 10);
					}
				}}
			></iframe>

			{#if showConsole}
				<div class="console">
					<div class="console-header">
						<span>Console Output</span>
						<button class="clear-btn" onclick={clearConsole}>Clear</button>
					</div>
					<div class="console-content">
						{#if consoleOutput.length === 0}
							<div class="console-empty">No console output</div>
						{:else}
							{#each consoleOutput as log}
								<div class="console-log {log.type}">
									<span class="log-type">{log.type}</span>
									<span class="log-message">{log.message}</span>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.live-code-preview {
		display: flex;
		width: 100%;
		min-height: var(--min-height);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.live-code-preview.horizontal {
		flex-direction: row;
	}

	.live-code-preview.vertical {
		flex-direction: column;
	}

	.editor-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
		border-right: 1px solid var(--glass-border);
	}

	.live-code-preview.vertical .editor-section {
		border-right: none;
		border-bottom: 1px solid var(--glass-border);
	}

	.tab-bar {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 8px;
		background: rgba(0, 0, 0, 0.2);
		border-bottom: 1px solid var(--glass-border);
	}

	.tab {
		padding: 6px 16px;
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.tab:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
	}

	.tab.active {
		background: rgba(139, 92, 246, 0.2);
		border-color: rgba(139, 92, 246, 0.4);
		color: #a78bfa;
	}

	.tab-actions {
		margin-left: auto;
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.toggle-preview {
		padding: 6px 12px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		font-size: var(--font-size-xs);
		cursor: pointer;
		transition: all 0.2s;
	}

	.toggle-preview:hover {
		background: rgba(255, 255, 255, 0.15);
		color: var(--text-primary);
	}

	.editors {
		flex: 1;
		overflow: hidden;
	}

	.preview-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
		background: white;
	}

	.preview-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 16px;
		background: rgba(0, 0, 0, 0.05);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: #1e1e1e;
	}

	.console-toggle {
		padding: 4px 12px;
		background: rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		cursor: pointer;
		transition: all 0.2s;
	}

	.console-toggle:hover {
		background: rgba(0, 0, 0, 0.1);
	}

	.preview-frame {
		flex: 1;
		width: 100%;
		border: none;
		background: white;
	}

	.console {
		max-height: 200px;
		display: flex;
		flex-direction: column;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		background: #1e1e1e;
	}

	.console-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		background: rgba(0, 0, 0, 0.2);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
	}

	.clear-btn {
		padding: 2px 8px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
		cursor: pointer;
	}

	.clear-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		color: var(--text-primary);
	}

	.console-content {
		flex: 1;
		overflow-y: auto;
		padding: 8px;
		font-family: var(--font-family-mono, 'Monaco', 'Courier New', monospace);
		font-size: var(--font-size-xs);
	}

	.console-empty {
		color: var(--text-tertiary);
		font-style: italic;
	}

	.console-log {
		display: flex;
		gap: 8px;
		padding: 4px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.log-type {
		flex-shrink: 0;
		font-weight: 600;
		text-transform: uppercase;
	}

	.console-log.log .log-type {
		color: #60a5fa;
	}

	.console-log.error .log-type {
		color: #f87171;
	}

	.console-log.warn .log-type {
		color: #fbbf24;
	}

	.log-message {
		color: var(--text-primary);
		word-break: break-word;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.live-code-preview.horizontal {
			flex-direction: column;
		}

		.editor-section {
			border-right: none;
			border-bottom: 1px solid var(--glass-border);
		}
	}
</style>
