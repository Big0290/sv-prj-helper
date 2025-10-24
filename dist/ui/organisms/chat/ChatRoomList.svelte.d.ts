export interface ChatRoom {
    id: string;
    name: string;
    avatar?: string;
    lastMessage?: string;
    lastMessageTime?: Date;
    unreadCount?: number;
    isOnline?: boolean;
    isTyping?: boolean;
}
interface Props {
    rooms: ChatRoom[];
    activeRoomId?: string;
    onRoomSelect?: (room: ChatRoom) => void;
    searchable?: boolean;
}
declare const ChatRoomList: import("svelte").Component<Props, {}, "">;
type ChatRoomList = ReturnType<typeof ChatRoomList>;
export default ChatRoomList;
