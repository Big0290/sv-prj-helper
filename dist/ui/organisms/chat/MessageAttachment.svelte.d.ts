export interface Attachment {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    thumbnail?: string;
}
interface Props {
    attachment: Attachment;
    onDownload?: (attachment: Attachment) => void;
    variant?: 'inline' | 'compact';
}
declare const MessageAttachment: import("svelte").Component<Props, {}, "">;
type MessageAttachment = ReturnType<typeof MessageAttachment>;
export default MessageAttachment;
