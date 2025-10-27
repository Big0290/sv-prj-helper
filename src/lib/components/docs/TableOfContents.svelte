<script lang="ts">
	import { Card, Heading, Text } from '$lib/ui';
	import { onMount } from 'svelte';

	interface TOCItem {
		id: string;
		title: string;
		level: number;
	}

	interface Props {
		items: TOCItem[];
		title?: string;
		class?: string;
	}

	let { 
		items,
		title = 'On This Page',
		class: className = ''
	}: Props = $props();

	let activeId = $state('');
	let observer: IntersectionObserver | undefined = $state();

	onMount(() => {
		// Create intersection observer to track which section is currently visible
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{
				rootMargin: '-20% 0% -35% 0%',
				threshold: 0
			}
		);

		// Observe all headings
		items.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element && observer) {
				observer.observe(element);
			}
		});

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	});

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ 
				behavior: 'smooth',
				block: 'start'
			});
		}
	}
</script>

{#if items.length > 0}
	<Card class="table-of-contents {className}">
		<div class="toc-content">
			<Heading as="h3" size="5" class="toc-title">{title}</Heading>
			
			<nav class="toc-nav">
				<ul class="toc-list">
					{#each items as item}
						<li class="toc-item" data-level={item.level}>
							<button
								class="toc-link"
								class:active={activeId === item.id}
								onclick={() => scrollToSection(item.id)}
								type="button"
							>
								<Text size="sm">{item.title}</Text>
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</Card>
{/if}

<style>
	.table-of-contents {
		position: sticky;
		top: 100px;
		max-height: calc(100vh - 120px);
		overflow-y: auto;
	}

	.toc-content {
		padding: 1rem;
	}

	.toc-title {
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border-color);
	}

	.toc-nav {
		width: 100%;
	}

	.toc-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.toc-item {
		position: relative;
	}

	.toc-item[data-level="2"] {
		padding-left: 0;
	}

	.toc-item[data-level="3"] {
		padding-left: 1rem;
	}

	.toc-item[data-level="4"] {
		padding-left: 2rem;
	}

	.toc-item[data-level="5"] {
		padding-left: 3rem;
	}

	.toc-item[data-level="6"] {
		padding-left: 4rem;
	}

	.toc-link {
		display: block;
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: none;
		background: none;
		color: var(--text-secondary);
		text-align: left;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.2s ease;
		border-left: 2px solid transparent;
		text-decoration: none;
	}

	.toc-link:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.toc-link.active {
		background: var(--color-primary-light);
		color: var(--color-primary-dark);
		border-left-color: var(--color-primary);
		font-weight: 500;
	}

	/* Scrollbar styling */
	.table-of-contents::-webkit-scrollbar {
		width: 4px;
	}

	.table-of-contents::-webkit-scrollbar-track {
		background: var(--bg-secondary);
		border-radius: 2px;
	}

	.table-of-contents::-webkit-scrollbar-thumb {
		background: var(--border-color);
		border-radius: 2px;
	}

	.table-of-contents::-webkit-scrollbar-thumb:hover {
		background: var(--text-secondary);
	}

	@media (max-width: 1024px) {
		.table-of-contents {
			position: static;
			max-height: none;
		}
	}
</style>