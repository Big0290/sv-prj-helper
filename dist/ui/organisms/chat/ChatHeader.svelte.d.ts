interface Props {
    name: string;
    avatar?: string;
    isOnline?: boolean;
    lastSeen?: Date;
    isTyping?: boolean;
    onCallClick?: () => void;
    onVideoClick?: () => void;
    onInfoClick?: () => void;
}
declare const ChatHeader: import("svelte").Component<Props, {}, "">;
type ChatHeader = ReturnType<typeof ChatHeader>;
export default ChatHeader;
//# sourceMappingURL=ChatHeader.svelte.d.ts.map