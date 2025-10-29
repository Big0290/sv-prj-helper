/**
 * Interface for component analysis functionality
 */

import type {
  ComponentInfo,
  PropDefinition,
  EventDefinition,
  SlotDefinition,
  MethodDefinition,
  ParseError
} from '../types/index.ts';

export interface IComponentAnalyzer {
  /**
   * Analyzes a Svelte component file and extracts its API information
   */
  analyzeComponent(filePath: string): Promise<ComponentInfo>;

  /**
   * Extracts prop definitions from a component
   */
  extractProps(componentContent: string, filePath: string): Promise<PropDefinition[]>;

  /**
   * Extracts event definitions from a component
   */
  extractEvents(componentContent: string, filePath: string): Promise<EventDefinition[]>;

  /**
   * Extracts slot definitions from a component
   */
  extractSlots(componentContent: string, filePath: string): Promise<SlotDefinition[]>;

  /**
   * Extracts method definitions from a component
   */
  extractMethods(componentContent: string, filePath: string): Promise<MethodDefinition[]>;

  /**
   * Categorizes a component based on its file path and structure
   */
  categorizeComponent(filePath: string): ComponentCategory;

  /**
   * Handles parsing errors gracefully
   */
  handleParseError(error: ParseError, filePath: string): Promise<Partial<ComponentInfo>>;
}

type ComponentCategory = 'atom' | 'molecule' | 'organism' | 'layout' | 'util' | 'hook' | 'theme';