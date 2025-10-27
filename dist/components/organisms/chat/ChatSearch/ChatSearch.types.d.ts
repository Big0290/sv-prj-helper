export interface ChatSearchProps {
    results?: SearchResult[];
    isSearching?: boolean;
    query?: string;
    onSearch?: (query: string) => void;
    onResultClick?: (resultId: string) => void;
    onClose?: () => void;
    placeholder?: string;
}
export interface ChatSearchEvents {
}
export interface ChatSearchSlots {
    default: {};
}
//# sourceMappingURL=ChatSearch.types.d.ts.map