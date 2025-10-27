export interface CodeBlockProps {
    code: string;
    language?: 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json' | 'markdown' | 'bash' | 'plaintext';
    showLineNumbers?: boolean;
    title?: string;
    copyable?: boolean;
    maxHeight?: string;
    theme?: 'dark' | 'light';
}
export interface CodeBlockEvents {
}
export interface CodeBlockSlots {
    default: {};
}
//# sourceMappingURL=CodeBlock.types.d.ts.map