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
</script>

<Story name="List">
	<script>
		const users = [
			{ id: '1', name: 'John Doe', status: 'online', avatar: 'https://i.pravatar.cc/150?img=1' },
			{ id: '2', name: 'Jane Smith', status: 'away', avatar: 'https://i.pravatar.cc/150?img=2' },
			{ id: '3', name: 'Bob Wilson', status: 'busy' },
			{ id: '4', name: 'Alice Brown', status: 'online', avatar: 'https://i.pravatar.cc/150?img=3' }
		];
	</script>
	<OnlineUsersList users={users} variant="list" />
</Story>

<Story name="Compact">
	<script>
		const users = [
			{ id: '1', name: 'John', status: 'online' },
			{ id: '2', name: 'Jane', status: 'away' },
			{ id: '3', name: 'Bob', status: 'busy' }
		];
	</script>
	<OnlineUsersList users={users} variant="compact" />
</Story>

<Story name="WithOffline">
	<script>
		const users = [
			{ id: '1', name: 'Online User', status: 'online' },
			{ id: '2', name: 'Offline User', status: 'offline' }
		];
	</script>
	<OnlineUsersList users={users} showOffline={true} />
</Story>

<Story name="CustomTitle">
	<script>
		const users = [
			{ id: '1', name: 'John', status: 'online' }
		];
	</script>
	<OnlineUsersList users={users} title="Active Members" />
</Story>
