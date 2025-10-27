export interface UserProfileProps {
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
export interface UserProfileEvents {
}
export interface UserProfileSlots {
    default: {};
}
//# sourceMappingURL=UserProfile.types.d.ts.map