<script lang="ts">
	import { type Snippet } from 'svelte';
	import { mount, unmount } from 'svelte';

	interface Props {
		children?: Snippet;
		target?: HTMLElement | string;
	}

	let {
		children,
		target = 'body'
	}: Props = $props();

	let container: HTMLDivElement;
	let targetEl: HTMLElement | null = $state(null);

	$effect(() => {
		if (typeof target === 'string') {
			targetEl = document.querySelector(target);
		} else {
			targetEl = target;
		}

		if (!targetEl) {
			targetEl = document.body;
		}

		container = document.createElement('div');
		targetEl.appendChild(container);

		return () => {
			if (container && targetEl?.contains(container)) {
				targetEl.removeChild(container);
			}
		};
	});
</script>

{#if container && children}
	{@html ''}
	<svelte:component this={() => {
		if (container) {
			container.innerHTML = '';
			const component = children ? children() : '';
			return component;
		}
	}} />
{/if}
