export interface ChatHeaderProps {
    name: string;
    avatar?: string;
    isOnline?: boolean;
    lastSeen?: Date;
    isTyping?: boolean;
    onCallClick?: () => void;
    onVideoClick?: () => void;
    onInfoClick?: () => void;
}
export interface ChatHeaderEvents {
}
export interface ChatHeaderSlots {
    default: {};
}
//# sourceMappingURL=ChatHeader.types.d.ts.map