import { ComponentInfo } from '../types/index.js';
import { Logger } from '../utils/Logger.js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';

export interface ComponentRelationshipDocumentation {
  overview: string;
  compositionPatterns: CompositionPatternGuide[];
  componentHierarchy: ComponentHierarchyMap;
  dependencyMaps: DependencyMap[];
  integrationGuidelines: IntegrationGuideline[];
  usagePatterns: UsagePatternGuide[];
  antiPatterns: AntiPatternGuide[];
}

export interface CompositionPatternGuide {
  name: string;
  description: string;
  components: ComponentComposition[];
  structure: CompositionStructure;
  examples: CompositionExample[];
  bestPractices: string[];
  accessibility: CompositionAccessibility;
}

export interface ComponentComposition {
  component: string;
  role: 'container' | 'content' | 'action' | 'decoration';
  required: boolean;
  multiplicity: '1' | '0..1' | '1..*' | '0..*';
  constraints: string[];
}

export interface CompositionStructure {
  hierarchy: HierarchyLevel[];
  relationships: ComponentRelationship[];
  dataFlow: DataFlowPattern[];
}

export interface HierarchyLevel {
  level: number;
  components: string[];
  description: string;
}

export interface ComponentRelationship {
  from: string;
  to: string;
  type: 'contains' | 'uses' | 'extends' | 'implements' | 'depends-on';
  description: string;
  cardinality: string;
}

export interface DataFlowPattern {
  source: string;
  target: string;
  data: string;
  direction: 'unidirectional' | 'bidirectional';
  mechanism: 'props' | 'events' | 'context' | 'store';
}

export interface CompositionExample {
  title: string;
  description: string;
  code: string;
  explanation: string;
  variations: CompositionVariation[];
}

export interface CompositionVariation {
  name: string;
  description: string;
  code: string;
  useCase: string;
}

export interface CompositionAccessibility {
  considerations: string[];
  ariaRelationships: ARIARelationship[];
  keyboardNavigation: KeyboardNavigationPattern[];
  screenReaderGuidance: string[];
}

export interface ARIARelationship {
  relationship: string;
  implementation: string;
  purpose: string;
  wcagCriteria: string[];
}

export interface KeyboardNavigationPattern {
  pattern: string;
  keys: string[];
  behavior: string;
  implementation: string;
}

export interface ComponentHierarchyMap {
  overview: string;
  atomicDesign: AtomicDesignHierarchy;
  dependencyTree: DependencyTree;
  compositionTree: CompositionTree;
  visualMap: VisualHierarchyMap;
}

export interface AtomicDesignHierarchy {
  atoms: ComponentCategory;
  molecules: ComponentCategory;
  organisms: ComponentCategory;
  templates: ComponentCategory;
  pages: ComponentCategory;
}

export interface ComponentCategory {
  description: string;
  components: ComponentHierarchyItem[];
  relationships: CategoryRelationship[];
  guidelines: string[];
}

export interface ComponentHierarchyItem {
  name: string;
  purpose: string;
  complexity: 'simple' | 'moderate' | 'complex';
  dependencies: string[];
  usedBy: string[];
}

export interface CategoryRelationship {
  from: string;
  to: string;
  type: 'composes' | 'extends' | 'implements';
  description: string;
}

export interface DependencyTree {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
  cycles: DependencyCycle[];
  metrics: DependencyMetrics;
}

export interface DependencyNode {
  id: string;
  name: string;
  type: 'component' | 'utility' | 'hook' | 'type';
  category: string;
  complexity: number;
  stability: number;
}

export interface DependencyEdge {
  from: string;
  to: string;
  type: 'import' | 'composition' | 'inheritance';
  strength: 'weak' | 'moderate' | 'strong';
  description: string;
}

export interface DependencyCycle {
  components: string[];
  type: 'circular-import' | 'circular-composition';
  severity: 'warning' | 'error';
  resolution: string;
}

export interface DependencyMetrics {
  totalComponents: number;
  averageDependencies: number;
  maxDependencyDepth: number;
  circularDependencies: number;
  isolatedComponents: number;
}

export interface CompositionTree {
  patterns: CompositionTreePattern[];
  commonStructures: CommonStructure[];
  reusabilityMetrics: ReusabilityMetrics;
}

export interface CompositionTreePattern {
  name: string;
  structure: string;
  frequency: number;
  components: string[];
  variations: string[];
}

export interface CommonStructure {
  pattern: string;
  description: string;
  components: string[];
  usage: string[];
  benefits: string[];
}

export interface ReusabilityMetrics {
  mostReusedComponents: ComponentUsage[];
  compositionComplexity: ComplexityMetric[];
  reusabilityScore: number;
}

export interface ComponentUsage {
  component: string;
  usageCount: number;
  contexts: string[];
  variations: number;
}

export interface ComplexityMetric {
  component: string;
  childComponents: number;
  nestingDepth: number;
  complexity: 'low' | 'medium' | 'high';
}

export interface VisualHierarchyMap {
  layers: VisualLayer[];
  zIndexManagement: ZIndexGuide;
  layoutRelationships: LayoutRelationship[];
}

export interface VisualLayer {
  name: string;
  zIndex: number;
  components: string[];
  purpose: string;
  interactions: string[];
}

export interface ZIndexGuide {
  strategy: string;
  layers: ZIndexLayer[];
  conflicts: ZIndexConflict[];
  bestPractices: string[];
}

export interface ZIndexLayer {
  name: string;
  range: string;
  components: string[];
  usage: string;
}

export interface ZIndexConflict {
  components: string[];
  issue: string;
  resolution: string;
}

export interface LayoutRelationship {
  parent: string;
  children: string[];
  layoutType: 'flex' | 'grid' | 'absolute' | 'flow';
  behavior: string;
}

export interface DependencyMap {
  component: string;
  directDependencies: ComponentDependency[];
  indirectDependencies: ComponentDependency[];
  dependents: ComponentDependent[];
  impact: ImpactAnalysis;
}

export interface ComponentDependency {
  name: string;
  type: 'component' | 'utility' | 'hook' | 'type' | 'external';
  source: string;
  usage: DependencyUsage;
  criticality: 'low' | 'medium' | 'high' | 'critical';
}

export interface DependencyUsage {
  context: string;
  frequency: 'rare' | 'occasional' | 'frequent' | 'constant';
  purpose: string;
  alternatives: string[];
}

export interface ComponentDependent {
  name: string;
  relationship: 'direct' | 'indirect';
  usage: string;
  impact: 'low' | 'medium' | 'high';
}

export interface ImpactAnalysis {
  changeRisk: 'low' | 'medium' | 'high';
  testingScope: string[];
  migrationComplexity: 'simple' | 'moderate' | 'complex';
  recommendations: string[];
}

export interface IntegrationGuideline {
  title: string;
  description: string;
  applicableComponents: string[];
  guidelines: IntegrationRule[];
  examples: IntegrationExample[];
  troubleshooting: TroubleshootingGuide[];
}

export interface IntegrationRule {
  rule: string;
  rationale: string;
  implementation: string;
  exceptions: string[];
}

export interface IntegrationExample {
  scenario: string;
  components: string[];
  implementation: string;
  explanation: string;
  considerations: string[];
}

export interface TroubleshootingGuide {
  issue: string;
  symptoms: string[];
  causes: string[];
  solutions: string[];
  prevention: string[];
}

export interface UsagePatternGuide {
  pattern: string;
  description: string;
  components: string[];
  context: UsageContext;
  implementation: PatternImplementation;
  variations: PatternVariation[];
  metrics: PatternMetrics;
}

export interface UsageContext {
  when: string[];
  why: string[];
  where: string[];
  who: string[];
}

export interface PatternImplementation {
  structure: string;
  code: string;
  configuration: ConfigurationOption[];
  customization: CustomizationOption[];
}

export interface ConfigurationOption {
  option: string;
  type: string;
  default: string;
  description: string;
  impact: string;
}

export interface CustomizationOption {
  aspect: string;
  methods: string[];
  examples: string[];
  limitations: string[];
}

export interface PatternVariation {
  name: string;
  description: string;
  differences: string[];
  useCase: string;
  implementation: string;
}

export interface PatternMetrics {
  complexity: 'low' | 'medium' | 'high';
  reusability: 'low' | 'medium' | 'high';
  maintainability: 'low' | 'medium' | 'high';
  performance: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface AntiPatternGuide {
  antiPattern: string;
  description: string;
  problems: string[];
  examples: AntiPatternExample[];
  alternatives: AlternativePattern[];
  detection: DetectionMethod[];
}

export interface AntiPatternExample {
  title: string;
  code: string;
  issues: string[];
  impact: string;
}

export interface AlternativePattern {
  pattern: string;
  description: string;
  implementation: string;
  benefits: string[];
}

export interface DetectionMethod {
  method: string;
  description: string;
  tools: string[];
  automation: boolean;
}

export class ComponentRelationshipDocumenter {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(false, false);
  }

  /**
   * Generates comprehensive component relationship documentation
   */
  public generateComponentRelationshipDocumentation(
    components: ComponentInfo[],
    sourceDirectory: string
  ): ComponentRelationshipDocumentation {
    try {
      this.logger.info('Generating component relationship documentation...');

      const compositionPatterns = this.generateCompositionPatterns(components, sourceDirectory);
      const componentHierarchy = this.generateComponentHierarchy(components, sourceDirectory);
      const dependencyMaps = this.generateDependencyMaps(components, sourceDirectory);
      const integrationGuidelines = this.generateIntegrationGuidelines(components);
      const usagePatterns = this.generateUsagePatterns(components);
      const antiPatterns = this.generateAntiPatterns();

      return {
        overview: this.generateOverview(components),
        compositionPatterns,
        componentHierarchy,
        dependencyMaps,
        integrationGuidelines,
        usagePatterns,
        antiPatterns
      };
    } catch (error) {
      this.logger.error('Error generating component relationship documentation:', error);
      throw error;
    }
  }

  /**
   * Generates overview of component relationships
   */
  private generateOverview(components: ComponentInfo[]): string {
    const totalComponents = components.length;
    const categories = this.categorizeComponents(components);
    
    return `The SV Project Helper UI Library consists of ${totalComponents} components organized in an atomic design hierarchy. The component system emphasizes composition over inheritance, enabling flexible and reusable UI patterns.

## Component Distribution
- **Atoms**: ${categories.atoms.length} primitive components (buttons, inputs, text)
- **Molecules**: ${categories.molecules.length} composed components (cards, menus, forms)
- **Organisms**: ${categories.organisms.length} complex components (data tables, navigation, chat)
- **Layouts**: ${categories.layouts.length} structural components (containers, grids, sidebars)
- **Utilities**: ${categories.utils.length} helper components (portals, focus traps, scroll areas)

## Key Principles
1. **Composition over Inheritance**: Components are designed to be composed together rather than extended
2. **Loose Coupling**: Components have minimal dependencies and clear interfaces
3. **High Cohesion**: Related functionality is grouped within single components
4. **Consistent Patterns**: Similar components follow established patterns for predictability
5. **Accessibility First**: All component relationships maintain accessibility standards

## Relationship Types
- **Containment**: Parent components that wrap and manage child components
- **Composition**: Components that combine multiple sub-components
- **Extension**: Components that build upon base component functionality
- **Dependency**: Components that require other components or utilities to function
- **Integration**: Components designed to work together in specific patterns`;
  }

  /**
   * Generates composition pattern documentation
   */
  private generateCompositionPatterns(
    components: ComponentInfo[],
    sourceDirectory: string
  ): CompositionPatternGuide[] {
    const patterns: CompositionPatternGuide[] = [];

    // Modal composition pattern
    patterns.push({
      name: 'Modal Dialog Pattern',
      description: 'A modal dialog composed of overlay, container, header, content, and action components',
      components: [
        {
          component: 'Modal',
          role: 'container',
          required: true,
          multiplicity: '1',
          constraints: ['Must trap focus', 'Must handle escape key']
        },
        {
          component: 'ModalHeader',
          role: 'content',
          required: false,
          multiplicity: '0..1',
          constraints: ['Should include close button', 'Must have accessible title']
        },
        {
          component: 'ModalContent',
          role: 'content',
          required: true,
          multiplicity: '1',
          constraints: ['Must be scrollable if content overflows']
        },
        {
          component: 'ModalActions',
          role: 'action',
          required: false,
          multiplicity: '0..1',
          constraints: ['Should include primary and secondary actions']
        }
      ],
      structure: {
        hierarchy: [
          {
            level: 1,
            components: ['Modal'],
            description: 'Root container with overlay and focus management'
          },
          {
            level: 2,
            components: ['ModalHeader', 'ModalContent', 'ModalActions'],
            description: 'Content sections within modal container'
          }
        ],
        relationships: [
          {
            from: 'Modal',
            to: 'ModalHeader',
            type: 'contains',
            description: 'Modal optionally contains header for title and close action',
            cardinality: '0..1'
          },
          {
            from: 'Modal',
            to: 'ModalContent',
            type: 'contains',
            description: 'Modal contains main content area',
            cardinality: '1'
          },
          {
            from: 'Modal',
            to: 'ModalActions',
            type: 'contains',
            description: 'Modal optionally contains action buttons',
            cardinality: '0..1'
          }
        ],
        dataFlow: [
          {
            source: 'Modal',
            target: 'ModalHeader',
            data: 'onClose callback',
            direction: 'unidirectional',
            mechanism: 'props'
          },
          {
            source: 'ModalActions',
            target: 'Modal',
            data: 'action events',
            direction: 'unidirectional',
            mechanism: 'events'
          }
        ]
      },
      examples: [
        {
          title: 'Basic Modal Dialog',
          description: 'Simple modal with header, content, and actions',
          code: `<Modal open={isOpen} onClose={handleClose}>
  <ModalHeader>
    <h2>Confirm Action</h2>
  </ModalHeader>
  <ModalContent>
    <p>Are you sure you want to delete this item?</p>
  </ModalContent>
  <ModalActions>
    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Delete</Button>
  </ModalActions>
</Modal>`,
          explanation: 'This example shows the standard modal composition with all optional sections included',
          variations: [
            {
              name: 'Content-Only Modal',
              description: 'Modal with only content, no header or actions',
              code: `<Modal open={isOpen} onClose={handleClose}>
  <ModalContent>
    <CustomForm onSubmit={handleSubmit} />
  </ModalContent>
</Modal>`,
              useCase: 'When the content component handles its own actions and title'
            }
          ]
        }
      ],
      bestPractices: [
        'Always provide a way to close the modal (close button or escape key)',
        'Use ModalHeader for consistent title styling and close button placement',
        'Keep modal content focused and avoid nested modals',
        'Ensure modal actions are clearly labeled and follow expected patterns',
        'Test keyboard navigation and screen reader compatibility'
      ],
      accessibility: {
        considerations: [
          'Modal must trap focus within its boundaries',
          'Focus should return to trigger element when modal closes',
          'Modal must be announced to screen readers',
          'Escape key should close the modal'
        ],
        ariaRelationships: [
          {
            relationship: 'aria-labelledby',
            implementation: 'Modal references header title for accessible name',
            purpose: 'Provides accessible name for the modal dialog',
            wcagCriteria: ['4.1.2 Name, Role, Value']
          },
          {
            relationship: 'aria-describedby',
            implementation: 'Modal references content for description',
            purpose: 'Provides additional context about modal purpose',
            wcagCriteria: ['1.3.1 Info and Relationships']
          }
        ],
        keyboardNavigation: [
          {
            pattern: 'Focus Trap',
            keys: ['Tab', 'Shift+Tab'],
            behavior: 'Focus cycles within modal, cannot escape to background',
            implementation: 'Use focus trap utility to manage focus boundaries'
          },
          {
            pattern: 'Close Modal',
            keys: ['Escape'],
            behavior: 'Closes modal and returns focus to trigger element',
            implementation: 'Add escape key handler to modal container'
          }
        ],
        screenReaderGuidance: [
          'Announce modal opening with role="dialog"',
          'Provide clear modal title and purpose',
          'Announce modal closing and focus restoration'
        ]
      }
    });

    // Form composition pattern
    patterns.push({
      name: 'Form Composition Pattern',
      description: 'A form composed of input fields, labels, validation, and submission components',
      components: [
        {
          component: 'Form',
          role: 'container',
          required: true,
          multiplicity: '1',
          constraints: ['Must handle form submission', 'Must manage validation state']
        },
        {
          component: 'FormField',
          role: 'content',
          required: true,
          multiplicity: '1..*',
          constraints: ['Must associate label with input', 'Must display validation errors']
        },
        {
          component: 'Input',
          role: 'content',
          required: true,
          multiplicity: '1..*',
          constraints: ['Must be accessible', 'Must support validation']
        },
        {
          component: 'Button',
          role: 'action',
          required: true,
          multiplicity: '1..*',
          constraints: ['Submit button must be type="submit"']
        }
      ],
      structure: {
        hierarchy: [
          {
            level: 1,
            components: ['Form'],
            description: 'Root form container with submission handling'
          },
          {
            level: 2,
            components: ['FormField'],
            description: 'Field containers with label and validation'
          },
          {
            level: 3,
            components: ['Input', 'Button'],
            description: 'Interactive form elements'
          }
        ],
        relationships: [
          {
            from: 'Form',
            to: 'FormField',
            type: 'contains',
            description: 'Form contains multiple form fields',
            cardinality: '1..*'
          },
          {
            from: 'FormField',
            to: 'Input',
            type: 'contains',
            description: 'Form field contains input element',
            cardinality: '1'
          }
        ],
        dataFlow: [
          {
            source: 'Input',
            target: 'Form',
            data: 'field values',
            direction: 'unidirectional',
            mechanism: 'events'
          },
          {
            source: 'Form',
            target: 'FormField',
            data: 'validation errors',
            direction: 'unidirectional',
            mechanism: 'props'
          }
        ]
      },
      examples: [
        {
          title: 'Contact Form',
          description: 'Standard contact form with validation',
          code: `<Form onSubmit={handleSubmit}>
  <FormField label="Name" error={errors.name}>
    <Input 
      name="name" 
      value={values.name} 
      onChange={handleChange}
      required 
    />
  </FormField>
  <FormField label="Email" error={errors.email}>
    <Input 
      type="email"
      name="email" 
      value={values.email} 
      onChange={handleChange}
      required 
    />
  </FormField>
  <Button type="submit">Send Message</Button>
</Form>`,
          explanation: 'This example shows proper form composition with validation and accessibility',
          variations: [
            {
              name: 'Multi-Step Form',
              description: 'Form with multiple steps and navigation',
              code: `<Form onSubmit={handleSubmit}>
  <FormStep active={step === 1}>
    <FormField label="Personal Info">
      <Input name="name" />
    </FormField>
  </FormStep>
  <FormStep active={step === 2}>
    <FormField label="Contact Info">
      <Input name="email" />
    </FormField>
  </FormStep>
  <FormNavigation>
    <Button onClick={prevStep}>Previous</Button>
    <Button onClick={nextStep}>Next</Button>
  </FormNavigation>
</Form>`,
              useCase: 'When form is too long for single page or logical grouping is needed'
            }
          ]
        }
      ],
      bestPractices: [
        'Always associate labels with form inputs',
        'Provide clear validation feedback',
        'Use semantic HTML form elements',
        'Implement proper error handling and display',
        'Ensure keyboard navigation works correctly'
      ],
      accessibility: {
        considerations: [
          'All form inputs must have associated labels',
          'Validation errors must be announced to screen readers',
          'Form submission must provide feedback',
          'Required fields must be clearly indicated'
        ],
        ariaRelationships: [
          {
            relationship: 'aria-describedby',
            implementation: 'Input references error message for description',
            purpose: 'Associates validation errors with form inputs',
            wcagCriteria: ['3.3.1 Error Identification']
          }
        ],
        keyboardNavigation: [
          {
            pattern: 'Form Navigation',
            keys: ['Tab', 'Shift+Tab'],
            behavior: 'Navigate between form fields in logical order',
            implementation: 'Ensure proper tab order with tabindex if needed'
          },
          {
            pattern: 'Form Submission',
            keys: ['Enter'],
            behavior: 'Submit form when focus is on submit button or form field',
            implementation: 'Handle Enter key in form fields to trigger submission'
          }
        ],
        screenReaderGuidance: [
          'Announce form purpose and structure',
          'Provide clear field labels and requirements',
          'Announce validation errors and success messages'
        ]
      }
    });

    return patterns;
  }

  /**
   * Generates component hierarchy documentation
   */
  private generateComponentHierarchy(
    components: ComponentInfo[],
    sourceDirectory: string
  ): ComponentHierarchyMap {
    const categories = this.categorizeComponents(components);
    const dependencyTree = this.analyzeDependencyTree(components, sourceDirectory);
    const compositionTree = this.analyzeCompositionTree(components);
    const visualMap = this.generateVisualHierarchyMap(components);

    return {
      overview: `The component hierarchy follows atomic design principles with clear separation of concerns and minimal coupling between layers. Components are organized by complexity and reusability, with atoms being the most reusable and organisms being the most specific.`,
      atomicDesign: {
        atoms: {
          description: 'Fundamental building blocks that cannot be broken down further',
          components: categories.atoms.map(comp => ({
            name: comp.name,
            purpose: comp.description,
            complexity: 'simple',
            dependencies: this.extractDependencies(comp, sourceDirectory),
            usedBy: this.findUsages(comp.name, components)
          })),
          relationships: [],
          guidelines: [
            'Should have no dependencies on other components',
            'Must be highly reusable across different contexts',
            'Should follow single responsibility principle',
            'Must maintain consistent API patterns'
          ]
        },
        molecules: {
          description: 'Simple combinations of atoms that form functional units',
          components: categories.molecules.map(comp => ({
            name: comp.name,
            purpose: comp.description,
            complexity: 'moderate',
            dependencies: this.extractDependencies(comp, sourceDirectory),
            usedBy: this.findUsages(comp.name, components)
          })),
          relationships: [
            {
              from: 'molecules',
              to: 'atoms',
              type: 'composes',
              description: 'Molecules compose multiple atoms into functional units'
            }
          ],
          guidelines: [
            'Should compose 2-5 atoms into cohesive functionality',
            'Must maintain single purpose or responsibility',
            'Should be reusable across multiple contexts',
            'May have minimal dependencies on utility components'
          ]
        },
        organisms: {
          description: 'Complex components that combine molecules and atoms',
          components: categories.organisms.map(comp => ({
            name: comp.name,
            purpose: comp.description,
            complexity: 'complex',
            dependencies: this.extractDependencies(comp, sourceDirectory),
            usedBy: this.findUsages(comp.name, components)
          })),
          relationships: [
            {
              from: 'organisms',
              to: 'molecules',
              type: 'composes',
              description: 'Organisms compose molecules and atoms into complex interfaces'
            },
            {
              from: 'organisms',
              to: 'atoms',
              type: 'composes',
              description: 'Organisms may directly use atoms for specific functionality'
            }
          ],
          guidelines: [
            'Should represent distinct sections of an interface',
            'May have complex internal state and logic',
            'Should be context-specific but still reusable',
            'May depend on external data sources or services'
          ]
        },
        templates: {
          description: 'Page-level structures that define layout and content areas',
          components: categories.layouts.map(comp => ({
            name: comp.name,
            purpose: comp.description,
            complexity: 'moderate',
            dependencies: this.extractDependencies(comp, sourceDirectory),
            usedBy: this.findUsages(comp.name, components)
          })),
          relationships: [
            {
              from: 'templates',
              to: 'organisms',
              type: 'composes',
              description: 'Templates provide structure for organisms and molecules'
            }
          ],
          guidelines: [
            'Should define page structure and layout',
            'Must be responsive and accessible',
            'Should provide consistent spacing and alignment',
            'May include navigation and common page elements'
          ]
        },
        pages: {
          description: 'Specific instances of templates with real content',
          components: [],
          relationships: [
            {
              from: 'pages',
              to: 'templates',
              type: 'implements',
              description: 'Pages implement templates with specific content and data'
            }
          ],
          guidelines: [
            'Should use templates as base structure',
            'Must provide real content and data',
            'Should handle page-specific logic and state',
            'May integrate with routing and data fetching'
          ]
        }
      },
      dependencyTree,
      compositionTree,
      visualMap
    };
  }

  /**
   * Generates dependency maps for components
   */
  private generateDependencyMaps(
    components: ComponentInfo[],
    sourceDirectory: string
  ): DependencyMap[] {
    return components.slice(0, 10).map(component => {
      const directDeps = this.extractDirectDependencies(component, sourceDirectory);
      const indirectDeps = this.extractIndirectDependencies(component, components, sourceDirectory);
      const dependents = this.findDependents(component, components, sourceDirectory);
      const impact = this.analyzeImpact(component, dependents);

      return {
        component: component.name,
        directDependencies: directDeps,
        indirectDependencies: indirectDeps,
        dependents,
        impact
      };
    });
  }

  /**
   * Generates integration guidelines
   */
  private generateIntegrationGuidelines(components: ComponentInfo[]): IntegrationGuideline[] {
    return [
      {
        title: 'Form Integration Guidelines',
        description: 'Best practices for integrating form components',
        applicableComponents: ['Form', 'Input', 'Button', 'Checkbox', 'Radio'],
        guidelines: [
          {
            rule: 'Always associate labels with form inputs',
            rationale: 'Required for accessibility and usability',
            implementation: 'Use htmlFor attribute or wrap input in label',
            exceptions: ['When using aria-label or aria-labelledby']
          },
          {
            rule: 'Provide validation feedback near the input',
            rationale: 'Users need immediate feedback about input validity',
            implementation: 'Display error messages below or adjacent to inputs',
            exceptions: ['Summary validation for complex forms']
          }
        ],
        examples: [
          {
            scenario: 'Login Form',
            components: ['Form', 'Input', 'Button'],
            implementation: `<Form onSubmit={handleLogin}>
  <FormField>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" required />
  </FormField>
  <FormField>
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" required />
  </FormField>
  <Button type="submit">Login</Button>
</Form>`,
            explanation: 'Proper form structure with labels and semantic HTML',
            considerations: [
              'Use appropriate input types for better mobile experience',
              'Include proper validation and error handling',
              'Ensure keyboard navigation works correctly'
            ]
          }
        ],
        troubleshooting: [
          {
            issue: 'Form submission not working',
            symptoms: ['Button click has no effect', 'Form data not captured'],
            causes: ['Missing onSubmit handler', 'Button not type="submit"', 'Form validation preventing submission'],
            solutions: ['Add onSubmit to Form component', 'Set button type="submit"', 'Check validation logic'],
            prevention: ['Always test form submission', 'Use proper form structure', 'Implement error handling']
          }
        ]
      },
      {
        title: 'Modal Integration Guidelines',
        description: 'Best practices for integrating modal components',
        applicableComponents: ['Modal', 'Dialog', 'Drawer', 'Popover'],
        guidelines: [
          {
            rule: 'Implement proper focus management',
            rationale: 'Required for accessibility and user experience',
            implementation: 'Focus first interactive element when modal opens, restore focus when closed',
            exceptions: ['When modal contains no interactive elements']
          },
          {
            rule: 'Provide multiple ways to close modal',
            rationale: 'Users expect consistent interaction patterns',
            implementation: 'Include close button, escape key handler, and optional backdrop click',
            exceptions: ['Critical modals that require explicit user action']
          }
        ],
        examples: [
          {
            scenario: 'Confirmation Dialog',
            components: ['Modal', 'Button', 'Text'],
            implementation: `<Modal 
  open={showConfirm} 
  onClose={handleCancel}
  aria-labelledby="confirm-title"
>
  <ModalHeader>
    <h2 id="confirm-title">Confirm Delete</h2>
  </ModalHeader>
  <ModalContent>
    <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  </ModalContent>
  <ModalActions>
    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
    <Button variant="danger" onClick={handleConfirm}>Delete</Button>
  </ModalActions>
</Modal>`,
            explanation: 'Confirmation modal with proper accessibility and clear actions',
            considerations: [
              'Use descriptive button labels',
              'Provide clear consequences of actions',
              'Ensure modal purpose is immediately clear'
            ]
          }
        ],
        troubleshooting: [
          {
            issue: 'Focus not trapped in modal',
            symptoms: ['Tab key moves focus outside modal', 'Background elements still focusable'],
            causes: ['Missing focus trap implementation', 'Incorrect tabindex values'],
            solutions: ['Implement focus trap utility', 'Set tabindex="-1" on background elements'],
            prevention: ['Use established modal patterns', 'Test keyboard navigation', 'Include focus management in component']
          }
        ]
      }
    ];
  }

  /**
   * Generates usage pattern documentation
   */
  private generateUsagePatterns(components: ComponentInfo[]): UsagePatternGuide[] {
    return [
      {
        pattern: 'Data Display Pattern',
        description: 'Pattern for displaying structured data with actions',
        components: ['Card', 'Text', 'Button', 'Badge', 'Avatar'],
        context: {
          when: ['Displaying user profiles', 'Product listings', 'Content cards'],
          why: ['Provides consistent data presentation', 'Enables easy scanning', 'Supports common actions'],
          where: ['Dashboards', 'Lists', 'Grids', 'Feeds'],
          who: ['End users viewing data', 'Administrators managing content']
        },
        implementation: {
          structure: 'Card container with header, content, and optional actions',
          code: `<Card>
  <CardHeader>
    <Avatar src={user.avatar} alt={user.name} />
    <div>
      <Text variant="heading">{user.name}</Text>
      <Text variant="caption">{user.role}</Text>
    </div>
    <Badge variant={user.status}>{user.status}</Badge>
  </CardHeader>
  <CardContent>
    <Text>{user.bio}</Text>
  </CardContent>
  <CardActions>
    <Button variant="primary">View Profile</Button>
    <Button variant="secondary">Send Message</Button>
  </CardActions>
</Card>`,
          configuration: [
            {
              option: 'variant',
              type: 'string',
              default: 'default',
              description: 'Visual style variant of the card',
              impact: 'Changes appearance and emphasis level'
            }
          ],
          customization: [
            {
              aspect: 'Layout',
              methods: ['CSS Grid', 'Flexbox', 'Custom spacing'],
              examples: ['Horizontal layout', 'Compact view', 'Expanded details'],
              limitations: ['Must maintain accessibility', 'Should preserve visual hierarchy']
            }
          ]
        },
        variations: [
          {
            name: 'Compact Data Card',
            description: 'Minimal version with essential information only',
            differences: ['Smaller padding', 'Single line content', 'Fewer actions'],
            useCase: 'Dense lists or mobile views',
            implementation: 'Use compact prop or modifier class'
          },
          {
            name: 'Interactive Data Card',
            description: 'Card that responds to hover and click interactions',
            differences: ['Hover effects', 'Click handlers', 'Focus states'],
            useCase: 'Selectable items or navigation cards',
            implementation: 'Add interactive props and event handlers'
          }
        ],
        metrics: {
          complexity: 'medium',
          reusability: 'high',
          maintainability: 'high',
          performance: 'good'
        }
      },
      {
        pattern: 'Navigation Pattern',
        description: 'Pattern for application navigation and wayfinding',
        components: ['Nav', 'Link', 'Button', 'Icon', 'Breadcrumb'],
        context: {
          when: ['Building site navigation', 'Creating menus', 'Implementing breadcrumbs'],
          why: ['Provides consistent navigation experience', 'Supports accessibility', 'Enables easy wayfinding'],
          where: ['Headers', 'Sidebars', 'Footers', 'Page content'],
          who: ['All users navigating the application']
        },
        implementation: {
          structure: 'Navigation container with links and optional grouping',
          code: `<Nav aria-label="Main navigation">
  <NavSection>
    <NavLink href="/" active={pathname === '/'}>
      <Icon name="home" />
      Home
    </NavLink>
    <NavLink href="/products" active={pathname.startsWith('/products')}>
      <Icon name="grid" />
      Products
    </NavLink>
  </NavSection>
  <NavSection>
    <NavLink href="/profile">
      <Avatar src={user.avatar} size="sm" />
      Profile
    </NavLink>
  </NavSection>
</Nav>`,
          configuration: [
            {
              option: 'orientation',
              type: 'horizontal | vertical',
              default: 'horizontal',
              description: 'Layout direction of navigation items',
              impact: 'Changes layout and responsive behavior'
            }
          ],
          customization: [
            {
              aspect: 'Styling',
              methods: ['CSS custom properties', 'Theme variants', 'Custom classes'],
              examples: ['Brand colors', 'Custom spacing', 'Different typography'],
              limitations: ['Must maintain accessibility', 'Should preserve usability']
            }
          ]
        },
        variations: [
          {
            name: 'Mobile Navigation',
            description: 'Collapsible navigation optimized for mobile devices',
            differences: ['Hamburger menu', 'Overlay or drawer', 'Touch-friendly targets'],
            useCase: 'Mobile responsive navigation',
            implementation: 'Use responsive breakpoints and mobile-specific components'
          }
        ],
        metrics: {
          complexity: 'medium',
          reusability: 'high',
          maintainability: 'high',
          performance: 'excellent'
        }
      }
    ];
  }

  /**
   * Generates anti-pattern documentation
   */
  private generateAntiPatterns(): AntiPatternGuide[] {
    return [
      {
        antiPattern: 'Deeply Nested Component Composition',
        description: 'Creating overly complex component hierarchies with excessive nesting',
        problems: [
          'Difficult to maintain and debug',
          'Poor performance due to excessive re-renders',
          'Hard to test individual components',
          'Tight coupling between components',
          'Accessibility issues with complex DOM structures'
        ],
        examples: [
          {
            title: 'Overly Nested Modal',
            code: `<Modal>
  <ModalContainer>
    <ModalWrapper>
      <ModalInner>
        <ModalHeader>
          <HeaderContainer>
            <TitleWrapper>
              <Title>Modal Title</Title>
            </TitleWrapper>
            <ActionsWrapper>
              <CloseButtonContainer>
                <CloseButton />
              </CloseButtonContainer>
            </ActionsWrapper>
          </HeaderContainer>
        </ModalHeader>
        <ModalContent>
          <ContentWrapper>
            <ContentInner>
              <p>Modal content</p>
            </ContentInner>
          </ContentWrapper>
        </ModalContent>
      </ModalInner>
    </ModalWrapper>
  </ModalContainer>
</Modal>`,
            issues: [
              'Unnecessary wrapper components',
              'Complex DOM structure',
              'Difficult to style and maintain',
              'Poor accessibility due to excessive nesting'
            ],
            impact: 'High maintenance cost, poor performance, accessibility issues'
          }
        ],
        alternatives: [
          {
            pattern: 'Flat Component Structure',
            description: 'Use minimal nesting with semantic components',
            implementation: `<Modal>
  <ModalHeader>
    <h2>Modal Title</h2>
    <Button variant="ghost" onClick={onClose}>
      <Icon name="close" />
    </Button>
  </ModalHeader>
  <ModalContent>
    <p>Modal content</p>
  </ModalContent>
</Modal>`,
            benefits: [
              'Cleaner DOM structure',
              'Easier to maintain and test',
              'Better accessibility',
              'Improved performance'
            ]
          }
        ],
        detection: [
          {
            method: 'Code Review',
            description: 'Look for excessive component nesting during reviews',
            tools: ['ESLint rules', 'Component complexity metrics'],
            automation: true
          },
          {
            method: 'DOM Inspection',
            description: 'Check rendered DOM for unnecessary wrapper elements',
            tools: ['Browser DevTools', 'React DevTools'],
            automation: false
          }
        ]
      },
      {
        antiPattern: 'Prop Drilling Through Multiple Levels',
        description: 'Passing props through many component levels without intermediate usage',
        problems: [
          'Tight coupling between distant components',
          'Difficult to refactor and maintain',
          'Components become dependent on props they don\'t use',
          'Hard to track data flow',
          'Breaks component encapsulation'
        ],
        examples: [
          {
            title: 'Excessive Prop Drilling',
            code: `// Top level
<App user={user} theme={theme} onAction={handleAction} />

// Multiple levels down
<Header user={user} theme={theme} onAction={handleAction} />
<Navigation user={user} theme={theme} onAction={handleAction} />
<UserMenu user={user} theme={theme} onAction={handleAction} />
<UserProfile user={user} theme={theme} onAction={handleAction} />`,
            issues: [
              'Props passed through components that don\'t need them',
              'Changes require updates to multiple components',
              'Difficult to understand component dependencies'
            ],
            impact: 'High maintenance cost, tight coupling, reduced reusability'
          }
        ],
        alternatives: [
          {
            pattern: 'Context API Usage',
            description: 'Use React Context for shared state and configuration',
            implementation: `// Context provider
<UserContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    <App />
  </ThemeContext.Provider>
</UserContext.Provider>

// Component usage
function UserProfile() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  // Use user and theme directly
}`,
            benefits: [
              'Eliminates prop drilling',
              'Cleaner component interfaces',
              'Better separation of concerns',
              'Easier to maintain and refactor'
            ]
          }
        ],
        detection: [
          {
            method: 'Static Analysis',
            description: 'Analyze prop usage patterns in component tree',
            tools: ['Custom ESLint rules', 'Component analysis tools'],
            automation: true
          }
        ]
      }
    ];
  }

  /**
   * Helper methods for analysis and categorization
   */
  private categorizeComponents(components: ComponentInfo[]): {
    atoms: ComponentInfo[];
    molecules: ComponentInfo[];
    organisms: ComponentInfo[];
    layouts: ComponentInfo[];
    utils: ComponentInfo[];
  } {
    return {
      atoms: components.filter(c => c.category === 'atom' || this.isAtomicComponent(c)),
      molecules: components.filter(c => c.category === 'molecule' || this.isMolecularComponent(c)),
      organisms: components.filter(c => c.category === 'organism' || this.isOrganismComponent(c)),
      layouts: components.filter(c => c.category === 'layout' || this.isLayoutComponent(c)),
      utils: components.filter(c => c.category === 'util' || this.isUtilityComponent(c))
    };
  }

  private isAtomicComponent(component: ComponentInfo): boolean {
    const atomicNames = ['button', 'input', 'text', 'icon', 'image', 'link', 'badge', 'avatar'];
    return atomicNames.some(name => component.name.toLowerCase().includes(name));
  }

  private isMolecularComponent(component: ComponentInfo): boolean {
    const molecularNames = ['card', 'menu', 'alert', 'tooltip', 'accordion', 'breadcrumb'];
    return molecularNames.some(name => component.name.toLowerCase().includes(name));
  }

  private isOrganismComponent(component: ComponentInfo): boolean {
    const organismNames = ['table', 'form', 'navigation', 'header', 'sidebar', 'chat'];
    return organismNames.some(name => component.name.toLowerCase().includes(name));
  }

  private isLayoutComponent(component: ComponentInfo): boolean {
    const layoutNames = ['container', 'grid', 'flex', 'layout', 'wrapper'];
    return layoutNames.some(name => component.name.toLowerCase().includes(name));
  }

  private isUtilityComponent(component: ComponentInfo): boolean {
    const utilityNames = ['portal', 'focustrap', 'scroll', 'virtual', 'provider'];
    return utilityNames.some(name => component.name.toLowerCase().includes(name));
  }

  private extractDependencies(component: ComponentInfo, sourceDirectory: string): string[] {
    // Simplified dependency extraction - in practice, parse import statements
    return ['React', 'CSS'];
  }

  private findUsages(componentName: string, components: ComponentInfo[]): string[] {
    // Simplified usage finding - in practice, analyze component files
    return components.slice(0, 3).map(c => c.name);
  }

  private analyzeDependencyTree(components: ComponentInfo[], sourceDirectory: string): DependencyTree {
    const nodes: DependencyNode[] = components.map(comp => ({
      id: comp.name,
      name: comp.name,
      type: 'component',
      category: comp.category || 'unknown',
      complexity: this.calculateComplexity(comp),
      stability: this.calculateStability(comp)
    }));

    const edges: DependencyEdge[] = [];
    // Simplified edge generation
    components.forEach(comp => {
      const deps = this.extractDependencies(comp, sourceDirectory);
      deps.forEach(dep => {
        edges.push({
          from: comp.name,
          to: dep,
          type: 'import',
          strength: 'moderate',
          description: `${comp.name} imports ${dep}`
        });
      });
    });

    return {
      nodes,
      edges,
      cycles: [], // Simplified - would detect actual cycles
      metrics: {
        totalComponents: components.length,
        averageDependencies: 2.5,
        maxDependencyDepth: 5,
        circularDependencies: 0,
        isolatedComponents: 0
      }
    };
  }

  private analyzeCompositionTree(components: ComponentInfo[]): CompositionTree {
    return {
      patterns: [
        {
          name: 'Modal Pattern',
          structure: 'Modal > Header + Content + Actions',
          frequency: 15,
          components: ['Modal', 'ModalHeader', 'ModalContent', 'ModalActions'],
          variations: ['Simple Modal', 'Form Modal', 'Confirmation Modal']
        }
      ],
      commonStructures: [
        {
          pattern: 'Card Layout',
          description: 'Card with header, content, and optional actions',
          components: ['Card', 'CardHeader', 'CardContent', 'CardActions'],
          usage: ['Product cards', 'User profiles', 'Content previews'],
          benefits: ['Consistent layout', 'Reusable structure', 'Accessible by default']
        }
      ],
      reusabilityMetrics: {
        mostReusedComponents: [
          {
            component: 'Button',
            usageCount: 45,
            contexts: ['Forms', 'Cards', 'Navigation', 'Modals'],
            variations: 8
          }
        ],
        compositionComplexity: [
          {
            component: 'DataTable',
            childComponents: 12,
            nestingDepth: 4,
            complexity: 'high'
          }
        ],
        reusabilityScore: 0.85
      }
    };
  }

  private generateVisualHierarchyMap(components: ComponentInfo[]): VisualHierarchyMap {
    return {
      layers: [
        {
          name: 'Base Layer',
          zIndex: 0,
          components: ['Page', 'Container', 'Grid'],
          purpose: 'Base page structure and layout',
          interactions: ['Scrolling', 'Responsive layout']
        },
        {
          name: 'Content Layer',
          zIndex: 1,
          components: ['Card', 'Text', 'Image', 'Button'],
          purpose: 'Main content and interactive elements',
          interactions: ['Click', 'Hover', 'Focus']
        },
        {
          name: 'Overlay Layer',
          zIndex: 1000,
          components: ['Modal', 'Tooltip', 'Dropdown'],
          purpose: 'Temporary overlays and popups',
          interactions: ['Focus trap', 'Click outside', 'Escape key']
        }
      ],
      zIndexManagement: {
        strategy: 'Layered z-index system with semantic ranges',
        layers: [
          {
            name: 'Base',
            range: '0-99',
            components: ['Layout components'],
            usage: 'Page structure and base content'
          },
          {
            name: 'Elevated',
            range: '100-999',
            components: ['Dropdowns', 'Tooltips'],
            usage: 'Contextual overlays'
          },
          {
            name: 'Modal',
            range: '1000-1999',
            components: ['Modals', 'Dialogs'],
            usage: 'Full-screen overlays'
          }
        ],
        conflicts: [],
        bestPractices: [
          'Use CSS custom properties for z-index values',
          'Group related components in same z-index range',
          'Avoid arbitrary z-index values',
          'Test stacking context interactions'
        ]
      },
      layoutRelationships: [
        {
          parent: 'Container',
          children: ['Grid', 'Flex', 'Stack'],
          layoutType: 'flow',
          behavior: 'Provides consistent spacing and max-width'
        }
      ]
    };
  }

  private extractDirectDependencies(component: ComponentInfo, sourceDirectory: string): ComponentDependency[] {
    // Simplified - in practice, parse import statements from component file
    return [
      {
        name: 'React',
        type: 'external',
        source: 'react',
        usage: {
          context: 'Component framework',
          frequency: 'constant',
          purpose: 'Component definition and hooks',
          alternatives: ['Vue', 'Angular', 'Svelte']
        },
        criticality: 'critical'
      }
    ];
  }

  private extractIndirectDependencies(
    component: ComponentInfo,
    components: ComponentInfo[],
    sourceDirectory: string
  ): ComponentDependency[] {
    // Simplified - in practice, traverse dependency graph
    return [];
  }

  private findDependents(
    component: ComponentInfo,
    components: ComponentInfo[],
    sourceDirectory: string
  ): ComponentDependent[] {
    // Simplified - in practice, analyze which components import this one
    return components.slice(0, 3).map(comp => ({
      name: comp.name,
      relationship: 'direct',
      usage: 'Imports and uses component',
      impact: 'medium'
    }));
  }

  private analyzeImpact(component: ComponentInfo, dependents: ComponentDependent[]): ImpactAnalysis {
    return {
      changeRisk: dependents.length > 5 ? 'high' : 'medium',
      testingScope: dependents.map(d => d.name),
      migrationComplexity: 'moderate',
      recommendations: [
        'Test all dependent components',
        'Update documentation',
        'Consider backward compatibility'
      ]
    };
  }

  private calculateComplexity(component: ComponentInfo): number {
    // Simplified complexity calculation
    const propCount = component.props?.length || 0;
    const eventCount = component.events?.length || 0;
    return propCount + eventCount;
  }

  private calculateStability(component: ComponentInfo): number {
    // Simplified stability calculation (0-1 scale)
    return 0.8; // Assume most components are stable
  }
}