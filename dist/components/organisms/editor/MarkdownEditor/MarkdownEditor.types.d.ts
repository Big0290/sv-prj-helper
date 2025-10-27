export interface MarkdownEditorProps {
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
export interface MarkdownEditorEvents {
}
export interface MarkdownEditorSlots {
    default: {};
}
//# sourceMappingURL=MarkdownEditor.types.d.ts.map