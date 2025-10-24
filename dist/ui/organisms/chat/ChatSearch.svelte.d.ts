interface SearchResult {
    id: string;
    messageText: string;
    senderName: string;
    timestamp: Date;
    matchedText?: string;
}
interface Props {
    results?: SearchResult[];
    isSearching?: boolean;
    query?: string;
    onSearch?: (query: string) => void;
    onResultClick?: (resultId: string) => void;
    onClose?: () => void;
    placeholder?: string;
}
declare const ChatSearch: import("svelte").Component<Props, {}, "query">;
type ChatSearch = ReturnType<typeof ChatSearch>;
export default ChatSearch;
