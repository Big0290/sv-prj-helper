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
declare const UserProfile: import("svelte").Component<Props, {}, "">;
type UserProfile = ReturnType<typeof UserProfile>;
export default UserProfile;
