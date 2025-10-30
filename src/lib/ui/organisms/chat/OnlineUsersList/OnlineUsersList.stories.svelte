<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import OnlineUsersList from './OnlineUsersList.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Chat/OnlineUsersList',
		component: OnlineUsersList,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A list component for displaying online users with status indicators.'
				}
			}
		}
	});

	const listUsers = [
		{ id: '1', name: 'John Doe', status: 'online' as const, avatar: 'https://i.pravatar.cc/150?img=1' },
		{ id: '2', name: 'Jane Smith', status: 'away' as const, avatar: 'https://i.pravatar.cc/150?img=2' },
		{ id: '3', name: 'Bob Wilson', status: 'busy' as const },
		{ id: '4', name: 'Alice Brown', status: 'online' as const, avatar: 'https://i.pravatar.cc/150?img=3' }
	];

	const compactUsers = [
		{ id: '1', name: 'John', status: 'online' as const },
		{ id: '2', name: 'Jane', status: 'away' as const },
		{ id: '3', name: 'Bob', status: 'busy' as const }
	];

	const offlineUsers = [
		{ id: '1', name: 'Online User', status: 'online' as const },
		{ id: '2', name: 'Offline User', status: 'offline' as const }
	];

	const singleUser = [
		{ id: '1', name: 'John', status: 'online' as const }
	];
</script>

<Story name="List">
	<OnlineUsersList users={listUsers} variant="list" />
</Story>

<Story name="Compact">
	<OnlineUsersList users={compactUsers} variant="compact" />
</Story>

<Story name="WithOffline">
	<OnlineUsersList users={offlineUsers} showOffline={true} />
</Story>

<Story name="CustomTitle">
	<OnlineUsersList users={singleUser} title="Active Members" />
</Story>
