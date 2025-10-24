interface Props {
    value?: string;
    placeholder?: string;
    minHeight?: string;
    maxHeight?: string;
    showPreview?: boolean;
    previewMode?: 'side' | 'tabs';
    disabled?: boolean;
    toolbar?: boolean;
    onValueChange?: (value: string) => void;
}
declare const MarkdownEditor: import("svelte").Component<Props, {}, "value">;
type MarkdownEditor = ReturnType<typeof MarkdownEditor>;
export default MarkdownEditor;
