interface Props {
    userName: string;
    messageText: string;
    messageType?: 'text' | 'image' | 'video' | 'audio' | 'file';
    avatar?: string;
    onQuoteClick?: () => void;
    variant?: 'compact' | 'full';
    closable?: boolean;
    onClose?: () => void;
}
declare const MessageQuote: import("svelte").Component<Props, {}, "">;
type MessageQuote = ReturnType<typeof MessageQuote>;
export default MessageQuote;
