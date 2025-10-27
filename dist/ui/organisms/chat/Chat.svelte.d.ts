export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'other';
    timestamp: Date;
    avatar?: string;
    senderName?: string;
}
interface Props {
    messages?: Message[];
    placeholder?: string;
    currentUser?: string;
    showTypingIndicator?: boolean;
    onSend?: (message: string) => void;
    height?: string;
}
declare const Chat: import("svelte").Component<Props, {}, "">;
type Chat = ReturnType<typeof Chat>;
export default Chat;
//# sourceMappingURL=Chat.svelte.d.ts.map