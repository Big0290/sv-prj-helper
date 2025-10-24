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
declare const OnlineUsersList: import("svelte").Component<Props, {}, "">;
type OnlineUsersList = ReturnType<typeof OnlineUsersList>;
export default OnlineUsersList;
