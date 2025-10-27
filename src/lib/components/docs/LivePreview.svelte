<script lang="ts">
	import { onMount } from 'svelte';
	import { Text } from '$lib/ui';

	interface Props {
		code: string;
		showError?: boolean;
	}

	let { code, showError = true }: Props = $props();

	let previewContainer: HTMLDivElement;
	let error: string | null = $state(null);
	let loading = $state(false);

	// Compile and render the Svelte code
	$effect(async () => {
		if (!code.trim()) return;
		
		loading = true;
		error = null;

		try {
			await renderPreview(code);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to render preview';
			console.error('Preview error:', err);
		} finally {
			loading = false;
		}
	});

	async function renderPreview(svelteCode: string) {
		if (!previewContainer) return;

		// Clear previous content
		previewContainer.innerHTML = '';

		try {
			// For now, we'll create a simple iframe-based preview
			// In a full implementation, you'd want to use Svelte's compiler
			const iframe = document.createElement('iframe');
			iframe.style.width = '100%';
			iframe.style.height = '100%';
			iframe.style.border = 'none';
			iframe.style.background = 'transparent';

			// Create the HTML content for the iframe
			const htmlContent = createPreviewHTML(svelteCode);
			
			previewContainer.appendChild(iframe);
			
			// Write content to iframe
			const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
			if (iframeDoc) {
				iframeDoc.open();
				iframeDoc.write(htmlContent);
				iframeDoc.close();
			}
		} catch (err) {
			throw new Error(`Preview compilation failed: ${err}`);
		}
	}

	function createPreviewHTML(svelteCode: string): string {
		// Extract the component content (simplified approach)
		const componentMatch = svelteCode.match(/<(\w+)[^>]*>.*?<\/\1>/s);
		const componentHTML = componentMatch ? componentMatch[0] : svelteCode;

		// For demo purposes, we'll create a static HTML representation
		// In a real implementation, you'd compile the Svelte code
		const staticHTML = convertSvelteToHTML(componentHTML);

		return `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<style>
					body {
						margin: 0;
						padding: 1rem;
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
						background: transparent;
						color: var(--text-primary, #1a1a1a);
					}
					
					/* Import theme variables */
					:root {
						--color-primary: #a855f7;
						--color-secondary: #3b82f6;
						--text-primary: #1a1a1a;
						--text-secondary: #6b7280;
						--bg-primary: #ffffff;
						--bg-secondary: #f9fafb;
						--border-color: #e5e7eb;
						--radius-sm: 0.25rem;
						--radius-md: 0.375rem;
						--radius-lg: 0.5rem;
					}
					
					@media (prefers-color-scheme: dark) {
						:root {
							--text-primary: #f9fafb;
							--text-secondary: #9ca3af;
							--bg-primary: #111827;
							--bg-secondary: #1f2937;
							--border-color: #374151;
						}
					}
					
					/* Basic component styles */
					.btn {
						display: inline-flex;
						align-items: center;
						justify-content: center;
						padding: 0.5rem 1rem;
						border-radius: var(--radius-md);
						font-weight: 500;
						text-decoration: none;
						border: 1px solid transparent;
						cursor: pointer;
						transition: all 0.2s ease;
					}
					
					.btn--primary {
						background: var(--color-primary);
						color: white;
					}
					
					.btn--secondary {
						background: var(--bg-secondary);
						color: var(--text-primary);
						border-color: var(--border-color);
					}
					
					.card {
						background: var(--bg-primary);
						border: 1px solid var(--border-color);
						border-radius: var(--radius-lg);
						padding: 1.5rem;
						box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
					}
					
					.input {
						width: 100%;
						padding: 0.5rem 0.75rem;
						border: 1px solid var(--border-color);
						border-radius: var(--radius-md);
						background: var(--bg-primary);
						color: var(--text-primary);
					}
					
					.input:focus {
						outline: none;
						border-color: var(--color-primary);
						box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
					}
				</style>
			</head>
			<body>
				${staticHTML}
			</body>
			</html>
		`;
	}

	function convertSvelteToHTML(svelteCode: string): string {
		// Simple conversion from Svelte syntax to HTML
		// This is a basic implementation - a full version would need proper parsing
		
		let html = svelteCode;
		
		// Convert component names to HTML with classes
		html = html.replace(/<Button([^>]*)>/g, '<button class="btn btn--primary"$1>');
		html = html.replace(/<\/Button>/g, '</button>');
		
		html = html.replace(/<Card([^>]*)>/g, '<div class="card"$1>');
		html = html.replace(/<\/Card>/g, '</div>');
		
		html = html.replace(/<Input([^>]*)>/g, '<input class="input"$1>');
		html = html.replace(/<\/Input>/g, '');
		
		// Handle props
		html = html.replace(/variant="([^"]+)"/g, (match, variant) => {
			return `class="btn btn--${variant}"`;
		});
		
		// Remove Svelte-specific attributes
		html = html.replace(/\s*bind:\w+="[^"]*"/g, '');
		html = html.replace(/\s*on:\w+="[^"]*"/g, '');
		html = html.replace(/\s*\{[^}]*\}/g, '');
		
		return html;
	}

	onMount(() => {
		// Initial render
		if (code) {
			renderPreview(code);
		}
	});
</script>

<div class="live-preview">
	{#if loading}
		<div class="preview-loading">
			<div class="spinner"></div>
			<Text size="sm" color="var(--text-secondary)">Rendering preview...</Text>
		</div>
	{:else if error && showError}
		<div class="preview-error">
			<Text size="sm" color="var(--color-error)">Preview Error:</Text>
			<Text size="xs" color="var(--text-secondary)">{error}</Text>
		</div>
	{:else if !code.trim()}
		<div class="preview-empty">
			<Text size="sm" color="var(--text-secondary)">No code to preview</Text>
		</div>
	{:else}
		<div 
			bind:this={previewContainer}
			class="preview-container"
		></div>
	{/if}
</div>

<style>
	.live-preview {
		width: 100%;
		height: 100%;
		min-height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.preview-container {
		width: 100%;
		height: 100%;
		min-height: 200px;
	}

	.preview-loading,
	.preview-error,
	.preview-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 2rem;
		text-align: center;
	}

	.preview-error {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: var(--radius-md);
	}

	.spinner {
		width: 24px;
		height: 24px;
		border: 2px solid var(--border-color);
		border-top: 2px solid var(--color-primary);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	/* Ensure iframe content is responsive */
	:global(.preview-container iframe) {
		width: 100%;
		height: 100%;
		min-height: 200px;
	}
</style>