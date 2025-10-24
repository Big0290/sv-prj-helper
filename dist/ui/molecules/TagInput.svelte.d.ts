interface Props {
    tags?: string[];
    placeholder?: string;
    maxTags?: number;
    allowDuplicates?: boolean;
    onAdd?: (tag: string) => void;
    onRemove?: (tag: string) => void;
    disabled?: boolean;
}
declare const TagInput: import("svelte").Component<Props, {}, "tags">;
type TagInput = ReturnType<typeof TagInput>;
export default TagInput;
