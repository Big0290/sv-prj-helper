/**
 * Svelte Component Parser for extracting component structure and API
 */

import { parse as parseTypeScript } from '@typescript-eslint/typescript-estree';
import type {
  ComponentInfo,
  PropDefinition,
  EventDefinition,
  SlotDefinition,
  MethodDefinition,
  AccessibilityFeatures,
  ComponentStyling,
  UsageExample,
  ParseError
} from '../types/index.ts';
import type { ComponentMetadata } from './ComponentScanner.ts';
import { Logger } from '../utils/Logger.ts';

export interface ParseResult {
  success: boolean;
  componentInfo?: ComponentInfo;
  errors: ParseError[];
  warnings: string[];
}

export class SvelteComponentParser {
  private logger: Logger;

  constructor(verbose: boolean = false) {
    this.logger = new Logger(verbose);
  }

  /**
   * Parses a Svelte component and extracts its API information
   */
  async parseComponent(
    content: string,
    metadata: ComponentMetadata
  ): Promise<ParseResult> {
    const result: ParseResult = {
      success: false,
      errors: [],
      warnings: []
    };

    try {
      this.logger.info(`Parsing component: ${metadata.name}`);

      // Extract different sections of the Svelte component
      const sections = this.extractSections(content);
      
      // Parse the script section for TypeScript/JavaScript
      const scriptAnalysis = await this.parseScriptSection(sections.script, metadata.filePath);
      
      // Parse the template section for slots and events
      const templateAnalysis = this.parseTemplateSection(sections.template);
      
      // Parse the style section for CSS information
      const styleAnalysis = this.parseStyleSection(sections.style);

      // Combine all analysis results
      const componentInfo: ComponentInfo = {
        name: metadata.name,
        category: metadata.category,
        filePath: metadata.filePath,
        description: this.extractDescription(sections.script) || `${metadata.name} component`,
        props: scriptAnalysis.props,
        events: [...scriptAnalysis.events, ...templateAnalysis.events],
        slots: templateAnalysis.slots,
        methods: scriptAnalysis.methods,
        accessibility: this.extractAccessibilityFeatures(sections.template, scriptAnalysis.props),
        examples: this.generateBasicExamples(metadata.name, scriptAnalysis.props),
        styling: styleAnalysis
      };

      result.success = true;
      result.componentInfo = componentInfo;
      result.warnings = [...scriptAnalysis.warnings, ...templateAnalysis.warnings];

    } catch (error) {
      const parseError: ParseError = {
        file: metadata.filePath,
        message: `Failed to parse component: ${error}`,
        type: 'syntax'
      };
      result.errors.push(parseError);
      this.logger.error(`Error parsing ${metadata.name}: ${error}`);
    }

    return result;
  }

  /**
   * Extracts script, template, and style sections from Svelte component
   */
  private extractSections(content: string): {
    script: string;
    template: string;
    style: string;
  } {
    const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    
    // Template is everything that's not script or style
    let template = content;
    if (scriptMatch) {
      template = template.replace(scriptMatch[0], '');
    }
    if (styleMatch) {
      template = template.replace(styleMatch[0], '');
    }
    
    return {
      script: scriptMatch ? scriptMatch[1] : '',
      template: template.trim(),
      style: styleMatch ? styleMatch[1] : ''
    };
  }

  /**
   * Parses the TypeScript/JavaScript script section
   */
  private async parseScriptSection(script: string, filePath: string): Promise<{
    props: PropDefinition[];
    events: EventDefinition[];
    methods: MethodDefinition[];
    warnings: string[];
  }> {
    const result = {
      props: [] as PropDefinition[],
      events: [] as EventDefinition[],
      methods: [] as MethodDefinition[],
      warnings: [] as string[]
    };

    if (!script.trim()) {
      return result;
    }

    try {
      // Parse TypeScript AST
      const ast = parseTypeScript(script, {
        loc: true,
        range: true,
        tokens: false,
        comment: false,
        jsx: false
      });

      // Extract Props interface
      result.props = this.extractPropsFromAST(ast, script);
      
      // Extract events from function signatures
      result.events = this.extractEventsFromAST(ast, script);
      
      // Extract methods (functions defined in the component)
      result.methods = this.extractMethodsFromAST(ast, script);

    } catch (error) {
      result.warnings.push(`Failed to parse TypeScript in ${filePath}: ${error}`);
      
      // Fallback to regex-based parsing
      result.props = this.extractPropsWithRegex(script);
      result.events = this.extractEventsWithRegex(script);
    }

    return result;
  }

  /**
   * Extracts Props interface from TypeScript AST
   */
  private extractPropsFromAST(ast: any, script: string): PropDefinition[] {
    const props: PropDefinition[] = [];

    try {
      // Look for interface Props definition
      const propsInterface = this.findPropsInterface(ast);
      
      if (propsInterface && propsInterface.body && propsInterface.body.body) {
        for (const member of propsInterface.body.body) {
          if (member.type === 'TSPropertySignature' && member.key) {
            const prop = this.extractPropFromMember(member, script);
            if (prop) {
              props.push(prop);
            }
          }
        }
      }

      // Also look for destructured props in $props()
      const destructuredProps = this.findDestructuredProps(ast, script);
      props.push(...destructuredProps);

    } catch (error) {
      this.logger.warn(`Error extracting props from AST: ${error}`);
    }

    return props;
  }

  /**
   * Finds the Props interface in the AST
   */
  private findPropsInterface(ast: any): any {
    if (!ast.body) return null;

    for (const node of ast.body) {
      if (node.type === 'TSInterfaceDeclaration' && node.id.name === 'Props') {
        return node;
      }
    }
    return null;
  }

  /**
   * Extracts prop information from interface member
   */
  private extractPropFromMember(member: any, script: string): PropDefinition | null {
    try {
      const name = member.key.name;
      const optional = member.optional || false;
      const typeAnnotation = member.typeAnnotation?.typeAnnotation;
      
      let type = 'any';
      if (typeAnnotation) {
        type = this.extractTypeFromAnnotation(typeAnnotation);
      }

      // Extract JSDoc comment if available
      const description = this.extractJSDocComment(member, script) || '';

      return {
        name,
        type,
        required: !optional,
        description,
        defaultValue: undefined // Will be extracted from destructuring
      };
    } catch (error) {
      this.logger.warn(`Error extracting prop member: ${error}`);
      return null;
    }
  }

  /**
   * Finds destructured props with default values
   */
  private findDestructuredProps(ast: any, script: string): PropDefinition[] {
    const props: PropDefinition[] = [];

    try {
      // Look for let { ... } = $props() pattern
      for (const node of ast.body) {
        if (node.type === 'VariableDeclaration') {
          for (const declarator of node.declarations) {
            if (declarator.id?.type === 'ObjectPattern' && 
                declarator.init?.callee?.name === '$props') {
              
              for (const property of declarator.id.properties) {
                if (property.type === 'Property' && property.key) {
                  const prop = this.extractPropFromDestructuring(property, script);
                  if (prop) {
                    props.push(prop);
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Error finding destructured props: ${error}`);
    }

    return props;
  }

  /**
   * Extracts prop from destructuring pattern
   */
  private extractPropFromDestructuring(property: any, script: string): PropDefinition | null {
    try {
      const name = property.key.name;
      let defaultValue: any = undefined;
      
      if (property.value?.type === 'AssignmentPattern') {
        defaultValue = this.extractDefaultValue(property.value.right);
      }

      return {
        name,
        type: 'any', // Type will be inferred from Props interface
        required: defaultValue === undefined,
        description: '',
        defaultValue
      };
    } catch (error) {
      this.logger.warn(`Error extracting destructured prop: ${error}`);
      return null;
    }
  }

  /**
   * Extracts type string from TypeScript type annotation
   */
  private extractTypeFromAnnotation(typeAnnotation: any): string {
    try {
      switch (typeAnnotation.type) {
        case 'TSStringKeyword':
          return 'string';
        case 'TSNumberKeyword':
          return 'number';
        case 'TSBooleanKeyword':
          return 'boolean';
        case 'TSUnionType':
          return typeAnnotation.types
            .map((t: any) => this.extractTypeFromAnnotation(t))
            .join(' | ');
        case 'TSLiteralType':
          if (typeAnnotation.literal.type === 'Literal') {
            return `'${typeAnnotation.literal.value}'`;
          }
          return 'literal';
        case 'TSTypeReference':
          return typeAnnotation.typeName.name || 'unknown';
        default:
          return 'any';
      }
    } catch (error) {
      return 'any';
    }
  }

  /**
   * Extracts default value from AST node
   */
  private extractDefaultValue(node: any): any {
    try {
      switch (node.type) {
        case 'Literal':
          return node.value;
        case 'Identifier':
          return node.name;
        case 'ArrayExpression':
          return '[]';
        case 'ObjectExpression':
          return '{}';
        default:
          return undefined;
      }
    } catch (error) {
      return undefined;
    }
  }

  /**
   * Fallback regex-based prop extraction
   */
  private extractPropsWithRegex(script: string): PropDefinition[] {
    const props: PropDefinition[] = [];

    try {
      // Match interface Props { ... }
      const interfaceMatch = script.match(/interface\s+Props\s*\{([^}]+)\}/s);
      if (interfaceMatch) {
        const interfaceBody = interfaceMatch[1];
        const propMatches = interfaceBody.matchAll(/(\w+)\??\s*:\s*([^;,\n]+)/g);
        
        for (const match of propMatches) {
          const [, name, type] = match;
          props.push({
            name: name.trim(),
            type: type.trim(),
            required: !match[0].includes('?'),
            description: '',
            defaultValue: undefined
          });
        }
      }

      // Match destructuring with defaults
      const destructuringMatch = script.match(/let\s*\{([^}]+)\}\s*:\s*Props\s*=\s*\$props\(\)/s);
      if (destructuringMatch) {
        const destructuringBody = destructuringMatch[1];
        const defaultMatches = destructuringBody.matchAll(/(\w+)\s*=\s*([^,\n]+)/g);
        
        for (const match of defaultMatches) {
          const [, name, defaultValue] = match;
          const existingProp = props.find(p => p.name === name.trim());
          if (existingProp) {
            existingProp.defaultValue = defaultValue.trim().replace(/['"]/g, '');
            existingProp.required = false;
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Error in regex prop extraction: ${error}`);
    }

    return props;
  }

  /**
   * Extracts events from AST
   */
  private extractEventsFromAST(ast: any, script: string): EventDefinition[] {
    const events: EventDefinition[] = [];

    try {
      // Look for onclick, oninput, etc. in Props interface
      const propsInterface = this.findPropsInterface(ast);
      
      if (propsInterface && propsInterface.body && propsInterface.body.body) {
        for (const member of propsInterface.body.body) {
          if (member.type === 'TSPropertySignature' && member.key) {
            const name = member.key.name;
            if (name.startsWith('on') && name.length > 2) {
              const eventName = name.slice(2).toLowerCase();
              const type = this.extractTypeFromAnnotation(member.typeAnnotation?.typeAnnotation);
              
              events.push({
                name: eventName,
                type,
                description: `${eventName} event handler`,
                payload: this.extractEventPayload(type)
              });
            }
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting events from AST: ${error}`);
    }

    return events;
  }

  /**
   * Fallback regex-based event extraction
   */
  private extractEventsWithRegex(script: string): EventDefinition[] {
    const events: EventDefinition[] = [];

    try {
      const eventMatches = script.matchAll(/(on\w+)\??\s*:\s*\([^)]*\)\s*=>\s*\w+/g);
      
      for (const match of eventMatches) {
        const [, eventHandler] = match;
        const eventName = eventHandler.slice(2).toLowerCase();
        
        events.push({
          name: eventName,
          type: 'function',
          description: `${eventName} event handler`,
          payload: 'Event'
        });
      }
    } catch (error) {
      this.logger.warn(`Error in regex event extraction: ${error}`);
    }

    return events;
  }

  /**
   * Extracts methods from AST
   */
  private extractMethodsFromAST(ast: any, script: string): MethodDefinition[] {
    const methods: MethodDefinition[] = [];

    try {
      // Look for function declarations and arrow functions
      for (const node of ast.body) {
        if (node.type === 'FunctionDeclaration' && node.id) {
          const method = this.extractMethodFromFunction(node);
          if (method) {
            methods.push(method);
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting methods from AST: ${error}`);
    }

    return methods;
  }

  /**
   * Extracts method information from function node
   */
  private extractMethodFromFunction(node: any): MethodDefinition | null {
    try {
      const name = node.id.name;
      const parameters = node.params.map((param: any) => ({
        name: param.name || 'param',
        type: 'any',
        required: true,
        description: ''
      }));

      return {
        name,
        parameters,
        returnType: 'void',
        description: `${name} method`
      };
    } catch (_error) {
      return null;
    }
  }

  /**
   * Parses the template section for slots and events
   */
  private parseTemplateSection(template: string): {
    slots: SlotDefinition[];
    events: EventDefinition[];
    warnings: string[];
  } {
    const result = {
      slots: [] as SlotDefinition[],
      events: [] as EventDefinition[],
      warnings: [] as string[]
    };

    try {
      // Extract slots
      result.slots = this.extractSlots(template);
      
      // Extract dispatched events
      result.events = this.extractDispatchedEvents(template);

    } catch (error) {
      result.warnings.push(`Error parsing template: ${error}`);
    }

    return result;
  }

  /**
   * Extracts slot definitions from template
   */
  private extractSlots(template: string): SlotDefinition[] {
    const slots: SlotDefinition[] = [];

    try {
      // Look for {@render children()} pattern
      if (template.includes('{@render children')) {
        slots.push({
          name: 'children',
          description: 'Default slot content',
          props: {}
        });
      }

      // Look for named slots
      const slotMatches = template.matchAll(/<slot\s+name="([^"]+)"/g);
      for (const match of slotMatches) {
        const [, name] = match;
        slots.push({
          name,
          description: `${name} slot`,
          props: {}
        });
      }
    } catch (error) {
      this.logger.warn(`Error extracting slots: ${error}`);
    }

    return slots;
  }

  /**
   * Extracts dispatched events from template
   */
  private extractDispatchedEvents(template: string): EventDefinition[] {
    const events: EventDefinition[] = [];

    try {
      // Look for dispatch calls
      const dispatchMatches = template.matchAll(/dispatch\s*\(\s*['"]([^'"]+)['"]/g);
      for (const match of dispatchMatches) {
        const [, eventName] = match;
        events.push({
          name: eventName,
          type: 'CustomEvent',
          description: `Custom ${eventName} event`,
          payload: 'any'
        });
      }
    } catch (error) {
      this.logger.warn(`Error extracting dispatched events: ${error}`);
    }

    return events;
  }

  /**
   * Parses the style section for CSS information
   */
  private parseStyleSection(style: string): ComponentStyling {
    const styling: ComponentStyling = {
      cssProperties: [],
      variants: [],
      themes: []
    };

    try {
      // Extract CSS custom properties
      styling.cssProperties = this.extractCSSProperties(style);
      
      // Extract variants (CSS classes)
      styling.variants = this.extractVariants(style);
      
      // Detect glassmorphism effects
      const glassmorphism = this.extractGlassmorphism(style);
      if (glassmorphism) {
        styling.glassmorphism = glassmorphism;
      }

    } catch (error) {
      this.logger.warn(`Error parsing styles: ${error}`);
    }

    return styling;
  }

  /**
   * Extracts CSS custom properties from styles
   */
  private extractCSSProperties(style: string): any[] {
    const properties: any[] = [];

    try {
      const varMatches = style.matchAll(/var\(--([^)]+)\)/g);
      const uniqueVars = new Set<string>();

      for (const match of varMatches) {
        const [, varName] = match;
        if (!uniqueVars.has(varName)) {
          uniqueVars.add(varName);
          properties.push({
            name: `--${varName}`,
            defaultValue: '',
            description: `CSS custom property: ${varName}`,
            category: this.categorizeCSSProperty(varName)
          });
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting CSS properties: ${error}`);
    }

    return properties;
  }

  /**
   * Categorizes CSS property by name
   */
  private categorizeCSSProperty(name: string): string {
    if (name.includes('color')) return 'color';
    if (name.includes('spacing') || name.includes('padding') || name.includes('margin')) return 'spacing';
    if (name.includes('font') || name.includes('text')) return 'typography';
    if (name.includes('glass') || name.includes('blur') || name.includes('shadow')) return 'effect';
    return 'layout';
  }

  /**
   * Extracts CSS variants (classes)
   */
  private extractVariants(style: string): any[] {
    const variants: any[] = [];

    try {
      const classMatches = style.matchAll(/\.([a-zA-Z][a-zA-Z0-9-_]*)\s*\{/g);
      
      for (const match of classMatches) {
        const [, className] = match;
        if (className.includes('-') && !className.startsWith('btn-')) {
          variants.push({
            name: className,
            description: `CSS variant: ${className}`,
            cssClass: className,
            properties: {}
          });
        }
      }
    } catch (error) {
      this.logger.warn(`Error extracting variants: ${error}`);
    }

    return variants;
  }

  /**
   * Extracts glassmorphism effects
   */
  private extractGlassmorphism(style: string): any | undefined {
    try {
      if (style.includes('backdrop-filter') || style.includes('-webkit-backdrop-filter')) {
        return {
          backdropFilter: 'blur(var(--glass-blur))',
          background: 'var(--glass-bg)',
          border: 'var(--glass-border)',
          opacity: 1
        };
      }
    } catch (error) {
      this.logger.warn(`Error extracting glassmorphism: ${error}`);
    }

    return undefined;
  }

  /**
   * Extracts accessibility features
   */
  private extractAccessibilityFeatures(template: string, props: PropDefinition[]): AccessibilityFeatures {
    const features: AccessibilityFeatures = {
      ariaAttributes: [],
      keyboardNavigation: [],
      focusManagement: [],
      screenReaderSupport: [],
      wcagCompliance: []
    };

    try {
      // Extract ARIA attributes from template
      const ariaMatches = template.matchAll(/(aria-[a-z-]+)=/g);
      for (const match of ariaMatches) {
        const [, ariaAttr] = match;
        features.ariaAttributes.push({
          name: ariaAttr,
          value: '',
          description: `ARIA attribute: ${ariaAttr}`,
          required: false
        });
      }

      // Check for aria props
      const ariaProps = props.filter(p => p.name.startsWith('aria'));
      for (const prop of ariaProps) {
        features.ariaAttributes.push({
          name: prop.name,
          value: prop.type,
          description: prop.description || `ARIA property: ${prop.name}`,
          required: prop.required
        });
      }

      // Basic WCAG compliance
      if (features.ariaAttributes.length > 0) {
        features.wcagCompliance.push({
          level: 'AA',
          criterion: '4.1.2',
          description: 'Name, Role, Value',
          implementation: 'ARIA attributes provided'
        });
      }

    } catch (error) {
      this.logger.warn(`Error extracting accessibility features: ${error}`);
    }

    return features;
  }

  /**
   * Generates basic usage examples
   */
  private generateBasicExamples(componentName: string, props: PropDefinition[]): UsageExample[] {
    const examples: UsageExample[] = [];

    try {
      // Basic example
      const basicProps = props
        .filter(p => p.required && p.name !== 'children')
        .map(p => `${p.name}="${p.type === 'string' ? 'value' : '{value}'}"`)
        .join(' ');

      examples.push({
        title: 'Basic Usage',
        description: `Basic ${componentName} component usage`,
        code: `<${componentName}${basicProps ? ' ' + basicProps : ''}>\n  Content\n</${componentName}>`,
        language: 'svelte',
        complexity: 'basic'
      });

      // Advanced example with all props
      if (props.length > 2) {
        const allProps = props
          .filter(p => p.name !== 'children')
          .map(p => {
            const value = p.defaultValue !== undefined ? 
              JSON.stringify(p.defaultValue) : 
              (p.type === 'string' ? '"value"' : '{value}');
            return `  ${p.name}=${value}`;
          })
          .join('\n');

        examples.push({
          title: 'Advanced Usage',
          description: `${componentName} with all available props`,
          code: `<${componentName}\n${allProps}\n>\n  Content\n</${componentName}>`,
          language: 'svelte',
          complexity: 'advanced'
        });
      }

    } catch (error) {
      this.logger.warn(`Error generating examples: ${error}`);
    }

    return examples;
  }

  /**
   * Extracts JSDoc comment for a node
   */
  private extractJSDocComment(_node: any, _script: string): string {
    // This is a simplified implementation
    // In a full implementation, you'd parse JSDoc comments from the source
    return '';
  }

  /**
   * Extracts event payload type from function signature
   */
  private extractEventPayload(type: string): string {
    const match = type.match(/\(([^)]+)\)/);
    return match ? match[1] : 'Event';
  }

  /**
   * Extracts description from script comments
   */
  private extractDescription(script: string): string | null {
    // Look for JSDoc comments at the top of the script
    const commentMatch = script.match(/\/\*\*\s*\n\s*\*\s*([^\n]+)/);
    return commentMatch ? commentMatch[1].trim() : null;
  }
}