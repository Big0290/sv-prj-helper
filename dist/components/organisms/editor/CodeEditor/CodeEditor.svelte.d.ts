import type { CodeEditorProps } from './CodeEditor.types.js';
declare const CodeEditor: import("svelte").Component<CodeEditorProps, {
    getValue: () => string;
    setValue: (newValue: string) => void;
    focus: () => void;
    insertText: (text: string) => void;
    getSelection: () => string;
}, "value">;
type CodeEditor = ReturnType<typeof CodeEditor>;
export default CodeEditor;
//# sourceMappingURL=CodeEditor.svelte.d.ts.map