export interface PinnedMessagesProps {
    messages?: PinnedMessage[];
    onMessageClick?: (messageId: string) => void;
    onUnpin?: (messageId: string) => void;
    onClose?: () => void;
    maxVisible?: number;
}
export interface PinnedMessagesEvents {
}
export interface PinnedMessagesSlots {
    default: {};
}
//# sourceMappingURL=PinnedMessages.types.d.ts.map