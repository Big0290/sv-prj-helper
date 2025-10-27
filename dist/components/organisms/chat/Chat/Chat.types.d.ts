export interface ChatProps {
    messages?: Message[];
    placeholder?: string;
    currentUser?: string;
    showTypingIndicator?: boolean;
    onSend?: (message: string) => void;
    height?: string;
}
export interface ChatEvents {
}
export interface ChatSlots {
    default: {};
}
//# sourceMappingURL=Chat.types.d.ts.map