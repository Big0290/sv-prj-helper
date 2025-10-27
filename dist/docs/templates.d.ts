import type { ComponentDocumentation, DocumentationTemplate } from './types.js';
/**
 * Generate a standardized README template for a component
 */
export declare function generateComponentReadme(doc: ComponentDocumentation): string;
/**
 * Get available documentation templates
 */
export declare function getDocumentationTemplates(): DocumentationTemplate[];
/**
 * Validate that a README contains all required sections
 */
export declare function validateDocumentation(content: string, template: DocumentationTemplate): string[];
//# sourceMappingURL=templates.d.ts.map