<script lang="ts">
	import { Button } from '$lib/ui';

	interface Props {
		text: string;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		label?: string;
		successLabel?: string;
		class?: string;
	}

	let { 
		text,
		size = 'sm',
		variant = 'ghost',
		label = 'Copy',
		successLabel = 'Copied!',
		class: className = ''
	}: Props = $props();

	let copied = $state(false);
	let copyTimeout: NodeJS.Timeout | undefined | undefined = $state();

	async function copyToClipboard() {
		if (!navigator.clipboard) {
			// Fallback for browsers without clipboard API
			try {
				const textArea = document.createElement('textarea');
				textArea.value = text;
				textArea.style.position = 'fixed';
				textArea.style.left = '-999999px';
				textArea.style.top = '-999999px';
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				document.execCommand('copy');
				textArea.remove();
				
				showSuccess();
			} catch (error) {
				console.error('Failed to copy text:', error);
			}
			return;
		}
		
		try {
			await navigator.clipboard.writeText(text);
			showSuccess();
		} catch (error) {
			console.error('Failed to copy text:', error);
		}
	}

	function showSuccess() {
		copied = true;
		
		// Clear existing timeout
		if (copyTimeout) {
			clearTimeout(copyTimeout);
		}
		
		// Reset after 2 seconds
		copyTimeout = setTimeout(() => {
			copied = false;
			copyTimeout = undefined;
		}, 2000);
	}

	// Cleanup timeout on component destroy
	$effect(() => {
		return () => {
			if (copyTimeout) {
				clearTimeout(copyTimeout);
			}
		};
	});
</script>

<Button 
	{variant}
	{size}
	onclick={copyToClipboard}
	disabled={copied}
	class={`copy-button ${className}`}
	title={copied ? successLabel : `${label} to clipboard`}
>
	{#if copied}
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="copy-icon">
			<polyline points="20 6 9 17 4 12"></polyline>
		</svg>
		{successLabel}
	{:else}
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="copy-icon">
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
		</svg>
		{label}
	{/if}
</Button>

<style>
	:global(.copy-button) {
		transition: all 0.2s ease;
	}

	:global(.copy-button:disabled) {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.copy-icon {
		flex-shrink: 0;
	}
</style>