/**
 * Documentation Validator - Validates generated documentation completeness and quality
 * Checks API documentation accuracy against source code and verifies example code syntax
 */

import type {
  LLMDocumentation,
  ComponentDocumentation,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ComponentInfo,
  UsageExample
} from '../types/index.ts';
import type { GeneratorConfig } from '../config/GeneratorConfig.ts';
import { Logger } from '../utils/Logger.ts';
import { FileUtils } from '../utils/FileUtils.ts';

export interface ValidationOptions {
  checkCompleteness: boolean;
  validateAPIAccuracy: boolean;
  validateExampleSyntax: boolean;
  checkAccessibility: boolean;
  validateCrossReferences: boolean;
  strictMode: boolean;
}

export interface ValidationReport {
  result: ValidationResult;
  summary: ValidationSummary;
  detailedResults: DetailedValidationResults;
  recommendations: string[];
}

export interface ValidationSummary {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningCount: number;
  errorCount: number;
  completenessScore: number; // 0-100
  qualityScore: number; // 0-100
}

export interface DetailedValidationResults {
  completeness: CompletenessValidation;
  apiAccuracy: APIAccuracyValidation;
  exampleSyntax: ExampleSyntaxValidation;
  accessibility: AccessibilityValidation;
  crossReferences: CrossReferenceValidation;
}

export interface CompletenessValidation {
  missingComponents: string[];
  incompleteComponents: ComponentCompletenessIssue[];
  missingDocumentationSections: string[];
  score: number;
}

export interface ComponentCompletenessIssue {
  componentName: string;
  missingElements: string[];
  severity: 'error' | 'warning';
}

export interface APIAccuracyValidation {
  propMismatches: PropMismatch[];
  eventMismatches: EventMismatch[];
  typeMismatches: TypeMismatch[];
  score: number;
}

export interface PropMismatch {
  componentName: string;
  propName: string;
  documentedType: string;
  actualType: string;
  severity: 'error' | 'warning';
}

export interface EventMismatch {
  componentName: string;
  eventName: string;
  issue: string;
  severity: 'error' | 'warning';
}

export interface TypeMismatch {
  componentName: string;
  element: string;
  issue: string;
  severity: 'error' | 'warning';
}

export interface ExampleSyntaxValidation {
  invalidExamples: InvalidExample[];
  syntaxErrors: SyntaxError[];
  score: number;
}

export interface InvalidExample {
  componentName: string;
  exampleTitle: string;
  errors: string[];
  code: string;
}

export interface AccessibilityValidation {
  missingAriaAttributes: string[];
  incompleteKeyboardNavigation: string[];
  missingWCAGCompliance: string[];
  score: number;
}

export interface CrossReferenceValidation {
  brokenLinks: BrokenLink[];
  missingReferences: MissingReference[];
  score: number;
}

export interface BrokenLink {
  section: string;
  link: string;
  target: string;
}

export interface MissingReference {
  section: string;
  expectedReference: string;
  reason: string;
}

export class DocumentationValidator {
  private logger: Logger;
  private fileUtils: FileUtils;
  private readonly defaultOptions: ValidationOptions = {
    checkCompleteness: true,
    validateAPIAccuracy: true,
    validateExampleSyntax: true,
    checkAccessibility: true,
    validateCrossReferences: true,
    strictMode: false
  };

  constructor(
    private config: GeneratorConfig,
    private options: ValidationOptions = {}
  ) {
    this.options = { ...this.defaultOptions, ...options };
    this.logger = new Logger(config.verbose);
    this.fileUtils = new FileUtils(config);
  }

  /**
   * Validate complete documentation
   */
  async validateDocumentation(
    documentation: LLMDocumentation,
    sourceComponents: ComponentInfo[]
  ): Promise<ValidationReport> {
    this.logger.info('Starting comprehensive documentation validation...');

    const detailedResults: DetailedValidationResults = {
      completeness: { missingComponents: [], incompleteComponents: [], missingDocumentationSections: [], score: 0 },
      apiAccuracy: { propMismatches: [], eventMismatches: [], typeMismatches: [], score: 0 },
      exampleSyntax: { invalidExamples: [], syntaxErrors: [], score: 0 },
      accessibility: { missingAriaAttributes: [], incompleteKeyboardNavigation: [], missingWCAGCompliance: [], score: 0 },
      crossReferences: { brokenLinks: [], missingReferences: [], score: 0 }
    };

    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    try {
      // 1. Validate completeness
      if (this.options.checkCompleteness) {
        this.logger.info('Validating documentation completeness...');
        detailedResults.completeness = await this.validateCompleteness(documentation, sourceComponents);
        this.addCompletenessIssues(detailedResults.completeness, errors, warnings);
      }

      // 2. Validate API accuracy
      if (this.options.validateAPIAccuracy) {
        this.logger.info('Validating API accuracy...');
        detailedResults.apiAccuracy = await this.validateAPIAccuracy(documentation, sourceComponents);
        this.addAPIAccuracyIssues(detailedResults.apiAccuracy, errors, warnings);
      }

      // 3. Validate example syntax
      if (this.options.validateExampleSyntax) {
        this.logger.info('Validating example code syntax...');
        detailedResults.exampleSyntax = await this.validateExampleSyntax(documentation);
        this.addExampleSyntaxIssues(detailedResults.exampleSyntax, errors, warnings);
      }

      // 4. Validate accessibility
      if (this.options.checkAccessibility) {
        this.logger.info('Validating accessibility documentation...');
        detailedResults.accessibility = await this.validateAccessibility(documentation);
        this.addAccessibilityIssues(detailedResults.accessibility, errors, warnings);
      }

      // 5. Validate cross-references
      if (this.options.validateCrossReferences) {
        this.logger.info('Validating cross-references...');
        detailedResults.crossReferences = await this.validateCrossReferences(documentation);
        this.addCrossReferenceIssues(detailedResults.crossReferences, errors, warnings);
      }

      const summary = this.generateValidationSummary(detailedResults, errors, warnings);
      const recommendations = this.generateRecommendations(detailedResults, summary);

      const result: ValidationResult = {
        valid: errors.length === 0,
        errors,
        warnings
      };

      const report: ValidationReport = {
        result,
        summary,
        detailedResults,
        recommendations
      };

      this.logValidationResults(report);
      return report;

    } catch (error) {
      this.logger.error(`Validation failed: ${error}`);
      throw error;
    }
  }

  /**
   * Validate documentation completeness
   */
  private async validateCompleteness(
    documentation: LLMDocumentation,
    sourceComponents: ComponentInfo[]
  ): Promise<CompletenessValidation> {
    const missingComponents: string[] = [];
    const incompleteComponents: ComponentCompletenessIssue[] = [];
    const missingDocumentationSections: string[] = [];

    // Check if all source components are documented
    const documentedComponents = this.getAllDocumentedComponents(documentation);
    const documentedNames = new Set(documentedComponents.map(c => c.metadata.name));

    for (const sourceComponent of sourceComponents) {
      if (!documentedNames.has(sourceComponent.name)) {
        missingComponents.push(sourceComponent.name);
      }
    }

    // Check completeness of documented components
    for (const component of documentedComponents) {
      const missingElements = this.checkComponentCompleteness(component);
      if (missingElements.length > 0) {
        incompleteComponents.push({
          componentName: component.metadata.name,
          missingElements,
          severity: this.options.strictMode ? 'error' : 'warning'
        });
      }
    }

    // Check required documentation sections
    const requiredSections = ['quickReference', 'designSystem', 'components', 'accessibility', 'troubleshooting'];
    for (const section of requiredSections) {
      if (!this.hasSectionContent(documentation, section)) {
        missingDocumentationSections.push(section);
      }
    }

    const totalComponents = sourceComponents.length;
    const documentedCount = totalComponents - missingComponents.length;
    const completeCount = documentedCount - incompleteComponents.length;
    const score = totalComponents > 0 ? Math.round((completeCount / totalComponents) * 100) : 100;

    return {
      missingComponents,
      incompleteComponents,
      missingDocumentationSections,
      score
    };
  }

  /**
   * Validate API accuracy against source code
   */
  private async validateAPIAccuracy(
    documentation: LLMDocumentation,
    sourceComponents: ComponentInfo[]
  ): Promise<APIAccuracyValidation> {
    const propMismatches: PropMismatch[] = [];
    const eventMismatches: EventMismatch[] = [];
    const typeMismatches: TypeMismatch[] = [];

    const documentedComponents = this.getAllDocumentedComponents(documentation);
    
    for (const docComponent of documentedComponents) {
      const sourceComponent = sourceComponents.find(s => s.name === docComponent.metadata.name);
      
      if (sourceComponent) {
        // Validate props
        propMismatches.push(...this.validateProps(docComponent, sourceComponent));
        
        // Validate events
        eventMismatches.push(...this.validateEvents(docComponent, sourceComponent));
        
        // Validate types
        typeMismatches.push(...this.validateTypes(docComponent, sourceComponent));
      }
    }

    const totalChecks = documentedComponents.length * 3; // props, events, types
    const errorCount = propMismatches.length + eventMismatches.length + typeMismatches.length;
    const score = totalChecks > 0 ? Math.round(((totalChecks - errorCount) / totalChecks) * 100) : 100;

    return {
      propMismatches,
      eventMismatches,
      typeMismatches,
      score
    };
  }

  /**
   * Validate example code syntax
   */
  private async validateExampleSyntax(documentation: LLMDocumentation): Promise<ExampleSyntaxValidation> {
    const invalidExamples: InvalidExample[] = [];
    const syntaxErrors: any[] = [];

    const documentedComponents = this.getAllDocumentedComponents(documentation);
    let totalExamples = 0;
    let validExamples = 0;

    for (const component of documentedComponents) {
      for (const example of component.examples) {
        totalExamples++;
        
        const validation = await this.validateExampleCode(example, component.metadata.name);
        
        if (validation.isValid) {
          validExamples++;
        } else {
          invalidExamples.push({
            componentName: component.metadata.name,
            exampleTitle: example.title,
            errors: validation.errors,
            code: example.code
          });
          
          syntaxErrors.push(...validation.errors.map(error => ({
            component: component.metadata.name,
            example: example.title,
            error
          })));
        }
      }
    }

    const score = totalExamples > 0 ? Math.round((validExamples / totalExamples) * 100) : 100;

    return {
      invalidExamples,
      syntaxErrors,
      score
    };
  }

  /**
   * Validate accessibility documentation
   */
  private async validateAccessibility(documentation: LLMDocumentation): Promise<AccessibilityValidation> {
    const missingAriaAttributes: string[] = [];
    const incompleteKeyboardNavigation: string[] = [];
    const missingWCAGCompliance: string[] = [];

    const documentedComponents = this.getAllDocumentedComponents(documentation);
    
    for (const component of documentedComponents) {
      // Check ARIA attributes
      if (component.accessibility.ariaAttributes.length === 0) {
        missingAriaAttributes.push(component.metadata.name);
      }
      
      // Check keyboard navigation
      if (this.isInteractiveComponent(component) && component.accessibility.keyboardNavigation.length === 0) {
        incompleteKeyboardNavigation.push(component.metadata.name);
      }
      
      // Check WCAG compliance
      if (component.accessibility.wcagCompliance.length === 0) {
        missingWCAGCompliance.push(component.metadata.name);
      }
    }

    const totalComponents = documentedComponents.length;
    const accessibleComponents = totalComponents - missingAriaAttributes.length - incompleteKeyboardNavigation.length - missingWCAGCompliance.length;
    const score = totalComponents > 0 ? Math.round((accessibleComponents / (totalComponents * 3)) * 100) : 100;

    return {
      missingAriaAttributes,
      incompleteKeyboardNavigation,
      missingWCAGCompliance,
      score
    };
  }

  /**
   * Validate cross-references
   */
  private async validateCrossReferences(documentation: LLMDocumentation): Promise<CrossReferenceValidation> {
    const brokenLinks: BrokenLink[] = [];
    const missingReferences: MissingReference[] = [];

    // This is a simplified implementation
    // In a full implementation, you would parse markdown links and validate them
    
    const score = 100; // Placeholder score

    return {
      brokenLinks,
      missingReferences,
      score
    };
  }

  /**
   * Get all documented components from all categories
   */
  private getAllDocumentedComponents(documentation: LLMDocumentation): ComponentDocumentation[] {
    return [
      ...documentation.components.atoms,
      ...documentation.components.molecules,
      ...documentation.components.organisms,
      ...documentation.components.layouts,
      ...documentation.components.utils,
      ...documentation.components.hooks,
      ...documentation.components.theme
    ];
  }

  /**
   * Check completeness of individual component
   */
  private checkComponentCompleteness(component: ComponentDocumentation): string[] {
    const missing: string[] = [];

    if (!component.metadata.name) missing.push('name');
    if (component.api.props.length === 0 && this.shouldHaveProps(component)) missing.push('props');
    if (component.examples.length === 0) missing.push('examples');
    if (!component.accessibility || component.accessibility.ariaAttributes.length === 0) missing.push('accessibility');

    return missing;
  }

  /**
   * Check if documentation section has content
   */
  private hasSectionContent(documentation: LLMDocumentation, section: string): boolean {
    switch (section) {
      case 'quickReference':
        return !!documentation.quickReference.installation;
      case 'designSystem':
        return documentation.designSystem.theme.colorSystem.length > 0;
      case 'components':
        return this.getAllDocumentedComponents(documentation).length > 0;
      case 'accessibility':
        return !!documentation.accessibility.overview;
      case 'troubleshooting':
        return documentation.troubleshooting.commonIssues.length > 0;
      default:
        return false;
    }
  }

  /**
   * Validate component props against source
   */
  private validateProps(docComponent: ComponentDocumentation, sourceComponent: ComponentInfo): PropMismatch[] {
    const mismatches: PropMismatch[] = [];

    // Check for missing props in documentation
    for (const sourceProp of sourceComponent.props) {
      const docProp = docComponent.api.props.find(p => p.name === sourceProp.name);
      
      if (!docProp) {
        mismatches.push({
          componentName: docComponent.metadata.name,
          propName: sourceProp.name,
          documentedType: 'missing',
          actualType: sourceProp.type,
          severity: 'error'
        });
      } else if (docProp.type !== sourceProp.type) {
        mismatches.push({
          componentName: docComponent.metadata.name,
          propName: sourceProp.name,
          documentedType: docProp.type,
          actualType: sourceProp.type,
          severity: 'warning'
        });
      }
    }

    return mismatches;
  }

  /**
   * Validate component events against source
   */
  private validateEvents(docComponent: ComponentDocumentation, sourceComponent: ComponentInfo): EventMismatch[] {
    const mismatches: EventMismatch[] = [];

    for (const sourceEvent of sourceComponent.events) {
      const docEvent = docComponent.api.events.find(e => e.name === sourceEvent.name);
      
      if (!docEvent) {
        mismatches.push({
          componentName: docComponent.metadata.name,
          eventName: sourceEvent.name,
          issue: 'Missing event in documentation',
          severity: 'warning'
        });
      }
    }

    return mismatches;
  }

  /**
   * Validate component types against source
   */
  private validateTypes(docComponent: ComponentDocumentation, sourceComponent: ComponentInfo): TypeMismatch[] {
    const mismatches: TypeMismatch[] = [];

    // This is a simplified implementation
    // In a full implementation, you would compare TypeScript interfaces

    return mismatches;
  }

  /**
   * Validate individual example code
   */
  private async validateExampleCode(example: UsageExample, componentName: string): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    try {
      // Basic syntax validation based on language
      switch (example.language) {
        case 'svelte':
          this.validateSvelteCode(example.code, errors);
          break;
        case 'typescript':
        case 'javascript':
          this.validateJavaScriptCode(example.code, errors);
          break;
        case 'css':
          this.validateCSSCode(example.code, errors);
          break;
      }

      // Check if example uses the component correctly
      if (example.language === 'svelte' && !example.code.includes(componentName)) {
        errors.push(`Example does not use the ${componentName} component`);
      }

    } catch (error) {
      errors.push(`Validation error: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate Svelte code syntax
   */
  private validateSvelteCode(code: string, errors: string[]): void {
    // Basic Svelte syntax checks
    const openTags = (code.match(/<[^/][^>]*>/g) || []).length;
    const closeTags = (code.match(/<\/[^>]*>/g) || []).length;
    
    if (openTags !== closeTags) {
      errors.push('Mismatched HTML tags');
    }

    // Check for basic Svelte syntax
    if (code.includes('{') && !code.includes('}')) {
      errors.push('Unclosed Svelte expression');
    }

    // Check for proper script tags
    if (code.includes('<script>') && !code.includes('</script>')) {
      errors.push('Unclosed script tag');
    }
  }

  /**
   * Validate JavaScript/TypeScript code syntax
   */
  private validateJavaScriptCode(code: string, errors: string[]): void {
    // Basic JavaScript syntax checks
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      errors.push('Mismatched braces');
    }

    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    
    if (openParens !== closeParens) {
      errors.push('Mismatched parentheses');
    }
  }

  /**
   * Validate CSS code syntax
   */
  private validateCSSCode(code: string, errors: string[]): void {
    // Basic CSS syntax checks
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      errors.push('Mismatched CSS braces');
    }
  }

  /**
   * Check if component should have props
   */
  private shouldHaveProps(component: ComponentDocumentation): boolean {
    // Utility components and some theme components might not have props
    return !['util', 'theme'].includes(component.metadata.category);
  }

  /**
   * Check if component is interactive (should have keyboard navigation)
   */
  private isInteractiveComponent(component: ComponentDocumentation): boolean {
    const interactiveComponents = ['button', 'input', 'select', 'checkbox', 'radio', 'slider', 'menu'];
    return interactiveComponents.some(type => 
      component.metadata.name.toLowerCase().includes(type)
    );
  }

  /**
   * Add completeness issues to validation results
   */
  private addCompletenessIssues(
    completeness: CompletenessValidation,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    for (const missing of completeness.missingComponents) {
      errors.push({
        type: 'missing_component',
        message: `Component ${missing} is not documented`,
        severity: 'error'
      });
    }

    for (const incomplete of completeness.incompleteComponents) {
      const issue = {
        type: 'incomplete_component',
        message: `Component ${incomplete.componentName} is missing: ${incomplete.missingElements.join(', ')}`,
        component: incomplete.componentName,
        severity: incomplete.severity
      };

      if (incomplete.severity === 'error') {
        errors.push(issue as ValidationError);
      } else {
        warnings.push(issue as ValidationWarning);
      }
    }

    for (const section of completeness.missingDocumentationSections) {
      errors.push({
        type: 'missing_section',
        message: `Required documentation section '${section}' is missing or empty`,
        severity: 'error'
      });
    }
  }

  /**
   * Add API accuracy issues to validation results
   */
  private addAPIAccuracyIssues(
    apiAccuracy: APIAccuracyValidation,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    for (const mismatch of apiAccuracy.propMismatches) {
      const issue = {
        type: 'prop_mismatch',
        message: `Prop '${mismatch.propName}' in ${mismatch.componentName}: documented as '${mismatch.documentedType}', actually '${mismatch.actualType}'`,
        component: mismatch.componentName,
        severity: mismatch.severity
      };

      if (mismatch.severity === 'error') {
        errors.push(issue as ValidationError);
      } else {
        warnings.push(issue as ValidationWarning);
      }
    }

    for (const mismatch of apiAccuracy.eventMismatches) {
      const issue = {
        type: 'event_mismatch',
        message: `Event '${mismatch.eventName}' in ${mismatch.componentName}: ${mismatch.issue}`,
        component: mismatch.componentName,
        severity: mismatch.severity
      };

      if (mismatch.severity === 'error') {
        errors.push(issue as ValidationError);
      } else {
        warnings.push(issue as ValidationWarning);
      }
    }
  }

  /**
   * Add example syntax issues to validation results
   */
  private addExampleSyntaxIssues(
    exampleSyntax: ExampleSyntaxValidation,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    for (const invalid of exampleSyntax.invalidExamples) {
      warnings.push({
        type: 'invalid_example',
        message: `Example '${invalid.exampleTitle}' in ${invalid.componentName} has syntax errors: ${invalid.errors.join(', ')}`,
        component: invalid.componentName
      });
    }
  }

  /**
   * Add accessibility issues to validation results
   */
  private addAccessibilityIssues(
    accessibility: AccessibilityValidation,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    for (const component of accessibility.missingAriaAttributes) {
      warnings.push({
        type: 'missing_aria',
        message: `Component ${component} is missing ARIA attributes`,
        component
      });
    }

    for (const component of accessibility.incompleteKeyboardNavigation) {
      warnings.push({
        type: 'missing_keyboard_nav',
        message: `Interactive component ${component} is missing keyboard navigation documentation`,
        component
      });
    }

    for (const component of accessibility.missingWCAGCompliance) {
      warnings.push({
        type: 'missing_wcag',
        message: `Component ${component} is missing WCAG compliance documentation`,
        component
      });
    }
  }

  /**
   * Add cross-reference issues to validation results
   */
  private addCrossReferenceIssues(
    crossReferences: CrossReferenceValidation,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    for (const broken of crossReferences.brokenLinks) {
      warnings.push({
        type: 'broken_link',
        message: `Broken link in ${broken.section}: ${broken.link} -> ${broken.target}`
      });
    }

    for (const missing of crossReferences.missingReferences) {
      warnings.push({
        type: 'missing_reference',
        message: `Missing reference in ${missing.section}: ${missing.expectedReference} (${missing.reason})`
      });
    }
  }

  /**
   * Generate validation summary
   */
  private generateValidationSummary(
    detailedResults: DetailedValidationResults,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): ValidationSummary {
    const scores = [
      detailedResults.completeness.score,
      detailedResults.apiAccuracy.score,
      detailedResults.exampleSyntax.score,
      detailedResults.accessibility.score,
      detailedResults.crossReferences.score
    ];

    const totalChecks = 5; // Number of validation categories
    const passedChecks = scores.filter(score => score >= 80).length; // 80% threshold
    const failedChecks = totalChecks - passedChecks;

    const completenessScore = detailedResults.completeness.score;
    const qualityScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);

    return {
      totalChecks,
      passedChecks,
      failedChecks,
      warningCount: warnings.length,
      errorCount: errors.length,
      completenessScore,
      qualityScore
    };
  }

  /**
   * Generate recommendations based on validation results
   */
  private generateRecommendations(
    detailedResults: DetailedValidationResults,
    summary: ValidationSummary
  ): string[] {
    const recommendations: string[] = [];

    if (detailedResults.completeness.score < 80) {
      recommendations.push('Improve documentation completeness by adding missing components and sections');
    }

    if (detailedResults.apiAccuracy.score < 80) {
      recommendations.push('Review API documentation accuracy against source code');
    }

    if (detailedResults.exampleSyntax.score < 80) {
      recommendations.push('Fix syntax errors in code examples');
    }

    if (detailedResults.accessibility.score < 80) {
      recommendations.push('Enhance accessibility documentation with ARIA attributes and keyboard navigation');
    }

    if (summary.qualityScore < 70) {
      recommendations.push('Consider regenerating documentation with updated analysis tools');
    }

    if (recommendations.length === 0) {
      recommendations.push('Documentation quality is excellent! Consider adding more advanced examples.');
    }

    return recommendations;
  }

  /**
   * Log validation results
   */
  private logValidationResults(report: ValidationReport): void {
    const { summary, result } = report;

    if (result.valid) {
      this.logger.success(`Documentation validation passed! Quality score: ${summary.qualityScore}%`);
    } else {
      this.logger.warn(`Documentation validation found issues. Quality score: ${summary.qualityScore}%`);
    }

    this.logger.info(`Validation Summary:`);
    this.logger.info(`  - Completeness: ${summary.completenessScore}%`);
    this.logger.info(`  - Quality: ${summary.qualityScore}%`);
    this.logger.info(`  - Errors: ${summary.errorCount}`);
    this.logger.info(`  - Warnings: ${summary.warningCount}`);

    if (report.recommendations.length > 0) {
      this.logger.info(`Recommendations:`);
      report.recommendations.forEach(rec => {
        this.logger.info(`  - ${rec}`);
      });
    }
  }
}