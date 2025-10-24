import { untrack } from 'svelte';
export function useCodeEditor(options = {}) {
    let value = $state(options.initialValue || '');
    let language = $state(options.language || 'javascript');
    let isDirty = $state(false);
    let editorInstance = null;
    const initialValue = options.initialValue || '';
    function handleValueChange(newValue) {
        value = newValue;
        isDirty = newValue !== initialValue;
        options.onChange?.(newValue);
    }
    function reset() {
        value = initialValue;
        isDirty = false;
        if (editorInstance) {
            editorInstance.setValue(initialValue);
        }
    }
    function save() {
        if (isDirty) {
            options.onSave?.(value);
            isDirty = false;
        }
    }
    function setLanguage(newLanguage) {
        language = newLanguage;
    }
    function bindEditor(instance) {
        editorInstance = instance;
    }
    function insertSnippet(snippet) {
        if (editorInstance) {
            editorInstance.insertText(snippet);
        }
    }
    function getSelectedText() {
        return editorInstance?.getSelection() || '';
    }
    function focusEditor() {
        editorInstance?.focus();
    }
    return {
        get value() { return value; },
        set value(v) { value = v; },
        get language() { return language; },
        get isDirty() { return isDirty; },
        handleValueChange,
        reset,
        save,
        setLanguage,
        bindEditor,
        insertSnippet,
        getSelectedText,
        focusEditor
    };
}
export function useCodeEditorTabs(initialTabs = []) {
    let tabs = $state(initialTabs.map(tab => ({ ...tab, isDirty: false })));
    let activeTabId = $state(tabs[0]?.id || '');
    const activeTab = $derived(tabs.find(t => t.id === activeTabId));
    function addTab(tab) {
        tabs = [...tabs, { ...tab, isDirty: false }];
        activeTabId = tab.id;
    }
    function removeTab(id) {
        const index = tabs.findIndex(t => t.id === id);
        if (index !== -1) {
            tabs = tabs.filter(t => t.id !== id);
            if (activeTabId === id && tabs.length > 0) {
                activeTabId = tabs[index === 0 ? 0 : index - 1].id;
            }
        }
    }
    function updateTab(id, updates) {
        tabs = tabs.map(tab => tab.id === id ? { ...tab, ...updates } : tab);
    }
    function setActiveTab(id) {
        activeTabId = id;
    }
    function markDirty(id, dirty) {
        updateTab(id, { isDirty: dirty });
    }
    return {
        get tabs() { return tabs; },
        get activeTabId() { return activeTabId; },
        get activeTab() { return activeTab; },
        addTab,
        removeTab,
        updateTab,
        setActiveTab,
        markDirty
    };
}
