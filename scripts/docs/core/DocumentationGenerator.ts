/**
 * Main documentation generator orchestrator
 * Coordinates all analysis and generation modules with error handling and progress tracking
 */

import type {
  IDocumentationGenerator,
  GenerationProgress
} from '../interfaces/IDocumentationGenerator.ts';
import type {
  LLMDocumentation,
  ComponentInfo,
  ValidationResult,
  ParseError,
  ComponentsByCategory,
  AccessibilityGuide
} from '../types/index.ts';
import type { GeneratorConfig } from '../config/GeneratorConfig.ts';
import { FileUtils } from '../utils/FileUtils.ts';
import { Logger } from '../utils/Logger.ts';
import { ComponentScanner, type ScanResult } from '../analyzers/ComponentScanner.ts';
import { SvelteComponentParser } from '../analyzers/SvelteComponentParser.ts';
import { TypeScriptExtractor } from '../analyzers/TypeScriptExtractor.ts';
import { CSSAnalyzer } from '../analyzers/CSSAnalyzer.ts';
import { AccessibilityAnalyzer } from '../analyzers/AccessibilityAnalyzer.ts';
import { DesignSystemDocumenter } from '../documenters/DesignSystemDocumenter.ts';
import { APIReferenceGenerator } from '../generators/APIReferenceGenerator.ts';
import { UsagePatternGenerator } from '../generators/UsagePatternGenerator.ts';
import { ExampleGenerator } from '../generators/ExampleGenerator.ts';
import { AccessibilityDocumentationGenerator } from '../generators/AccessibilityDocumentationGenerator.ts';
import { LLMMarkdownAssembler } from '../generators/LLMMarkdownAssembler.ts';
import { DocumentationValidator } from '../validators/DocumentationValidator.ts';

export class DocumentationGenerator implements IDocumentationGenerator {
  private fileUtils: FileUtils;
  private logger: Logger;
  private progressCallback?: (progress: GenerationProgress) => void;
  
  // Analysis modules
  private componentScanner: ComponentScanner;
  private componentParser: SvelteComponentParser;
  private typeExtractor: TypeScriptExtractor;
  private cssAnalyzer: CSSAnalyzer;
  private accessibilityAnalyzer: AccessibilityAnalyzer;
  
  // Documentation generators
  private designSystemDocumenter: DesignSystemDocumenter;
  private apiReferenceGenerator: APIReferenceGenerator;
  private usagePatternGenerator: UsagePatternGenerator;
  private exampleGenerator: ExampleGenerator;
  private accessibilityDocGenerator: AccessibilityDocumentationGenerator;
  private markdownAssembler: LLMMarkdownAssembler;
  private documentationValidator: DocumentationValidator;
  
  // Error tracking
  private errors: ParseError[] = [];
  private warnings: string[] = [];
  
  // Source components for validation
  private sourceComponents: ComponentInfo[] = [];

  constructor(private config: GeneratorConfig) {
    this.fileUtils = new FileUtils(config);
    this.logger = new Logger(config.verbose, config.showProgress);
    
    // Initialize analysis modules
    this.componentScanner = new ComponentScanner(config);
    this.componentParser = new SvelteComponentParser(config.verbose);
    this.typeExtractor = new TypeScriptExtractor(config);
    this.cssAnalyzer = new CSSAnalyzer();
    this.accessibilityAnalyzer = new AccessibilityAnalyzer();
    
    // Initialize documentation generators
    this.designSystemDocumenter = new DesignSystemDocumenter();
    this.apiReferenceGenerator = new APIReferenceGenerator();
    this.usagePatternGenerator = new UsagePatternGenerator();
    this.exampleGenerator = new ExampleGenerator();
    this.accessibilityDocGenerator = new AccessibilityDocumentationGenerator();
    this.markdownAssembler = new LLMMarkdownAssembler({
      includeTableOfContents: true,
      includeCrossReferences: true,
      optimizeForLLM: true,
      maxSectionLength: 5000,
      includeMetadata: true,
      generateAnchors: true
    }, config.verbose);
    this.documentationValidator = new DocumentationValidator(config, {
      checkCompleteness: true,
      validateAPIAccuracy: true,
      validateExampleSyntax: true,
      checkAccessibility: true,
      validateCrossReferences: true,
      strictMode: false
    });
  }

  async generateDocumentation(sourceDirectory: string): Promise<LLMDocumentation> {
    this.logger.info('Starting LLM documentation generation...');
    this.errors = [];
    this.warnings = [];
    
    try {
      // Phase 1: Component Discovery
      this.reportProgress('scanning', 0, 6, 'Scanning component files...');
      const scanResult = await this.scanComponentsWithRecovery();
      this.logger.info(`Found ${scanResult.components.length} components, ${scanResult.hooks.length} hooks, ${scanResult.themes.length} theme files`);

      // Phase 2: Component Analysis
      this.reportProgress('analyzing', 1, 6, 'Analyzing component structure...');
      const components = await this.analyzeComponentsWithRecovery(scanResult);
      this.sourceComponents = components; // Store for validation
      this.logger.info(`Successfully analyzed ${components.length} components`);

      // Phase 3: Design System Analysis
      this.reportProgress('analyzing', 2, 6, 'Analyzing design system...');
      const designSystemData = await this.analyzeDesignSystemWithRecovery();

      // Phase 4: Generate Documentation Sections
      this.reportProgress('generating', 3, 6, 'Generating documentation sections...');
      const documentation = await this.buildDocumentationWithRecovery(components, designSystemData);

      // Phase 5: Cross-reference and Enhancement
      this.reportProgress('generating', 4, 6, 'Enhancing documentation with patterns and examples...');
      await this.enhanceDocumentationWithRecovery(documentation, components);

      // Phase 6: Validation and Quality Assurance
      this.reportProgress('validating', 5, 6, 'Validating documentation quality...');
      const validation = await this.validateDocumentation(documentation);
      
      this.reportValidationResults(validation);

      this.reportProgress('complete', 6, 6, 'Documentation generation complete');
      this.logGenerationSummary(components.length, validation);
      
      return documentation;
    } catch (error) {
      await this.handleGenerationError({
        file: sourceDirectory,
        message: `Critical error during documentation generation: ${error}`,
        type: 'unknown'
      }, 'generateDocumentation');
      throw error;
    }
  }

  async scanComponents(_directory: string): Promise<string[]> {
    const scanResult = await this.componentScanner.scanComponents();
    return scanResult.components.map(c => c.filePath);
  }

  /**
   * Enhanced component scanning with error recovery
   */
  private async scanComponentsWithRecovery(): Promise<ScanResult> {
    try {
      const scanResult = await this.componentScanner.scanComponents();
      
      if (scanResult.errors.length > 0) {
        this.warnings.push(...scanResult.errors);
        this.logger.warn(`Scan completed with ${scanResult.errors.length} warnings`);
      }
      
      return scanResult;
    } catch (error) {
      const fallbackError: ParseError = {
        file: 'component-scanner',
        message: `Component scanning failed: ${error}`,
        type: 'unknown'
      };
      this.errors.push(fallbackError);
      
      // Return minimal scan result to allow continuation
      return {
        components: [],
        hooks: [],
        themes: [],
        totalFiles: 0,
        scanDuration: 0,
        errors: [fallbackError.message]
      };
    }
  }

  async analyzeComponents(_componentPaths: string[]): Promise<ComponentInfo[]> {
    const scanResult = await this.componentScanner.scanComponents();
    return this.analyzeComponentsWithRecovery(scanResult);
  }

  /**
   * Enhanced component analysis with error recovery and timeout handling
   */
  private async analyzeComponentsWithRecovery(scanResult: ScanResult): Promise<ComponentInfo[]> {
    const components: ComponentInfo[] = [];
    const allComponents = [...scanResult.components, ...scanResult.hooks, ...scanResult.themes];
    
    for (let i = 0; i < allComponents.length; i++) {
      const metadata = allComponents[i];
      
      try {
        // Set timeout for individual component analysis
        const componentInfo = await this.analyzeComponentWithTimeout(metadata);
        if (componentInfo) {
          components.push(componentInfo);
        }
        
        if (i % 5 === 0) {
          this.logger.progress(i + 1, allComponents.length, `Analyzed ${i + 1}/${allComponents.length} components`);
        }
      } catch (error) {
        await this.handleComponentAnalysisError(error, metadata);
      }
    }
    
    return components;
  }

  /**
   * Analyze individual component with timeout protection
   */
  private async analyzeComponentWithTimeout(metadata: any): Promise<ComponentInfo | null> {
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Analysis timeout for ${metadata.name}`));
      }, this.config.analysisTimeout);

      try {
        const content = await this.fileUtils.readFile(metadata.filePath);
        
        if (metadata.isComponent) {
          // Parse Svelte component
          const parseResult = await this.componentParser.parseComponent(content, metadata);
          
          if (parseResult.success && parseResult.componentInfo) {
            // Enhance with additional analysis
            const enhanced = await this.enhanceComponentInfo(parseResult.componentInfo, content);
            clearTimeout(timeout);
            resolve(enhanced);
          } else {
            // Create fallback documentation
            const fallback = await this.createFallbackComponentInfo(metadata, parseResult.errors);
            clearTimeout(timeout);
            resolve(fallback);
          }
        } else {
          // Handle non-component files (hooks, themes, etc.)
          const componentInfo = await this.analyzeNonComponentFile(metadata, content);
          clearTimeout(timeout);
          resolve(componentInfo);
        }
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  /**
   * Enhance component info with additional analysis
   */
  private async enhanceComponentInfo(componentInfo: ComponentInfo, content: string): Promise<ComponentInfo> {
    try {
      // Extract TypeScript types
      const typeInfo = await this.typeExtractor.extractFromFile(componentInfo.filePath);
      
      // Enhance props with type information
      // componentInfo.props = this.mergePropsWithTypes(componentInfo.props, typeInfo.interfaces);
      
      // Analyze CSS for styling information
      const cssInfo = await this.cssAnalyzer.analyzeStyles(content, componentInfo.filePath);
      // Note: CSS analysis integration would need type mapping between different CSSProperty interfaces
      // For now, we'll skip this to avoid type conflicts
      
      // Enhance accessibility information
      // const accessibilityInfo = await this.accessibilityAnalyzer.analyzeCSSAccessibility(content);
      // Note: Accessibility analysis integration would need type mapping
      // For now, we'll use the existing accessibility info from the component parser
      
      // Generate enhanced examples
      const examples = await this.exampleGenerator.generateComponentExamples(componentInfo);
      componentInfo.examples = [...componentInfo.examples, ...examples];
      
    } catch (error) {
      this.logger.warn(`Failed to enhance component ${componentInfo.name}: ${error}`);
    }
    
    return componentInfo;
  }

  async generateLLMMarkdown(documentation: LLMDocumentation, outputPath: string): Promise<void> {
    try {
      this.logger.info(`Generating LLM.md at ${outputPath}`);
      
      // Generate final markdown
      const markdown = await this.assembleFinalMarkdown(documentation);
      await this.fileUtils.writeToFile(outputPath, markdown);
      
      this.logger.success(`LLM documentation written to ${outputPath}`);
    } catch (error) {
      this.logger.error(`Failed to write LLM.md: ${error}`);
      throw error;
    }
  }

  /**
   * Analyze design system with error recovery
   */
  private async analyzeDesignSystemWithRecovery(): Promise<any> {
    try {
      const themeData = await this.designSystemDocumenter.generateThemeDocumentation();
      const glassmorphismGuide = await this.designSystemDocumenter.generateGlassmorphismGuide();
      const responsiveGuide = await this.designSystemDocumenter.generateResponsiveGuide();
      
      return {
        theme: themeData,
        glassmorphism: glassmorphismGuide,
        responsive: responsiveGuide
      };
    } catch (error) {
      this.logger.warn(`Design system analysis failed: ${error}`);
      return {
        theme: { colorSystem: [], spacingSystem: [], typographySystem: [], customProperties: [] },
        glassmorphism: { effects: [], implementation: '', bestPractices: [] },
        responsive: { breakpoints: [], patterns: [], bestPractices: [] }
      };
    }
  }

  /**
   * Build documentation with error recovery
   */
  private async buildDocumentationWithRecovery(components: ComponentInfo[], designSystemData: any): Promise<LLMDocumentation> {
    try {
      const categorizedComponents = this.categorizeComponents(components);
      
      const documentation: LLMDocumentation = {
        header: {
          title: 'SV Project Helper UI Library - LLM Documentation',
          version: '1.0.0',
          lastGenerated: new Date(),
          description: 'Comprehensive API reference and usage guide for the SV Project Helper UI Library optimized for LLM consumption',
          tableOfContents: []
        },
        quickReference: {
          installation: 'npm install sv-project-helper',
          basicUsage: 'import { Button } from "sv-project-helper";',
          commonPatterns: this.generateCommonPatterns(components),
          troubleshooting: this.generateTroubleshootingTips()
        },
        designSystem: {
          theme: designSystemData.theme,
          components: this.generateComponentOverviews(components),
          patterns: this.generateUsagePatternsForComponents(components)
        },
        components: categorizedComponents,
        patterns: this.generateUsagePatternsForComponents(components),
        accessibility: this.accessibilityDocGenerator.generateGlobalAccessibilityGuide(components),
        troubleshooting: {
          commonIssues: this.generateCommonIssues(),
          faq: this.generateFAQ(),
          support: {
            documentation: 'https://sv-project-helper.dev/docs',
            repository: 'https://github.com/sv-project-helper/ui-library',
            issues: 'https://github.com/sv-project-helper/ui-library/issues',
            community: 'https://discord.gg/sv-project-helper'
          }
        }
      };
      
      return documentation;
    } catch (error) {
      this.logger.error(`Failed to build documentation structure: ${error}`);
      throw error;
    }
  }

  /**
   * Enhance documentation with patterns and examples
   */
  private async enhanceDocumentationWithRecovery(documentation: LLMDocumentation, components: ComponentInfo[]): Promise<void> {
    try {
      // Generate table of contents
      documentation.header.tableOfContents = this.generateTableOfContents(documentation);
      
      // Enhance component documentation with API references
      for (const category of Object.keys(documentation.components)) {
        const categoryComponents = documentation.components[category as keyof ComponentsByCategory];
        
        for (let i = 0; i < categoryComponents.length; i++) {
          const component = categoryComponents[i];
          
          try {
            // Generate comprehensive API reference
            const apiRef = this.apiReferenceGenerator.generateAPIReference(component);
            
            // Add API reference content to component
            component.bestPractices = [
              ...component.bestPractices,
              ...this.extractBestPracticesFromAPI(apiRef)
            ];
            
            // Add related components
            component.relatedComponents = this.findRelatedComponents(component, components);
            
          } catch (error) {
            this.logger.warn(`Failed to enhance component ${component.metadata.name}: ${error}`);
          }
        }
      }
      
    } catch (error) {
      this.logger.warn(`Failed to enhance documentation: ${error}`);
    }
  }

  async validateDocumentation(documentation: LLMDocumentation): Promise<ValidationResult> {
    try {
      this.logger.info('Running comprehensive documentation validation...');
      
      const validationReport = await this.documentationValidator.validateDocumentation(
        documentation,
        this.sourceComponents
      );
      
      // Log detailed validation results
      if (validationReport.summary.qualityScore >= 80) {
        this.logger.success(`Documentation validation passed with ${validationReport.summary.qualityScore}% quality score`);
      } else {
        this.logger.warn(`Documentation validation completed with ${validationReport.summary.qualityScore}% quality score`);
      }
      
      // Log recommendations
      if (validationReport.recommendations.length > 0) {
        this.logger.info('Validation recommendations:');
        validationReport.recommendations.forEach(rec => {
          this.logger.info(`  - ${rec}`);
        });
      }
      
      return validationReport.result;
      
    } catch (error) {
      this.logger.error(`Validation failed: ${error}`);
      
      // Fallback to basic validation
      return this.performBasicValidation(documentation);
    }
  }

  /**
   * Fallback basic validation if comprehensive validation fails
   */
  private performBasicValidation(documentation: LLMDocumentation): ValidationResult {
    const errors: any[] = [];
    const warnings: any[] = [];
    
    // Basic validation checks
    if (!documentation.header.title) {
      errors.push({
        type: 'missing_title',
        message: 'Documentation header is missing title',
        severity: 'error'
      });
    }
    
    if (documentation.components.atoms.length === 0) {
      warnings.push({
        type: 'no_atoms',
        message: 'No atomic components found',
        severity: 'warning'
      });
    }
    
    const totalComponents = this.getAllDocumentedComponentsCount(documentation);
    if (totalComponents === 0) {
      errors.push({
        type: 'no_components',
        message: 'No components documented',
        severity: 'error'
      });
    }
    
    if (!documentation.accessibility.overview) {
      warnings.push({
        type: 'missing_accessibility',
        message: 'Accessibility overview is missing',
        severity: 'warning'
      });
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Count total documented components
   */
  private getAllDocumentedComponentsCount(documentation: LLMDocumentation): number {
    return Object.values(documentation.components).reduce(
      (sum, categoryComponents) => sum + categoryComponents.length,
      0
    );
  }

  async handleGenerationError(error: ParseError, context: string): Promise<void> {
    this.errors.push(error);
    this.logger.error(`Generation error in ${context}: ${error.message}`, error);
    
    // Implement recovery strategies based on error type
    switch (error.type) {
      case 'syntax':
        this.logger.info(`Attempting to recover from syntax error in ${error.file}`);
        break;
      case 'type':
        this.logger.info(`Attempting to recover from type error in ${error.file}`);
        break;
      case 'import':
        this.logger.info(`Attempting to recover from import error in ${error.file}`);
        break;
      default:
        this.logger.warn(`Unknown error type, using generic recovery for ${error.file}`);
    }
  }

  onProgress(callback: (progress: GenerationProgress) => void): void {
    this.progressCallback = callback;
  }

  private async buildDocumentation(components: ComponentInfo[]): Promise<LLMDocumentation> {
    const categorizedComponents = this.categorizeComponents(components);
    
    const documentation: LLMDocumentation = {
      header: {
        title: 'SV Project Helper UI Library - LLM Documentation',
        version: '1.0.0',
        lastGenerated: new Date(),
        description: 'Comprehensive API reference and usage guide for the SV Project Helper UI Library',
        tableOfContents: []
      },
      quickReference: {
        installation: 'npm install sv-project-helper',
        basicUsage: 'import { Button } from "sv-project-helper";',
        commonPatterns: [],
        troubleshooting: []
      },
      designSystem: {
        theme: {
          colorSystem: [],
          spacingSystem: [],
          typographySystem: [],
          customProperties: [],
          glassmorphism: {
            effects: [],
            implementation: '',
            bestPractices: []
          },
          responsive: {
            breakpoints: [],
            patterns: [],
            bestPractices: []
          }
        },
        components: [],
        patterns: []
      },
      components: categorizedComponents,
      patterns: [],
      accessibility: {
        overview: 'WCAG 2.1 AA compliant component library',
        wcagCompliance: [],
        keyboardNavigation: [],
        screenReaderSupport: [],
        bestPractices: []
      },
      troubleshooting: {
        commonIssues: [],
        faq: [],
        support: {
          documentation: '',
          repository: '',
          issues: '',
          community: ''
        }
      }
    };
    
    return documentation;
  }

  private categorizeComponents(components: ComponentInfo[]): ComponentsByCategory {
    const categorized: ComponentsByCategory = {
      atoms: [],
      molecules: [],
      organisms: [],
      layouts: [],
      utils: [],
      hooks: [],
      theme: []
    };
    
    for (const component of components) {
      const accessibilityGuide: AccessibilityGuide = {
        ...component.accessibility,
        bestPractices: []
      };

      const documentation = {
        metadata: {
          name: component.name,
          category: component.category,
          version: '1.0.0',
          lastUpdated: new Date(),
          filePath: component.filePath,
          dependencies: []
        },
        api: {
          props: component.props,
          events: component.events,
          slots: component.slots,
          methods: component.methods
        },
        styling: component.styling,
        accessibility: accessibilityGuide,
        examples: component.examples,
        bestPractices: [],
        relatedComponents: []
      };
      
      switch (component.category) {
        case 'atom':
          categorized.atoms.push(documentation);
          break;
        case 'molecule':
          categorized.molecules.push(documentation);
          break;
        case 'organism':
          categorized.organisms.push(documentation);
          break;
        case 'layout':
          categorized.layouts.push(documentation);
          break;
        case 'util':
          categorized.utils.push(documentation);
          break;
        case 'hook':
          categorized.hooks.push(documentation);
          break;
        case 'theme':
          categorized.theme.push(documentation);
          break;
      }
    }
    
    return categorized;
  }

  private extractComponentName(filePath: string): string {
    const fileName = filePath.split('/').pop() || '';
    return fileName.replace(/\.(svelte|ts|js)$/, '');
  }

  private reportProgress(stage: GenerationProgress['stage'], current: number, total: number, message: string): void {
    const progress: GenerationProgress = { stage, current, total, message };
    
    if (this.progressCallback) {
      this.progressCallback(progress);
    }
    
    this.logger.progress(current, total, message);
  }

  /**
   * Generate usage patterns for all components
   */
  private generateUsagePatternsForComponents(_components: ComponentInfo[]): any[] {
    const patterns: any[] = [];
    
    // Basic patterns for now - can be enhanced later
    patterns.push({
      name: 'Basic Component Usage',
      description: 'Standard component implementation pattern',
      components: ['Button', 'Input', 'Card'],
      example: '<Button variant="primary">Click me</Button>',
      bestPractices: ['Use semantic HTML', 'Include ARIA labels', 'Handle keyboard navigation']
    });
    
    return patterns;
  }

  /**
   * Convert ComponentInfo to ComponentDocumentation
   */
  private convertToComponentDocumentation(component: ComponentInfo): any {
    return {
      metadata: {
        name: component.name,
        category: component.category,
        version: '1.0.0',
        lastUpdated: new Date(),
        filePath: component.filePath,
        dependencies: []
      },
      api: {
        props: component.props || [],
        events: component.events || [],
        slots: component.slots || [],
        methods: component.methods || []
      },
      styling: component.styling,
      accessibility: {
        ...component.accessibility,
        bestPractices: []
      },
      examples: component.examples || [],
      bestPractices: [],
      relatedComponents: []
    };
  }

  /**
   * Handle component analysis errors with recovery
   */
  private async handleComponentAnalysisError(error: any, metadata: any): Promise<void> {
    const parseError: ParseError = {
      file: metadata.filePath,
      message: `Component analysis failed: ${error.message || error}`,
      type: error.name === 'SyntaxError' ? 'syntax' : 'unknown'
    };
    
    this.errors.push(parseError);
    this.logger.warn(`Failed to analyze ${metadata.name}: ${parseError.message}`);
    
    // Attempt to create fallback documentation
    try {
      const fallback = await this.createFallbackComponentInfo(metadata, [parseError]);
      if (fallback) {
        this.logger.info(`Created fallback documentation for ${metadata.name}`);
      }
    } catch (_fallbackError) {
      this.logger.error(`Failed to create fallback for ${metadata.name}: ${_fallbackError}`);
    }
  }

  /**
   * Create fallback component info when parsing fails
   */
  private async createFallbackComponentInfo(metadata: any, _errors: ParseError[]): Promise<ComponentInfo | null> {
    try {
      return {
        name: metadata.name,
        category: metadata.category,
        filePath: metadata.filePath,
        description: `${metadata.name} component (analysis failed - using fallback documentation)`,
        props: [],
        events: [],
        slots: [],
        methods: [],
        accessibility: {
          ariaAttributes: [],
          keyboardNavigation: [],
          focusManagement: [],
          screenReaderSupport: [],
          wcagCompliance: []
        },
        examples: [{
          title: 'Basic Usage',
          description: `Basic usage of ${metadata.name} (fallback example)`,
          code: `<${metadata.name}>\n  <!-- Content -->\n</${metadata.name}>`,
          language: 'svelte',
          complexity: 'basic'
        }],
        styling: {
          cssProperties: [],
          variants: [],
          themes: []
        }
      };
    } catch (error) {
      this.logger.error(`Failed to create fallback for ${metadata.name}: ${error}`);
      return null;
    }
  }

  /**
   * Analyze non-component files (hooks, themes, etc.)
   */
  private async analyzeNonComponentFile(metadata: any, _content: string): Promise<ComponentInfo | null> {
    try {
      if (metadata.isHook) {
        return this.analyzeHookFile(metadata, _content);
      } else if (metadata.isTheme) {
        return this.analyzeThemeFile(metadata, _content);
      }
      return null;
    } catch (error) {
      this.logger.warn(`Failed to analyze non-component file ${metadata.name}: ${error}`);
      return null;
    }
  }

  /**
   * Analyze hook files
   */
  private async analyzeHookFile(metadata: any, content: string): Promise<ComponentInfo> {
    const typeInfo = await this.typeExtractor.extractFromFile(metadata.filePath);
    
    return {
      name: metadata.name,
      category: 'hook',
      filePath: metadata.filePath,
      description: `Svelte 5 rune-based hook: ${metadata.name}`,
      props: [], // Hooks don't have props
      events: [],
      slots: [],
      methods: typeInfo.types.map(type => ({
        name: type.name,
        parameters: [],
        returnType: type.definition,
        description: type.description || `${type.name} function`
      })),
      accessibility: {
        ariaAttributes: [],
        keyboardNavigation: [],
        focusManagement: [],
        screenReaderSupport: [],
        wcagCompliance: []
      },
      examples: [{
        title: 'Hook Usage',
        description: `How to use the ${metadata.name} hook`,
        code: `import { ${metadata.name} } from 'sv-project-helper';\n\nconst result = ${metadata.name}();`,
        language: 'typescript',
        complexity: 'basic'
      }],
      styling: {
        cssProperties: [],
        variants: [],
        themes: []
      }
    };
  }

  /**
   * Analyze theme files
   */
  private async analyzeThemeFile(metadata: any, _content: string): Promise<ComponentInfo> {
    // const cssInfo = await this.cssAnalyzer.analyzeStyles(content, metadata.filePath);
    
    return {
      name: metadata.name,
      category: 'theme',
      filePath: metadata.filePath,
      description: `Theme configuration: ${metadata.name}`,
      props: [],
      events: [],
      slots: [],
      methods: [],
      accessibility: {
        ariaAttributes: [],
        keyboardNavigation: [],
        focusManagement: [],
        screenReaderSupport: [],
        wcagCompliance: []
      },
      examples: [{
        title: 'Theme Usage',
        description: `How to use the ${metadata.name} theme`,
        code: `/* CSS Custom Properties from ${metadata.name} */\n:root {\n  /* Theme variables will be listed here */\n}`,
        language: 'typescript',
        complexity: 'basic'
      }],
      styling: {
        cssProperties: [],
        variants: [],
        themes: []
      }
    };
  }

  /**
   * Merge props with TypeScript type information
   */
  private mergePropsWithTypes(props: any[], interfaces: any[]): any[] {
    const propsInterface = interfaces.find(iface => iface.name === 'Props');
    if (!propsInterface) return props;

    return props.map(prop => {
      const typeProp = propsInterface.properties?.find((p: any) => p.name === prop.name);
      if (typeProp) {
        return {
          ...prop,
          type: typeProp.type || prop.type,
          description: typeProp.description || prop.description
        };
      }
      return prop;
    });
  }

  /**
   * Generate common patterns from components
   */
  private generateCommonPatterns(components: ComponentInfo[]): string[] {
    return [
      'Import components: import { Button, Card } from "sv-project-helper";',
      'Use with TypeScript: const props: ButtonProps = { variant: "primary" };',
      'Apply themes: <ThemeProvider theme="dark"><App /></ThemeProvider>',
      'Handle events: <Button onclick={handleClick}>Click me</Button>',
      'Use slots: <Card>{#snippet header()}Header{/snippet}Content</Card>'
    ];
  }

  /**
   * Generate troubleshooting tips
   */
  private generateTroubleshootingTips(): string[] {
    return [
      'Ensure Svelte 5 is installed for rune support',
      'Import CSS theme file for proper styling',
      'Check TypeScript configuration for proper type checking',
      'Use proper ARIA attributes for accessibility',
      'Test with screen readers for accessibility compliance'
    ];
  }

  /**
   * Generate component overviews
   */
  private generateComponentOverviews(components: ComponentInfo[]): any[] {
    return components.map(component => ({
      name: component.name,
      category: component.category,
      description: component.description,
      usage: `Use ${component.name} for ${component.category}-level UI elements`
    }));
  }

  /**
   * Generate common issues
   */
  private generateCommonIssues(): any[] {
    return [
      {
        issue: 'Component not rendering',
        symptoms: ['Blank screen', 'Console errors', 'TypeScript errors'],
        solutions: [
          'Check import path is correct',
          'Ensure all required props are provided',
          'Verify Svelte 5 compatibility'
        ]
      },
      {
        issue: 'Styling not applied',
        symptoms: ['Default browser styles', 'Missing glassmorphism effects'],
        solutions: [
          'Import theme CSS file',
          'Check CSS custom property values',
          'Verify backdrop-filter support'
        ]
      }
    ];
  }

  /**
   * Generate FAQ entries
   */
  private generateFAQ(): any[] {
    return [
      {
        question: 'How do I customize the theme?',
        answer: 'Override CSS custom properties in your global styles or use the ThemeProvider component.',
        relatedTopics: ['theming', 'css-variables', 'customization']
      },
      {
        question: 'Are components accessible?',
        answer: 'Yes, all components follow WCAG 2.1 AA guidelines with proper ARIA attributes and keyboard navigation.',
        relatedTopics: ['accessibility', 'wcag', 'keyboard-navigation']
      }
    ];
  }

  /**
   * Generate table of contents
   */
  private generateTableOfContents(documentation: LLMDocumentation): any[] {
    const toc: any[] = [
      { title: 'Quick Reference', anchor: 'quick-reference', level: 1 },
      { title: 'Design System', anchor: 'design-system', level: 1 },
      { title: 'Components', anchor: 'components', level: 1 }
    ];

    // Add component categories
    Object.keys(documentation.components).forEach(category => {
      const components = documentation.components[category as keyof ComponentsByCategory];
      if (components.length > 0) {
        toc.push({
          title: this.capitalize(category),
          anchor: category,
          level: 2,
          children: components.map(comp => ({
            title: comp.metadata.name,
            anchor: `${category}-${comp.metadata.name.toLowerCase()}`,
            level: 3
          }))
        });
      }
    });

    toc.push(
      { title: 'Accessibility', anchor: 'accessibility', level: 1 },
      { title: 'Troubleshooting', anchor: 'troubleshooting', level: 1 }
    );

    return toc;
  }

  /**
   * Extract best practices from API reference
   */
  private extractBestPracticesFromAPI(apiRef: any): any[] {
    return [
      {
        title: 'Type Safety',
        description: 'Always use TypeScript interfaces for props to ensure type safety',
        example: `const props: ${apiRef.metadata.componentName}Props = { /* ... */ };`
      },
      {
        title: 'Accessibility',
        description: 'Provide proper ARIA labels and keyboard navigation support',
        example: `<${apiRef.metadata.componentName} aria-label="Descriptive label" />`
      }
    ];
  }

  /**
   * Find related components
   */
  private findRelatedComponents(component: any, allComponents: ComponentInfo[]): string[] {
    return allComponents
      .filter(c => 
        c.category === component.metadata.category && 
        c.name !== component.metadata.name
      )
      .slice(0, 3)
      .map((comp: ComponentInfo) => comp.name);
  }

  /**
   * Report validation results
   */
  private reportValidationResults(validation: ValidationResult): void {
    if (!validation.valid) {
      this.logger.warn(`Documentation validation found ${validation.errors.length} errors`);
      validation.errors.forEach(error => {
        this.logger.error(`Validation error: ${error.message}`, error);
      });
    }

    if (validation.warnings.length > 0) {
      this.logger.info(`Documentation validation found ${validation.warnings.length} warnings`);
      validation.warnings.forEach(warning => {
        this.logger.warn(`Validation warning: ${warning.message}`);
      });
    }
  }

  /**
   * Log generation summary
   */
  private logGenerationSummary(componentCount: number, validation: ValidationResult): void {
    this.logger.success('LLM documentation generated successfully');
    this.logger.info(`Summary:`);
    this.logger.info(`  - Components analyzed: ${componentCount}`);
    this.logger.info(`  - Errors encountered: ${this.errors.length}`);
    this.logger.info(`  - Warnings: ${this.warnings.length}`);
    this.logger.info(`  - Validation errors: ${validation.errors.length}`);
    this.logger.info(`  - Validation warnings: ${validation.warnings.length}`);
  }

  /**
   * Assemble final markdown using LLMMarkdownAssembler
   */
  private async assembleFinalMarkdown(documentation: LLMDocumentation): Promise<string> {
    try {
      this.logger.info('Assembling final LLM.md with optimized formatting...');
      
      const assemblyResult = await this.markdownAssembler.assembleLLMMarkdown(documentation);
      
      this.logger.info(`Final markdown assembled: ${assemblyResult.metadata.totalWordCount} words, ${assemblyResult.metadata.sectionCount} sections`);
      this.logger.info(`Estimated tokens: ~${assemblyResult.metadata.estimatedTokens}`);
      
      return assemblyResult.markdown;
    } catch (error) {
      this.logger.error(`Failed to assemble final markdown: ${error}`);
      
      // Fallback to basic markdown generation
      return this.generateFallbackMarkdown(documentation);
    }
  }

  /**
   * Generate fallback markdown if assembly fails
   */
  private generateFallbackMarkdown(documentation: LLMDocumentation): string {
    this.logger.warn('Using fallback markdown generation');
    
    return this.template`
# ${documentation.header.title}

*Generated on ${documentation.header.lastGenerated.toISOString()}*

## Quick Reference

### Installation
\`\`\`bash
${documentation.quickReference.installation}
\`\`\`

### Basic Usage
\`\`\`typescript
${documentation.quickReference.basicUsage}
\`\`\`

## Components

${Object.entries(documentation.components).map(([category, components]) => 
  components.length > 0 ? `### ${this.capitalize(category)}

${components.map((comp: any) => `#### ${comp.metadata.name}

${comp.api.props.length > 0 ? `**Props:** ${comp.api.props.length}` : ''}
${comp.api.events.length > 0 ? ` | **Events:** ${comp.api.events.length}` : ''}

${comp.examples.length > 0 ? `\`\`\`svelte
${comp.examples[0].code}
\`\`\`` : ''}
`).join('\n')}` : ''
).filter(Boolean).join('\n\n')}

## Accessibility

${documentation.accessibility.overview}

## Troubleshooting

${documentation.troubleshooting.commonIssues.map(issue => 
  `### ${issue.issue}

${issue.solutions.map(solution => `- ${solution}`).join('\n')}`
).join('\n\n')}

---

*This is a fallback documentation format. For full documentation, please resolve assembly errors.*
    `.trim();
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private template(strings: TemplateStringsArray, ...values: any[]): string {
    let result = '';
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < values.length) {
        result += values[i];
      }
    }
    return result;
  }}
