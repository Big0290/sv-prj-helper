/**
 * Interface for TypeScript type extraction functionality
 */

import type {
  TypeDefinition,
  EnumDefinition,
  ResolvedType,
  PropDefinition
} from '../types/index.ts';

export interface ITypeExtractor {
  /**
   * Extracts TypeScript interfaces from a file
   */
  extractInterfaces(filePath: string): Promise<TypeDefinition[]>;

  /**
   * Extracts TypeScript enums from a file
   */
  extractEnums(filePath: string): Promise<EnumDefinition[]>;

  /**
   * Resolves type references and their dependencies
   */
  resolveTypeReferences(type: string, filePath: string): Promise<ResolvedType>;

  /**
   * Extracts prop types from TypeScript interfaces
   */
  extractPropTypes(interfaceName: string, filePath: string): Promise<PropDefinition[]>;

  /**
   * Resolves import statements and external type dependencies
   */
  resolveImports(filePath: string): Promise<Record<string, string>>;

  /**
   * Validates TypeScript syntax and reports errors
   */
  validateTypeScript(content: string, filePath: string): Promise<boolean>;
}