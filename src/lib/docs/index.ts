/**
 * Documentation system for SV Project Helper UI Library
 * 
 * This module provides tools for generating, parsing, and maintaining
 * component documentation with standardized templates and automated
 * extraction from TypeScript interfaces.
 */

// Types
export type {
  ComponentDocumentation,
  PropDefinition,
  EventDefinition,
  SlotDefinition,
  CodeExample,
  AccessibilityInfo,
  ComponentRegistry,
  CategoryDefinition,
  DocumentationMetadata,
  DocumentationTemplate
} from './types.js';

// Template generation
export {
  generateComponentReadme,
  getDocumentationTemplates,
  validateDocumentation as validateDocumentationTemplate
} from './templates.js';

// Parsing utilities
export {
  parsePropsFromInterface,
  parseEventsFromInterface,
  parseSlotsFromInterface,
  parseAccessibilityInfo,
  generateBasicExamples,
  createComponentDocumentation
} from './parser.js';

// Documentation generation
export {
  generateAllDocumentation,
  updateComponentDocumentation,
  validateDocumentation
} from './generator.js';