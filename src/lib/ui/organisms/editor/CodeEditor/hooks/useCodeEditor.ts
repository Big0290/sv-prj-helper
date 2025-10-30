import { untrack } from 'svelte';

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

export function useCodeEditor(options: UseCodeEditorOptions = {}) {
	let value = $state(options.initialValue || '');
	let language = $state(options.language || 'javascript');
	let isDirty = $state(false);
	let editorInstance: CodeEditorInstance | null = null;

	const initialValue = options.initialValue || '';

	function handleValueChange(newValue: string) {
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

	function setLanguage(newLanguage: string) {
		language = newLanguage;
	}

	function bindEditor(instance: CodeEditorInstance) {
		editorInstance = instance;
	}

	function insertSnippet(snippet: string) {
		if (editorInstance) {
			editorInstance.insertText(snippet);
		}
	}

	function getSelectedText(): string {
		return editorInstance?.getSelection() || '';
	}

	function focusEditor() {
		editorInstance?.focus();
	}

	return {
		get value() { return value; },
		set value(v: string) { value = v; },
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

// Utility for creating multiple editor tabs
export interface EditorTab {
	id: string;
	title: string;
	language: string;
	value: string;
	isDirty: boolean;
}

export function useCodeEditorTabs(initialTabs: Omit<EditorTab, 'isDirty'>[] = []) {
	let tabs = $state<EditorTab[]>(
		initialTabs.map(tab => ({ ...tab, isDirty: false }))
	);
	let activeTabId = $state<string>(tabs[0]?.id || '');

	const activeTab = $derived(tabs.find(t => t.id === activeTabId));

	function addTab(tab: Omit<EditorTab, 'isDirty'>) {
		tabs = [...tabs, { ...tab, isDirty: false }];
		activeTabId = tab.id;
	}

	function removeTab(id: string) {
		const index = tabs.findIndex(t => t.id === id);
		if (index !== -1) {
			tabs = tabs.filter(t => t.id !== id);
			if (activeTabId === id && tabs.length > 0) {
				activeTabId = tabs[index === 0 ? 0 : index - 1].id;
			}
		}
	}

	function updateTab(id: string, updates: Partial<EditorTab>) {
		tabs = tabs.map(tab => 
			tab.id === id ? { ...tab, ...updates } : tab
		);
	}

	function setActiveTab(id: string) {
		activeTabId = id;
	}

	function markDirty(id: string, dirty: boolean) {
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
