interface Props {
    status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
    timestamp?: Date;
    showTimestamp?: boolean;
}
declare const MessageStatus: import("svelte").Component<Props, {}, "">;
type MessageStatus = ReturnType<typeof MessageStatus>;
export default MessageStatus;
