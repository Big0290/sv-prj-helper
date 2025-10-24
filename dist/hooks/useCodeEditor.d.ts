export interface CodeEditorState {
    value: string;
    language: string;
    isDirty: boolean;
    canUndo: boolean;
    canRedo: boolean;
}
export interface CodeEditorInstance {
    getValue(): string;
    setValue(value: string): void;
    insertText(text: string): void;
    getSelection(): string;
    focus(): void;
}
export interface UseCodeEditorOptions {
    initialValue?: string;
    language?: string;
    onChange?: (value: string) => void;
    onSave?: (value: string) => void;
}
export declare function useCodeEditor(options?: UseCodeEditorOptions): {
    value: string;
    readonly language: string;
    readonly isDirty: boolean;
    handleValueChange: (newValue: string) => void;
    reset: () => void;
    save: () => void;
    setLanguage: (newLanguage: string) => void;
    bindEditor: (instance: CodeEditorInstance) => void;
    insertSnippet: (snippet: string) => void;
    getSelectedText: () => string;
    focusEditor: () => void;
};
export interface EditorTab {
    id: string;
    title: string;
    language: string;
    value: string;
    isDirty: boolean;
}
export declare function useCodeEditorTabs(initialTabs?: Omit<EditorTab, 'isDirty'>[]): {
    readonly tabs: EditorTab[];
    readonly activeTabId: string;
    readonly activeTab: EditorTab | undefined;
    addTab: (tab: Omit<EditorTab, "isDirty">) => void;
    removeTab: (id: string) => void;
    updateTab: (id: string, updates: Partial<EditorTab>) => void;
    setActiveTab: (id: string) => void;
    markDirty: (id: string, dirty: boolean) => void;
};
