<script lang="ts">
	export interface ChatRoom {
		id: string;
		name: string;
		avatar?: string;
		lastMessage?: string;
		lastMessageTime?: Date;
		unreadCount?: number;
		isOnline?: boolean;
		isTyping?: boolean;
	}

	interface Props {
		rooms: ChatRoom[];
		activeRoomId?: string;
		onRoomSelect?: (room: ChatRoom) => void;
		searchable?: boolean;
	}

	let {
		rooms,
		activeRoomId,
		onRoomSelect,
		searchable = true
	}: Props = $props();

	let searchQuery = $state('');

	const filteredRooms = $derived(
		searchQuery
			? rooms.filter(room => 
				room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				room.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
			)
			: rooms
	);

	function formatTime(date?: Date): string {
		if (!date) return '';
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (minutes < 1) return 'Just now';
		if (minutes < 60) return `${minutes}m`;
		if (hours < 24) return `${hours}h`;
		if (days < 7) return `${days}d`;
		return date.toLocaleDateString();
	}
</script>

<div class="chat-room-list">
	{#if searchable}
		<div class="search-container">
			<svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.35-4.35" />
			</svg>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search conversations..."
				class="search-input"
			/>
		</div>
	{/if}

	<div class="rooms-container">
		{#each filteredRooms as room (room.id)}
			<button
				type="button"
				class="room-item"
				class:active={room.id === activeRoomId}
				onclick={() => onRoomSelect?.(room)}
			>
				<div class="avatar-container">
					{#if room.avatar}
						<img src={room.avatar} alt={room.name} class="avatar" />
					{:else}
						<div class="avatar-placeholder">
							{room.name.charAt(0).toUpperCase()}
						</div>
					{/if}
					{#if room.isOnline}
						<span class="status-indicator online"></span>
					{/if}
				</div>

				<div class="room-content">
					<div class="room-header">
						<h4 class="room-name">{room.name}</h4>
						{#if room.lastMessageTime}
							<span class="time">{formatTime(room.lastMessageTime)}</span>
						{/if}
					</div>

					{#if room.isTyping}
						<div class="typing-indicator">
							<span class="typing-dot"></span>
							<span class="typing-dot"></span>
							<span class="typing-dot"></span>
							<span class="typing-text">typing...</span>
						</div>
					{:else if room.lastMessage}
						<p class="last-message">{room.lastMessage}</p>
					{/if}
				</div>

				{#if room.unreadCount && room.unreadCount > 0}
					<span class="unread-badge">
						{room.unreadCount > 99 ? '99+' : room.unreadCount}
					</span>
				{/if}
			</button>
		{/each}

		{#if filteredRooms.length === 0}
			<div class="empty-state">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
				</svg>
				<p>No conversations found</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.chat-room-list {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		overflow: hidden;
	}

	.search-container {
		position: relative;
		padding: var(--spacing-3);
		border-bottom: 1px solid var(--glass-border);
	}

	.search-icon {
		position: absolute;
		left: var(--spacing-5);
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-neutral-500);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--spacing-2) var(--spacing-3) var(--spacing-2) var(--spacing-10);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-100);
		font-size: var(--font-size-sm);
		outline: none;
		transition: all var(--transition-fast);
	}

	.search-input:focus {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--color-primary-500);
	}

	.search-input::placeholder {
		color: var(--color-neutral-500);
	}

	.rooms-container {
		flex: 1;
		overflow-y: auto;
	}

	.room-item {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		width: 100%;
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--glass-border);
		cursor: pointer;
		text-align: left;
		transition: all var(--transition-fast);
		position: relative;
	}

	.room-item:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.room-item.active {
		background: rgba(139, 92, 246, 0.1);
		border-left: 3px solid var(--color-primary-500);
	}

	.avatar-container {
		position: relative;
		flex-shrink: 0;
	}

	.avatar,
	.avatar-placeholder {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	.avatar {
		object-fit: cover;
	}

	.avatar-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
	}

	.status-indicator {
		position: absolute;
		bottom: 2px;
		right: 2px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid var(--color-neutral-900);
	}

	.status-indicator.online {
		background: var(--color-success-500);
	}

	.room-content {
		flex: 1;
		min-width: 0;
	}

	.room-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-2);
		margin-bottom: var(--spacing-1);
	}

	.room-name {
		margin: 0;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-100);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.time {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
		flex-shrink: 0;
	}

	.last-message {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-neutral-400);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.typing-indicator {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
	}

	.typing-dot {
		width: 4px;
		height: 4px;
		background: var(--color-primary-500);
		border-radius: 50%;
		animation: typing 1.4s infinite;
	}

	.typing-dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.typing-dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes typing {
		0%, 60%, 100% {
			transform: translateY(0);
			opacity: 0.7;
		}
		30% {
			transform: translateY(-4px);
			opacity: 1;
		}
	}

	.typing-text {
		font-size: var(--font-size-sm);
		color: var(--color-primary-500);
		font-style: italic;
	}

	.unread-badge {
		position: absolute;
		top: var(--spacing-3);
		right: var(--spacing-3);
		min-width: 20px;
		height: 20px;
		padding: 0 var(--spacing-1);
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary-600);
		color: white;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
		border-radius: var(--radius-full);
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-12);
		color: var(--color-neutral-500);
		text-align: center;
	}

	.empty-state svg {
		margin-bottom: var(--spacing-4);
		opacity: 0.5;
	}

	.empty-state p {
		margin: 0;
		font-size: var(--font-size-base);
	}
</style>
