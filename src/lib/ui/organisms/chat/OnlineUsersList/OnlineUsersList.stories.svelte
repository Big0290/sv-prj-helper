<script module>
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
		{ id: '1', name: 'John Doe', status: 'online', avatar: 'https://i.pravatar.cc/150?img=1' },
		{ id: '2', name: 'Jane Smith', status: 'away', avatar: 'https://i.pravatar.cc/150?img=2' },
		{ id: '3', name: 'Bob Wilson', status: 'busy' },
		{ id: '4', name: 'Alice Brown', status: 'online', avatar: 'https://i.pravatar.cc/150?img=3' }
	];

	const compactUsers = [
		{ id: '1', name: 'John', status: 'online' },
		{ id: '2', name: 'Jane', status: 'away' },
		{ id: '3', name: 'Bob', status: 'busy' }
	];

	const offlineUsers = [
		{ id: '1', name: 'Online User', status: 'online' },
		{ id: '2', name: 'Offline User', status: 'offline' }
	];

	const singleUser = [
		{ id: '1', name: 'John', status: 'online' }
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
