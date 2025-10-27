export interface MessageQuoteProps {
    userName: string;
    messageText: string;
    messageType?: 'text' | 'image' | 'video' | 'audio' | 'file';
    avatar?: string;
    onQuoteClick?: () => void;
    variant?: 'compact' | 'full';
    closable?: boolean;
    onClose?: () => void;
}
export interface MessageQuoteEvents {
}
export interface MessageQuoteSlots {
    default: {};
}
//# sourceMappingURL=MessageQuote.types.d.ts.map