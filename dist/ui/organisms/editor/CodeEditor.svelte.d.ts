interface Props {
    value?: string;
    language?: 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json' | 'markdown' | 'svelte' | 'plaintext';
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
declare const CodeEditor: import("svelte").Component<Props, {
    getValue: () => string;
    setValue: (newValue: string) => void;
    focus: () => void;
    insertText: (text: string) => void;
    getSelection: () => string;
}, "value">;
type CodeEditor = ReturnType<typeof CodeEditor>;
export default CodeEditor;
//# sourceMappingURL=CodeEditor.svelte.d.ts.map