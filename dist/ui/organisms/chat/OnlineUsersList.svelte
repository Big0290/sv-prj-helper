<script lang="ts">
	interface User {
		id: string;
		name: string;
		avatar?: string;
		status?: 'online' | 'away' | 'busy' | 'offline';
		statusMessage?: string;
		lastSeen?: Date;
	}

	interface Props {
		users: User[];
		onUserClick?: (userId: string) => void;
		showOffline?: boolean;
		variant?: 'list' | 'grid' | 'compact';
		title?: string;
	}

	let {
		users,
		onUserClick,
		showOffline = false,
		variant = 'list',
		title = 'Online Users'
	}: Props = $props();

	const statusColors = {
		online: 'var(--color-success-500)',
		away: 'var(--color-warning-500)',
		busy: 'var(--color-danger-500)',
		offline: 'var(--color-neutral-600)'
	};

	const filteredUsers = $derived(
		showOffline ? users : users.filter((u) => u.status !== 'offline')
	);

	function formatLastSeen(date?: Date): string {
		if (!date) return '';
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (minutes < 1) return 'Just now';
		if (minutes < 60) return `${minutes}m ago`;
		if (hours < 24) return `${hours}h ago`;
		return `${days}d ago`;
	}
</script>

<div class="online-users-list" class:variant-grid={variant === 'grid'} class:variant-compact={variant === 'compact'}>
	<div class="header">
		<h3 class="title">{title}</h3>
		<span class="count">{filteredUsers.length}</span>
	</div>

	<div class="users-container" class:grid-layout={variant === 'grid'}>
		{#each filteredUsers as user (user.id)}
			<button
				type="button"
				class="user-item"
				class:clickable={!!onUserClick}
				onclick={() => onUserClick?.(user.id)}
			>
				<div class="user-avatar">
					{#if user.avatar}
						<img src={user.avatar} alt={user.name} />
					{:else}
						<div class="avatar-placeholder">
							{user.name.charAt(0).toUpperCase()}
						</div>
					{/if}
					<span
						class="status-dot"
						style="background-color: {statusColors[user.status || 'offline']}"
					></span>
				</div>

				<div class="user-info">
					<span class="user-name">{user.name}</span>
					{#if user.statusMessage}
						<span class="status-message">{user.statusMessage}</span>
					{:else if user.status === 'offline' && user.lastSeen}
						<span class="last-seen">{formatLastSeen(user.lastSeen)}</span>
					{:else if user.status}
						<span class="status-text" style="color: {statusColors[user.status]}">{user.status}</span>
					{/if}
				</div>
			</button>
		{/each}

		{#if filteredUsers.length === 0}
			<div class="empty-state">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
					<path d="M16 3.13a4 4 0 0 1 0 7.75" />
				</svg>
				<p>No users online</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.online-users-list {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		padding: var(--spacing-4);
		min-width: 280px;
		max-height: 600px;
		display: flex;
		flex-direction: column;
		box-shadow: var(--glass-shadow-lg);
	}

	.variant-compact {
		min-width: 220px;
		padding: var(--spacing-3);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-4);
		padding-bottom: var(--spacing-3);
		border-bottom: 1px solid var(--glass-border);
	}

	.variant-compact .header {
		margin-bottom: var(--spacing-3);
		padding-bottom: var(--spacing-2);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-100);
	}

	.variant-compact .title {
		font-size: var(--font-size-base);
	}

	.count {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 24px;
		height: 24px;
		padding: 0 var(--spacing-2);
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
		color: white;
	}

	.users-container {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.users-container.grid-layout {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: var(--spacing-3);
	}

	.variant-compact .users-container {
		gap: var(--spacing-1);
	}

	.user-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
		text-align: left;
		width: 100%;
	}

	.grid-layout .user-item {
		flex-direction: column;
		text-align: center;
		gap: var(--spacing-2);
	}

	.variant-compact .user-item {
		padding: var(--spacing-2);
		gap: var(--spacing-2);
	}

	.user-item.clickable {
		cursor: pointer;
	}

	.user-item.clickable:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--glass-border);
		transform: translateX(4px);
	}

	.grid-layout .user-item.clickable:hover {
		transform: translateY(-4px);
	}

	.user-avatar {
		position: relative;
		flex-shrink: 0;
	}

	.user-avatar img,
	.avatar-placeholder {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.variant-compact .user-avatar img,
	.variant-compact .avatar-placeholder {
		width: 32px;
		height: 32px;
	}

	.grid-layout .user-avatar img,
	.grid-layout .avatar-placeholder {
		width: 56px;
		height: 56px;
	}

	.user-avatar img {
		object-fit: cover;
		border: 2px solid var(--glass-border);
	}

	.avatar-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		border: 2px solid var(--glass-border);
	}

	.variant-compact .avatar-placeholder {
		font-size: var(--font-size-sm);
	}

	.grid-layout .avatar-placeholder {
		font-size: var(--font-size-xl);
	}

	.status-dot {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid var(--color-neutral-900);
	}

	.variant-compact .status-dot {
		width: 10px;
		height: 10px;
	}

	.grid-layout .status-dot {
		width: 14px;
		height: 14px;
	}

	.user-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.grid-layout .user-info {
		align-items: center;
	}

	.user-name {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-100);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.variant-compact .user-name {
		font-size: var(--font-size-xs);
	}

	.status-message,
	.last-seen,
	.status-text {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-400);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.variant-compact .status-message,
	.variant-compact .last-seen,
	.variant-compact .status-text {
		font-size: 10px;
	}

	.status-text {
		text-transform: capitalize;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-3);
		padding: var(--spacing-8) var(--spacing-4);
		color: var(--color-neutral-500);
		text-align: center;
	}

	.empty-state svg {
		opacity: 0.5;
	}

	.empty-state p {
		margin: 0;
		font-size: var(--font-size-sm);
	}
</style>
