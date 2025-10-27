import type { ComponentDocumentation, PropDefinition, EventDefinition, SlotDefinition, CodeExample, AccessibilityInfo } from './types.js';
/**
 * Parse component TypeScript interface to extract prop definitions
 */
export declare function parsePropsFromInterface(interfaceContent: string): PropDefinition[];
/**
 * Parse component events from TypeScript interface
 */
export declare function parseEventsFromInterface(interfaceContent: string): EventDefinition[];
/**
 * Parse component slots from TypeScript interface
 */
export declare function parseSlotsFromInterface(interfaceContent: string): SlotDefinition[];
/**
 * Extract accessibility information from component comments and code
 */
export declare function parseAccessibilityInfo(componentContent: string): AccessibilityInfo;
/**
 * Generate basic code examples for a component
 */
export declare function generateBasicExamples(componentName: string, props: PropDefinition[]): CodeExample[];
/**
 * Create complete component documentation from parsed information
 */
export declare function createComponentDocumentation(name: string, category: ComponentDocumentation['category'], importPath: string, typeContent: string, componentContent: string, description?: string): ComponentDocumentation;
//# sourceMappingURL=parser.d.ts.map