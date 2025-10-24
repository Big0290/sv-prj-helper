interface Props {
    onSend?: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
    showCounter?: boolean;
}
declare const ChatInput: import("svelte").Component<Props, {}, "">;
type ChatInput = ReturnType<typeof ChatInput>;
export default ChatInput;
