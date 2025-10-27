interface Props {
    message: string;
    sender?: 'user' | 'other';
    senderName?: string;
    timestamp?: Date;
    avatar?: string;
    showAvatar?: boolean;
    showTimestamp?: boolean;
}
declare const ChatBubble: import("svelte").Component<Props, {}, "">;
type ChatBubble = ReturnType<typeof ChatBubble>;
export default ChatBubble;
//# sourceMappingURL=ChatBubble.svelte.d.ts.map