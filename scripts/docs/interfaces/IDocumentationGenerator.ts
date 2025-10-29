/**
 * Interface for the main documentation generation orchestrator
 */

import type {
  LLMDocumentation,
  ComponentInfo,
  ValidationResult,
  ParseError
} from '../types/index.ts';

export interface IDocumentationGenerator {
  /**
   * Generates complete LLM documentation for the component library
   */
  generateDocumentation(sourceDirectory: string): Promise<LLMDocumentation>;

  /**
   * Scans the source directory for components
   */
  scanComponents(directory: string): Promise<string[]>;

  /**
   * Analyzes all components and generates documentation
   */
  analyzeComponents(componentPaths: string[]): Promise<ComponentInfo[]>;

  /**
   * Generates the final LLM.md file
   */
  generateLLMMarkdown(documentation: LLMDocumentation, outputPath: string): Promise<void>;

  /**
   * Validates the generated documentation
   */
  validateDocumentation(documentation: LLMDocumentation): Promise<ValidationResult>;

  /**
   * Handles errors during documentation generation
   */
  handleGenerationError(error: ParseError, context: string): Promise<void>;

  /**
   * Provides progress tracking during generation
   */
  onProgress(callback: (progress: GenerationProgress) => void): void;
}

export interface GenerationProgress {
  stage: 'scanning' | 'analyzing' | 'generating' | 'validating' | 'complete';
  current: number;
  total: number;
  message: string;
}