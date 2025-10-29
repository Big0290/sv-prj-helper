/**
 * TypeScript Interface Extractor for analyzing TypeScript interfaces and types
 */

import { parse as parseTypeScript } from '@typescript-eslint/typescript-estree';
import type {
  TypeDefinition,
  PropertyDefinition,
  EnumDefinition,
  EnumValue,
  ResolvedType,
  ParseError
} from '../types/index.ts';
import { Logger } from '../utils/Logger.ts';
import { FileUtils } from '../utils/FileUtils.ts';
import type { GeneratorConfig } from '../config/GeneratorConfig.ts';

export interface TypeExtractionResult {
  success: boolean;
  interfaces: TypeDefinition[];
  types: TypeDefinition[];
  enums: EnumDefinition[];
  imports: ImportInfo[];
  exports: ExportInfo[];
  errors: ParseError[];
  warnings: string[];
}

export interface ImportInfo {
  source: string;
  imports: string[];
  isTypeOnly: boolean;
}

export interface ExportInfo {
  name: string;
  type: 'interface' | 'type' | 'enum' | 'function' | 'const';
  isDefault: boolean;
}

export interface TypeReference {
  name: string;
  filePath: string;
  definition: TypeDefinition;
}

export class TypeScriptExtractor {
  private logger: Logger;
  private fileUtils: FileUtils;
  private typeCache: Map<string, TypeDefinition> = new Map();
  private resolvedTypes: Map<string, ResolvedType> = new Map();

  constructor(private config: GeneratorConfig) {
    this.logger = new Logger(config.verbose);
    this.fileUtils = new FileUtils(config);
  }

  /**
   * Extracts TypeScript interfaces and types from a file
   */
  async extractFromFile(filePath: string): Promise<TypeExtractionResult> {
    const result: TypeExtractionResult = {
      success: false,
      interfaces: [],
      types: [],
      enums: [],
      imports: [],
      exports: [],
      errors: [],
      warnings: []
    };

    try {
      this.logger.info(`Extracting types from: ${filePath}`);

      const content = await this.fileUtils.readFile(filePath);
      
      if (!content.trim()) {
        result.success = true;
        return result;
      }

      // Parse TypeScript AST
      const ast = parseTypeScript(content, {
        loc: true,
        range: true,
        tokens: false,
        comment: true,
        jsx: false
      });

      // Extract different type definitions
      result.interfaces = this.extractInterfaces(ast, content, filePath);
      result.types = this.extractTypeAliases(ast, content, filePath);
      result.enums = this.extractEnums(ast, content, filePath);
      result.imports = this.extractImports(ast);
      result.exports = this.extractExports(ast);

      // Cache extracted types for cross-reference resolution
      this.cacheTypes(result.interfaces, filePath);
      this.cacheTypes(result.types, filePath);

      result.success = true;
      this.logger.info(`Successfully extracted ${result.interfaces.length} interfaces, ${result.types.length} types, ${result.enums.length} enums`);

    } catch (error) {
      const parseError: ParseError = {
        file: filePath,
        message: `Failed to extract types: ${error}`,
        type: 'syntax'
      };
      result.errors.push(parseError);
      this.logger.error(`Error extracting types from ${filePath}: ${error}`);
    }

    return result;
  }

  /**
   * Extracts interface definitions from AST
   */
  private extractInterfaces(ast: any, content: string, filePath: string): TypeDefinition[] {
    const interfaces: TypeDefinition[] = [];

    try {
      if (!ast.body) return interfaces;

      for (const node of ast.body) {
        if (node.type === 'TSInterfaceDeclaration') {
          const interfaceDefinition = this.extractInterfaceDefinition(node, content, filePath);
          if (interfaceDefinition) {
            interfaces.push(interfaceDefinition);
          }
        } else if (node.type === 'ExportNamedDeclaration' && node.declaration?.type === 'TSInterfaceDeclaration') {
          // Handle exported interfaces
          const interfaceDefinition = this.extractInterfaceDefinition(node.declaration, content, filePath);
          if (interfaceDefinition) {
            interfaces.push(interfaceDefinition);
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting interfaces: ${error}`);
    }

    return interfaces;
  }

  /**
   * Extracts a single interface definition
   */
  private extractInterfaceDefinition(node: any, content: string, filePath: string): TypeDefinition | null {
    try {
      const name = node.id.name;
      const description = this.extractJSDocComment(node, content);
      const properties = this.extractInterfaceProperties(node.body);

      // Generate the full interface definition string
      const definition = this.generateInterfaceString(node, content);

      return {
        name,
        type: 'interface',
        definition,
        description: description || `Interface: ${name}`,
        properties
      };
    } catch (error) {
      this.logger.warn(`Error extracting interface definition: ${error}`);
      return null;
    }
  }

  /**
   * Extracts properties from interface body
   */
  private extractInterfaceProperties(body: any): PropertyDefinition[] {
    const properties: PropertyDefinition[] = [];

    try {
      if (!body || !body.body) return properties;

      for (const member of body.body) {
        if (member.type === 'TSPropertySignature') {
          const property = this.extractPropertyDefinition(member);
          if (property) {
            properties.push(property);
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting interface properties: ${error}`);
    }

    return properties;
  }

  /**
   * Extracts a single property definition
   */
  private extractPropertyDefinition(member: any): PropertyDefinition | null {
    try {
      const name = member.key?.name || member.key?.value;
      if (!name) return null;

      const optional = member.optional || false;
      const type = this.extractTypeString(member.typeAnnotation?.typeAnnotation);
      const description = this.extractPropertyComment(member);

      return {
        name,
        type,
        optional,
        description: description || `Property: ${name}`
      };
    } catch (error) {
      this.logger.warn(`Error extracting property definition: ${error}`);
      return null;
    }
  }

  /**
   * Extracts type aliases from AST
   */
  private extractTypeAliases(ast: any, content: string, filePath: string): TypeDefinition[] {
    const types: TypeDefinition[] = [];

    try {
      if (!ast.body) return types;

      for (const node of ast.body) {
        if (node.type === 'TSTypeAliasDeclaration') {
          const typeDefinition = this.extractTypeAliasDefinition(node, content, filePath);
          if (typeDefinition) {
            types.push(typeDefinition);
          }
        } else if (node.type === 'ExportNamedDeclaration' && node.declaration?.type === 'TSTypeAliasDeclaration') {
          // Handle exported type aliases
          const typeDefinition = this.extractTypeAliasDefinition(node.declaration, content, filePath);
          if (typeDefinition) {
            types.push(typeDefinition);
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting type aliases: ${error}`);
    }

    return types;
  }

  /**
   * Extracts a single type alias definition
   */
  private extractTypeAliasDefinition(node: any, content: string, filePath: string): TypeDefinition | null {
    try {
      const name = node.id.name;
      const description = this.extractJSDocComment(node, content);
      const typeString = this.extractTypeString(node.typeAnnotation);

      return {
        name,
        type: 'type',
        definition: `type ${name} = ${typeString}`,
        description: description || `Type alias: ${name}`,
        properties: []
      };
    } catch (error) {
      this.logger.warn(`Error extracting type alias definition: ${error}`);
      return null;
    }
  }

  /**
   * Extracts enum definitions from AST
   */
  private extractEnums(ast: any, content: string, filePath: string): EnumDefinition[] {
    const enums: EnumDefinition[] = [];

    try {
      if (!ast.body) return enums;

      for (const node of ast.body) {
        if (node.type === 'TSEnumDeclaration') {
          const enumDefinition = this.extractEnumDefinition(node, content, filePath);
          if (enumDefinition) {
            enums.push(enumDefinition);
          }
        } else if (node.type === 'ExportNamedDeclaration' && node.declaration?.type === 'TSEnumDeclaration') {
          // Handle exported enums
          const enumDefinition = this.extractEnumDefinition(node.declaration, content, filePath);
          if (enumDefinition) {
            enums.push(enumDefinition);
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting enums: ${error}`);
    }

    return enums;
  }

  /**
   * Extracts a single enum definition
   */
  private extractEnumDefinition(node: any, content: string, filePath: string): EnumDefinition | null {
    try {
      const name = node.id.name;
      const description = this.extractJSDocComment(node, content);
      const values = this.extractEnumValues(node.members);

      return {
        name,
        values,
        description: description || `Enum: ${name}`
      };
    } catch (error) {
      this.logger.warn(`Error extracting enum definition: ${error}`);
      return null;
    }
  }

  /**
   * Extracts enum values
   */
  private extractEnumValues(members: any[]): EnumValue[] {
    const values: EnumValue[] = [];

    try {
      for (const member of members) {
        if (member.type === 'TSEnumMember') {
          const name = member.id?.name || member.id?.value;
          let value: string | number = name; // Default to name if no explicit value

          if (member.initializer) {
            if (member.initializer.type === 'Literal') {
              value = member.initializer.value;
            } else if (member.initializer.type === 'TemplateLiteral') {
              value = this.extractTemplateLiteral(member.initializer);
            }
          }

          values.push({
            name,
            value,
            description: `Enum value: ${name}`
          });
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting enum values: ${error}`);
    }

    return values;
  }

  /**
   * Extracts import statements
   */
  private extractImports(ast: any): ImportInfo[] {
    const imports: ImportInfo[] = [];

    try {
      if (!ast.body) return imports;

      for (const node of ast.body) {
        if (node.type === 'ImportDeclaration') {
          const importInfo = this.extractImportInfo(node);
          if (importInfo) {
            imports.push(importInfo);
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting imports: ${error}`);
    }

    return imports;
  }

  /**
   * Extracts import information from import declaration
   */
  private extractImportInfo(node: any): ImportInfo | null {
    try {
      const source = node.source.value;
      const isTypeOnly = node.importKind === 'type';
      const imports: string[] = [];

      if (node.specifiers) {
        for (const specifier of node.specifiers) {
          if (specifier.type === 'ImportDefaultSpecifier') {
            imports.push(specifier.local.name);
          } else if (specifier.type === 'ImportSpecifier') {
            imports.push(specifier.imported.name);
          } else if (specifier.type === 'ImportNamespaceSpecifier') {
            imports.push(`* as ${specifier.local.name}`);
          }
        }
      }

      return {
        source,
        imports,
        isTypeOnly
      };
    } catch (error) {
      this.logger.warn(`Error extracting import info: ${error}`);
      return null;
    }
  }

  /**
   * Extracts export statements
   */
  private extractExports(ast: any): ExportInfo[] {
    const exports: ExportInfo[] = [];

    try {
      if (!ast.body) return exports;

      for (const node of ast.body) {
        const exportInfo = this.extractExportInfo(node);
        if (exportInfo) {
          exports.push(exportInfo);
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting exports: ${error}`);
    }

    return exports;
  }

  /**
   * Extracts export information from various export types
   */
  private extractExportInfo(node: any): ExportInfo | null {
    try {
      switch (node.type) {
        case 'ExportNamedDeclaration':
          if (node.declaration) {
            return this.extractExportFromDeclaration(node.declaration, false);
          }
          // Handle export { ... } statements
          if (node.specifiers) {
            // For now, we'll handle the first specifier
            const firstSpec = node.specifiers[0];
            if (firstSpec && firstSpec.exported) {
              return {
                name: firstSpec.exported.name,
                type: 'const', // We don't know the exact type from export specifier
                isDefault: false
              };
            }
          }
          break;
        case 'ExportDefaultDeclaration':
          return this.extractExportFromDeclaration(node.declaration, true);
        case 'TSInterfaceDeclaration':
        case 'TSTypeAliasDeclaration':
        case 'TSEnumDeclaration':
          // These are exported if they appear at module level
          return this.extractExportFromDeclaration(node, false);
        case 'ExportAllDeclaration':
          // Handle export * from '...'
          return {
            name: '*',
            type: 'const',
            isDefault: false
          };
      }
    } catch (error) {
      this.logger.warn(`Error extracting export info: ${error}`);
    }

    return null;
  }

  /**
   * Extracts export info from declaration
   */
  private extractExportFromDeclaration(declaration: any, isDefault: boolean): ExportInfo | null {
    try {
      let name = '';
      let type: ExportInfo['type'] = 'const';

      switch (declaration.type) {
        case 'TSInterfaceDeclaration':
          name = declaration.id.name;
          type = 'interface';
          break;
        case 'TSTypeAliasDeclaration':
          name = declaration.id.name;
          type = 'type';
          break;
        case 'TSEnumDeclaration':
          name = declaration.id.name;
          type = 'enum';
          break;
        case 'FunctionDeclaration':
          name = declaration.id?.name || 'default';
          type = 'function';
          break;
        case 'VariableDeclaration':
          if (declaration.declarations && declaration.declarations[0]) {
            name = declaration.declarations[0].id?.name || 'default';
          }
          break;
        default:
          return null;
      }

      if (!name) return null;

      return {
        name,
        type,
        isDefault
      };
    } catch (error) {
      this.logger.warn(`Error extracting export from declaration: ${error}`);
      return null;
    }
  }

  /**
   * Extracts type string from type annotation
   */
  private extractTypeString(typeAnnotation: any): string {
    if (!typeAnnotation) return 'any';

    try {
      switch (typeAnnotation.type) {
        case 'TSStringKeyword':
          return 'string';
        case 'TSNumberKeyword':
          return 'number';
        case 'TSBooleanKeyword':
          return 'boolean';
        case 'TSVoidKeyword':
          return 'void';
        case 'TSAnyKeyword':
          return 'any';
        case 'TSUnknownKeyword':
          return 'unknown';
        case 'TSNullKeyword':
          return 'null';
        case 'TSUndefinedKeyword':
          return 'undefined';
        case 'TSUnionType':
          return typeAnnotation.types
            .map((t: any) => this.extractTypeString(t))
            .join(' | ');
        case 'TSIntersectionType':
          return typeAnnotation.types
            .map((t: any) => this.extractTypeString(t))
            .join(' & ');
        case 'TSArrayType':
          return `${this.extractTypeString(typeAnnotation.elementType)}[]`;
        case 'TSLiteralType':
          if (typeAnnotation.literal.type === 'Literal') {
            return typeof typeAnnotation.literal.value === 'string' 
              ? `'${typeAnnotation.literal.value}'`
              : String(typeAnnotation.literal.value);
          }
          return 'literal';
        case 'TSTypeReference':
          const typeName = typeAnnotation.typeName.name;
          if (typeAnnotation.typeParameters) {
            const params = typeAnnotation.typeParameters.params
              .map((p: any) => this.extractTypeString(p))
              .join(', ');
            return `${typeName}<${params}>`;
          }
          return typeName;
        case 'TSFunctionType':
          return this.extractFunctionTypeString(typeAnnotation);
        case 'TSTypeLiteral':
          return this.extractObjectTypeString(typeAnnotation);
        default:
          return 'any';
      }
    } catch (error) {
      this.logger.warn(`Error extracting type string: ${error}`);
      return 'any';
    }
  }

  /**
   * Extracts function type string
   */
  private extractFunctionTypeString(functionType: any): string {
    try {
      const params = functionType.parameters
        ?.map((param: any) => {
          const name = param.name || 'param';
          const type = this.extractTypeString(param.typeAnnotation?.typeAnnotation);
          return `${name}: ${type}`;
        })
        .join(', ') || '';

      const returnType = this.extractTypeString(functionType.typeAnnotation?.typeAnnotation);
      return `(${params}) => ${returnType}`;
    } catch (error) {
      return 'Function';
    }
  }

  /**
   * Extracts object type string
   */
  private extractObjectTypeString(objectType: any): string {
    try {
      if (!objectType.members || objectType.members.length === 0) {
        return '{}';
      }

      const members = objectType.members
        .map((member: any) => {
          if (member.type === 'TSPropertySignature') {
            const name = member.key?.name || member.key?.value;
            const optional = member.optional ? '?' : '';
            const type = this.extractTypeString(member.typeAnnotation?.typeAnnotation);
            return `${name}${optional}: ${type}`;
          }
          return '';
        })
        .filter(Boolean)
        .join('; ');

      return `{ ${members} }`;
    } catch (error) {
      return '{}';
    }
  }

  /**
   * Generates full interface string from AST node
   */
  private generateInterfaceString(node: any, content: string): string {
    try {
      // Extract the interface text from the original content
      if (node.range) {
        const [start, end] = node.range;
        return content.slice(start, end);
      }

      // Fallback: reconstruct from AST
      const name = node.id.name;
      const properties = this.extractInterfaceProperties(node.body);
      const propsString = properties
        .map(prop => `  ${prop.name}${prop.optional ? '?' : ''}: ${prop.type};`)
        .join('\n');

      return `interface ${name} {\n${propsString}\n}`;
    } catch (error) {
      return `interface ${node.id?.name || 'Unknown'} { /* Error extracting definition */ }`;
    }
  }

  /**
   * Extracts JSDoc comment from node
   */
  private extractJSDocComment(node: any, content: string): string | null {
    try {
      // Look for leading comments
      if (node.leadingComments) {
        for (const comment of node.leadingComments) {
          if (comment.type === 'Block' && comment.value.startsWith('*')) {
            // Extract the main description from JSDoc
            const lines = comment.value.split('\n');
            for (const line of lines) {
              const trimmed = line.trim().replace(/^\*\s?/, '');
              if (trimmed && !trimmed.startsWith('@')) {
                return trimmed;
              }
            }
          }
        }
      }

      // Fallback: look for comment before the node in content
      if (node.range) {
        const beforeNode = content.slice(0, node.range[0]);
        const commentMatch = beforeNode.match(/\/\*\*\s*\n\s*\*\s*([^\n@]+)/);
        if (commentMatch) {
          return commentMatch[1].trim();
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting JSDoc comment: ${error}`);
    }

    return null;
  }

  /**
   * Extracts property comment
   */
  private extractPropertyComment(member: any): string | null {
    // Similar to JSDoc extraction but for property-level comments
    return null;
  }

  /**
   * Extracts template literal value
   */
  private extractTemplateLiteral(node: any): string {
    try {
      if (node.quasis && node.quasis.length === 1 && node.expressions.length === 0) {
        return node.quasis[0].value.cooked || node.quasis[0].value.raw;
      }
      return 'template literal';
    } catch (error) {
      return 'template literal';
    }
  }

  /**
   * Caches extracted types for cross-reference resolution
   */
  private cacheTypes(types: TypeDefinition[], filePath: string): void {
    for (const type of types) {
      const key = `${filePath}:${type.name}`;
      this.typeCache.set(key, type);
      this.typeCache.set(type.name, type); // Also cache by name for quick lookup
    }
  }

  /**
   * Resolves type references across files
   */
  async resolveTypeReferences(
    typeName: string,
    currentFilePath: string,
    imports: ImportInfo[]
  ): Promise<ResolvedType | null> {
    const cacheKey = `${currentFilePath}:${typeName}`;
    
    if (this.resolvedTypes.has(cacheKey)) {
      return this.resolvedTypes.get(cacheKey)!;
    }

    try {
      // First, check local cache
      let type = this.typeCache.get(typeName);
      
      if (!type) {
        // Look in imports
        for (const importInfo of imports) {
          if (importInfo.imports.includes(typeName)) {
            // Try to resolve from imported file
            const resolvedPath = this.resolveImportPath(importInfo.source, currentFilePath);
            if (resolvedPath && await this.fileUtils.fileExists(resolvedPath)) {
              const importResult = await this.extractFromFile(resolvedPath);
              type = [...importResult.interfaces, ...importResult.types]
                .find(t => t.name === typeName);
              break;
            }
          }
        }
      }

      if (type) {
        const resolved: ResolvedType = {
          name: typeName,
          definition: type.definition,
          dependencies: this.extractTypeDependencies(type.definition)
        };

        this.resolvedTypes.set(cacheKey, resolved);
        return resolved;
      }
    } catch (error) {
      this.logger.warn(`Error resolving type reference ${typeName}: ${error}`);
    }

    return null;
  }

  /**
   * Resolves import path relative to current file
   */
  private resolveImportPath(importPath: string, currentFilePath: string): string | null {
    try {
      if (importPath.startsWith('.')) {
        // Relative import
        const { dirname, join } = require('path');
        const currentDir = dirname(currentFilePath);
        return join(currentDir, importPath + '.ts');
      } else {
        // Absolute import - would need more sophisticated resolution
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  /**
   * Extracts type dependencies from definition string
   */
  private extractTypeDependencies(definition: string): string[] {
    const dependencies: string[] = [];
    
    try {
      // Simple regex to find type references
      const typeRefs = definition.matchAll(/\b([A-Z][a-zA-Z0-9]*)\b/g);
      
      for (const match of typeRefs) {
        const [, typeName] = match;
        if (!['String', 'Number', 'Boolean', 'Array', 'Object', 'Function'].includes(typeName)) {
          dependencies.push(typeName);
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting type dependencies: ${error}`);
    }

    return [...new Set(dependencies)]; // Remove duplicates
  }

  /**
   * Gets all cached types
   */
  getCachedTypes(): Map<string, TypeDefinition> {
    return new Map(this.typeCache);
  }

  /**
   * Clears the type cache
   */
  clearCache(): void {
    this.typeCache.clear();
    this.resolvedTypes.clear();
  }
}