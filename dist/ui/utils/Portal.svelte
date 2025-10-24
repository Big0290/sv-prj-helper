<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		target?: HTMLElement | string;
	}

	let {
		children,
		target = 'body'
	}: Props = $props();

	let mounted = $state(false);
	let targetElement = $state<HTMLElement | null>(null);

	$effect(() => {
		if (typeof document === 'undefined') return;
		
		if (typeof target === 'string') {
			targetElement = document.querySelector(target);
		} else {
			targetElement = target;
		}

		if (!targetElement) {
			targetElement = document.body;
		}

		mounted = true;

		return () => {
			mounted = false;
		};
	});
</script>

{#if mounted && targetElement && children}
	{@render children()}
{/if}