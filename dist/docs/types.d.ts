/**
 * Documentation system types for component library
 */
export interface PropDefinition {
    name: string;
    type: string;
    defaultValue?: string;
    required: boolean;
    description: string;
}
export interface EventDefinition {
    name: string;
    type: string;
    description: string;
    detail?: string;
}
export interface SlotDefinition {
    name: string;
    props?: Record<string, string>;
    description: string;
}
export interface CodeExample {
    title: string;
    description?: string;
    code: string;
    language: 'svelte' | 'typescript' | 'javascript';
    category?: 'basic' | 'advanced' | 'styling' | 'accessibility';
}
export interface AccessibilityInfo {
    keyboardNavigation?: string[];
    ariaAttributes?: string[];
    screenReaderSupport?: string;
    focusManagement?: string;
    guidelines?: string[];
}
export interface ComponentDocumentation {
    name: string;
    description: string;
    category: 'atoms' | 'molecules' | 'organisms' | 'layouts' | 'utils' | 'hooks' | 'theme';
    importPath: string;
    props: PropDefinition[];
    events: EventDefinition[];
    slots: SlotDefinition[];
    examples: CodeExample[];
    accessibility: AccessibilityInfo;
    version?: string;
    lastUpdated?: string;
    dependencies?: string[];
    relatedComponents?: string[];
}
export interface ComponentRegistry {
    [componentName: string]: {
        path: string;
        category: ComponentDocumentation['category'];
        exports: string[];
        dependencies: string[];
        documentation: ComponentDocumentation;
    };
}
export interface CategoryDefinition {
    name: string;
    description: string;
    components: string[];
}
export interface DocumentationMetadata {
    version: string;
    lastUpdated: string;
    components: ComponentRegistry;
    categories: CategoryDefinition[];
    totalComponents: number;
}
export interface DocumentationTemplate {
    name: string;
    category: ComponentDocumentation['category'];
    template: string;
    requiredSections: string[];
}
//# sourceMappingURL=types.d.ts.map