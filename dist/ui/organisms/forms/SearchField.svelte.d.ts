interface Props {
    value?: string;
    placeholder?: string;
    suggestions?: string[];
    onSearch?: (value: string) => void;
    onSelect?: (value: string) => void;
    loading?: boolean;
}
declare const SearchField: import("svelte").Component<Props, {}, "value">;
type SearchField = ReturnType<typeof SearchField>;
export default SearchField;
//# sourceMappingURL=SearchField.svelte.d.ts.map