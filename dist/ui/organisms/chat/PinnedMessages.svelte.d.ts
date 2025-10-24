interface PinnedMessage {
    id: string;
    text: string;
    senderName: string;
    timestamp: Date;
}
interface Props {
    messages?: PinnedMessage[];
    onMessageClick?: (messageId: string) => void;
    onUnpin?: (messageId: string) => void;
    onClose?: () => void;
    maxVisible?: number;
}
declare const PinnedMessages: import("svelte").Component<Props, {}, "">;
type PinnedMessages = ReturnType<typeof PinnedMessages>;
export default PinnedMessages;
