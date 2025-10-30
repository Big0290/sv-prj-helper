<script lang="ts">
	interface Props {
		name: string;
		avatar?: string;
		bio?: string;
		email?: string;
		phone?: string;
		status?: string;
		isOnline?: boolean;
		joinedDate?: Date;
		onMessageClick?: () => void;
		onCallClick?: () => void;
		onVideoClick?: () => void;
		onBlockClick?: () => void;
		variant?: 'full' | 'compact';
	}

	let {
		name,
		avatar,
		bio,
		email,
		phone,
		status,
		isOnline = false,
		joinedDate,
		onMessageClick,
		onCallClick,
		onVideoClick,
		onBlockClick,
		variant = 'full'
	}: Props = $props();

	function formatJoinedDate(date?: Date): string {
		if (!date) return '';
		return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
	}
</script>

<div class="user-profile" class:compact={variant === 'compact'}>
	<div class="profile-header">
		<div class="avatar-container">
			{#if avatar}
				<img src={avatar} alt={name} class="avatar" />
			{:else}
				<div class="avatar-placeholder">
					{name.charAt(0).toUpperCase()}
				</div>
			{/if}
			{#if isOnline}
				<span class="status-indicator"></span>
			{/if}
		</div>

		<h3 class="name">{name}</h3>
		{#if status}
			<p class="status-text">{status}</p>
		{/if}
	</div>

	{#if variant === 'full'}
		{#if bio}
			<div class="profile-section">
				<h4 class="section-title">About</h4>
				<p class="bio">{bio}</p>
			</div>
		{/if}

		<div class="profile-section">
			<h4 class="section-title">Contact Info</h4>
			<div class="contact-list">
				{#if email}
					<div class="contact-item">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
							<polyline points="22,6 12,13 2,6" />
						</svg>
						<span>{email}</span>
					</div>
				{/if}
				{#if phone}
					<div class="contact-item">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
						</svg>
						<span>{phone}</span>
					</div>
				{/if}
				{#if joinedDate}
					<div class="contact-item">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
							<line x1="16" y1="2" x2="16" y2="6" />
							<line x1="8" y1="2" x2="8" y2="6" />
							<line x1="3" y1="10" x2="21" y2="10" />
						</svg>
						<span>Joined {formatJoinedDate(joinedDate)}</span>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<div class="profile-actions">
		{#if onMessageClick}
			<button type="button" class="action-btn primary" onclick={onMessageClick}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
				</svg>
				Message
			</button>
		{/if}

		{#if onCallClick}
			<button type="button" class="action-btn" onclick={onCallClick} aria-label="Call">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
				</svg>
			</button>
		{/if}

		{#if onVideoClick}
			<button type="button" class="action-btn" onclick={onVideoClick} aria-label="Video call">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polygon points="23 7 16 12 23 17 23 7" />
					<rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
				</svg>
			</button>
		{/if}

		{#if onBlockClick}
			<button type="button" class="action-btn danger" onclick={onBlockClick} aria-label="Block user">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10" />
					<line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
				</svg>
			</button>
		{/if}
	</div>
</div>

<style>
	.user-profile {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		padding: var(--spacing-6);
		max-width: 400px;
		box-shadow: var(--glass-shadow-lg);
	}

	.user-profile.compact {
		padding: var(--spacing-4);
	}

	.profile-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-bottom: var(--spacing-6);
	}

	.avatar-container {
		position: relative;
		margin-bottom: var(--spacing-3);
	}

	.avatar,
	.avatar-placeholder {
		width: 96px;
		height: 96px;
		border-radius: 50%;
	}

	.user-profile.compact .avatar,
	.user-profile.compact .avatar-placeholder {
		width: 64px;
		height: 64px;
	}

	.avatar {
		object-fit: cover;
		border: 3px solid var(--glass-border);
	}

	.avatar-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		border: 3px solid var(--glass-border);
	}

	.user-profile.compact .avatar-placeholder {
		font-size: var(--font-size-xl);
	}

	.status-indicator {
		position: absolute;
		bottom: 4px;
		right: 4px;
		width: 20px;
		height: 20px;
		background: var(--color-success-500);
		border-radius: 50%;
		border: 3px solid var(--color-neutral-900);
	}

	.name {
		margin: 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-neutral-50);
	}

	.user-profile.compact .name {
		font-size: var(--font-size-lg);
	}

	.status-text {
		margin: var(--spacing-1) 0 0;
		font-size: var(--font-size-sm);
		color: var(--color-neutral-400);
	}

	.profile-section {
		margin-bottom: var(--spacing-5);
		padding-bottom: var(--spacing-5);
		border-bottom: 1px solid var(--glass-border);
	}

	.profile-section:last-of-type {
		border-bottom: none;
		margin-bottom: var(--spacing-4);
	}

	.section-title {
		margin: 0 0 var(--spacing-3) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-300);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.bio {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--color-neutral-200);
		line-height: 1.6;
	}

	.contact-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		font-size: var(--font-size-sm);
		color: var(--color-neutral-300);
	}

	.contact-item svg {
		color: var(--color-neutral-500);
		flex-shrink: 0;
	}

	.profile-actions {
		display: flex;
		gap: var(--spacing-2);
	}

	.action-btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-200);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-primary-500);
		color: var(--color-neutral-100);
		transform: translateY(-1px);
	}

	.action-btn.primary {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		border-color: var(--color-primary-500);
		color: white;
	}

	.action-btn.primary:hover {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
	}

	.action-btn.danger {
		flex: 0;
		padding: var(--spacing-3);
		min-width: auto;
	}

	.action-btn.danger:hover {
		border-color: var(--color-danger-500);
		color: var(--color-danger-400);
	}
</style>
