<script lang="ts">
	import type { TableSkeletonProps } from './TableSkeleton.types.js';

	let { rows = 5, columns = 4  }: TableSkeletonProps = $props();
</script>

<div class="table-skeleton">
	<div class="skeleton-table">
		<!-- Header -->
		<div class="skeleton-row skeleton-header">
			{#each Array(columns) as _, i}
				<div class="skeleton-cell skeleton-header-cell">
					<div class="skeleton-shimmer"></div>
				</div>
			{/each}
		</div>

		<!-- Rows -->
		{#each Array(rows) as _, i}
			<div class="skeleton-row">
				{#each Array(columns) as _, j}
					<div class="skeleton-cell">
						<div class="skeleton-shimmer" style="width: {75 + Math.random() * 25}%"></div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.table-skeleton {
		width: 100%;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		overflow: hidden;
		padding: var(--spacing-4);
	}

	.skeleton-table {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.skeleton-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: var(--spacing-3);
	}

	.skeleton-header {
		padding-bottom: var(--spacing-2);
		border-bottom: 2px solid var(--glass-border);
		margin-bottom: var(--spacing-2);
	}

	.skeleton-cell {
		padding: var(--spacing-3);
	}

	.skeleton-header-cell {
		padding: var(--spacing-4) var(--spacing-3);
	}

	.skeleton-shimmer {
		height: 16px;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(255, 255, 255, 0.1) 50%,
			rgba(255, 255, 255, 0.05) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: var(--radius-sm);
	}

	.skeleton-header-cell .skeleton-shimmer {
		height: 20px;
		width: 80%;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
</style>
