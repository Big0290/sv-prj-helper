export interface OnlineUsersListProps {
    users: User[];
    onUserClick?: (userId: string) => void;
    showOffline?: boolean;
    variant?: 'list' | 'grid' | 'compact';
    title?: string;
}
export interface OnlineUsersListEvents {
}
export interface OnlineUsersListSlots {
    default: {};
}
//# sourceMappingURL=OnlineUsersList.types.d.ts.map