import type { ComponentDocumentation, DocumentationMetadata } from './types.js';
/**
 * Generate documentation for all components in the library
 */
export declare function generateAllDocumentation(srcPath?: string): Promise<DocumentationMetadata>;
/**
 * Update documentation for a specific component
 */
export declare function updateComponentDocumentation(componentPath: string, componentName: string, customDescription?: string): Promise<ComponentDocumentation | null>;
/**
 * Validate that all components have proper documentation
 */
export declare function validateDocumentation(srcPath?: string): Promise<string[]>;
//# sourceMappingURL=generator.d.ts.map