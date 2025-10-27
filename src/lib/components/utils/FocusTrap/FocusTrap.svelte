<script lang="ts">
	import { type Snippet } from 'svelte';

	import type { FocusTrapProps } from './FocusTrap.types.js';

	let { children,
		active = true,
		initialFocus,
		returnFocus = true,
		...restProps
	 }: FocusTrapProps = $props();

	let containerRef: HTMLDivElement;
	let previouslyFocused: HTMLElement | null = null;

	const focusableSelector = 
		'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

	function getFocusableElements(): HTMLElement[] {
		if (!containerRef) return [];
		return Array.from(containerRef.querySelectorAll(focusableSelector));
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (!active || event.key !== 'Tab') return;

		const focusableElements = getFocusableElements();
		if (focusableElements.length === 0) return;

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			}
		} else {
			if (document.activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		}
	}

	$effect(() => {
		if (active && containerRef) {
			previouslyFocused = document.activeElement as HTMLElement;

			if (initialFocus) {
				initialFocus.focus();
			} else {
				const focusableElements = getFocusableElements();
				if (focusableElements.length > 0) {
					focusableElements[0].focus();
				}
			}

			containerRef.addEventListener('keydown', handleKeyDown);

			return () => {
				containerRef?.removeEventListener('keydown', handleKeyDown);
				
				if (returnFocus && previouslyFocused) {
					previouslyFocused.focus();
				}
			};
		}
	});
</script>

<div bind:this={containerRef} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
