export interface CodeEditorProps {
    value?: string;
    language?: 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json' | 'markdown' | 'plaintext';
    theme?: 'light' | 'dark';
    readOnly?: boolean;
    lineNumbers?: boolean;
    lineWrapping?: boolean;
    placeholder?: string;
    minHeight?: string;
    maxHeight?: string;
    tabSize?: number;
    indentUnit?: string;
    onValueChange?: (value: string) => void;
}
export interface CodeEditorEvents {
}
export interface CodeEditorSlots {
    default: {};
}
//# sourceMappingURL=CodeEditor.types.d.ts.map