/**
 * Core type definitions for the LLM Documentation Generator
 */

export interface ComponentInfo {
  name: string;
  category: ComponentCategory;
  filePath: string;
  description: string;
  props: PropDefinition[];
  events: EventDefinition[];
  slots: SlotDefinition[];
  methods: MethodDefinition[];
  accessibility: AccessibilityFeatures;
  examples: UsageExample[];
  styling: ComponentStyling;
}

export type ComponentCategory = 'atom' | 'molecule' | 'organism' | 'layout' | 'util' | 'hook' | 'theme';

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description: string;
  deprecated?: boolean;
}

export interface EventDefinition {
  name: string;
  type: string;
  description: string;
  payload?: string;
}

export interface SlotDefinition {
  name: string;
  description: string;
  props?: Record<string, string>;
}

export interface MethodDefinition {
  name: string;
  parameters: ParameterDefinition[];
  returnType: string;
  description: string;
}

export interface ParameterDefinition {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface AccessibilityFeatures {
  ariaAttributes: ARIAAttribute[];
  keyboardNavigation: KeyboardShortcut[];
  focusManagement: FocusPattern[];
  screenReaderSupport: ScreenReaderFeature[];
  wcagCompliance: WCAGCompliance[];
}

export interface ARIAAttribute {
  name: string;
  value: string;
  description: string;
  required: boolean;
}

export interface KeyboardShortcut {
  key: string;
  modifiers?: string[];
  action: string;
  description: string;
}

export interface FocusPattern {
  type: 'trap' | 'restore' | 'manage';
  description: string;
  implementation: string;
}

export interface ScreenReaderFeature {
  type: 'announcement' | 'live-region' | 'label' | 'description';
  content: string;
  trigger: string;
}

export interface WCAGCompliance {
  level: 'A' | 'AA' | 'AAA';
  criterion: string;
  description: string;
  implementation: string;
}

export interface ComponentStyling {
  cssProperties: CSSProperty[];
  variants: VariantDefinition[];
  themes: ThemeOption[];
  glassmorphism?: GlassmorphismEffect;
}

export interface CSSProperty {
  name: string;
  defaultValue: string;
  description: string;
  category: 'color' | 'spacing' | 'typography' | 'effect' | 'layout';
}

export interface VariantDefinition {
  name: string;
  description: string;
  cssClass: string;
  properties: Record<string, string>;
}

export interface ThemeOption {
  name: string;
  description: string;
  cssVariables: Record<string, string>;
}

export interface GlassmorphismEffect {
  backdropFilter: string;
  background: string;
  border: string;
  opacity: number;
}

export interface UsageExample {
  title: string;
  description: string;
  code: string;
  language: 'svelte' | 'typescript' | 'javascript';
  complexity: 'basic' | 'intermediate' | 'advanced';
}

export interface TypeDefinition {
  name: string;
  type: 'interface' | 'type' | 'enum';
  definition: string;
  description: string;
  properties?: PropertyDefinition[];
}

export interface PropertyDefinition {
  name: string;
  type: string;
  optional: boolean;
  description: string;
}

export interface EnumDefinition {
  name: string;
  values: EnumValue[];
  description: string;
}

export interface EnumValue {
  name: string;
  value: string | number;
  description: string;
}

export interface ResolvedType {
  name: string;
  definition: string;
  dependencies: string[];
}

export interface Breakpoint {
  name: string;
  minWidth: string;
  maxWidth?: string;
  description: string;
}

export interface ThemeDocumentation {
  colorSystem: ColorDefinition[];
  spacingSystem: SpacingDefinition[];
  typographySystem: TypographyDefinition[];
  customProperties: CSSProperty[];
  glassmorphism: GlassmorphismGuide;
  responsive: ResponsiveGuide;
}

export interface ColorDefinition {
  name: string;
  value: string;
  description: string;
  usage: string[];
}

export interface SpacingDefinition {
  name: string;
  value: string;
  description: string;
  usage: string[];
}

export interface TypographyDefinition {
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  description: string;
}

export interface GlassmorphismGuide {
  effects: GlassEffect[];
  implementation: string;
  bestPractices: string[];
}

export interface GlassEffect {
  name: string;
  backdropFilter: string;
  background: string;
  border: string;
  usage: string;
}

export interface ResponsiveGuide {
  breakpoints: Breakpoint[];
  patterns: ResponsivePattern[];
  bestPractices: string[];
}

export interface ResponsivePattern {
  name: string;
  description: string;
  implementation: string;
  example: string;
}

export interface AccessibilityGuide {
  ariaAttributes: ARIAAttribute[];
  keyboardNavigation: KeyboardShortcut[];
  focusManagement: FocusPattern[];
  screenReaderSupport: ScreenReaderFeature[];
  wcagCompliance: WCAGCompliance[];
  bestPractices: string[];
}

export interface ARIAPattern {
  name: string;
  attributes: ARIAAttribute[];
  usage: string;
  example: string;
}

export interface KeyboardPattern {
  name: string;
  shortcuts: KeyboardShortcut[];
  implementation: string;
  example: string;
}

export interface UsagePattern {
  name: string;
  description: string;
  components: string[];
  example: string;
  bestPractices: string[];
}

export interface BestPractice {
  title: string;
  description: string;
  example?: string;
  antiPattern?: string;
}

export interface ComponentDocumentation {
  metadata: ComponentMetadata;
  api: ComponentAPI;
  styling: ComponentStyling;
  accessibility: AccessibilityGuide;
  examples: UsageExample[];
  bestPractices: BestPractice[];
  relatedComponents: string[];
}

export interface ComponentMetadata {
  name: string;
  category: ComponentCategory;
  version: string;
  lastUpdated: Date;
  filePath: string;
  dependencies: string[];
}

export interface ComponentAPI {
  props: PropDefinition[];
  events: EventDefinition[];
  slots: SlotDefinition[];
  methods: MethodDefinition[];
}

export interface LLMDocumentation {
  header: DocumentationHeader;
  quickReference: QuickReferenceGuide;
  designSystem: DesignSystemDocumentation;
  components: ComponentsByCategory;
  patterns: UsagePattern[];
  accessibility: GlobalAccessibilityGuide;
  troubleshooting: TroubleshootingGuide;
}

export interface DocumentationHeader {
  title: string;
  version: string;
  lastGenerated: Date;
  description: string;
  tableOfContents: TableOfContentsEntry[];
}

export interface TableOfContentsEntry {
  title: string;
  anchor: string;
  level: number;
  children?: TableOfContentsEntry[];
}

export interface QuickReferenceGuide {
  installation: string;
  basicUsage: string;
  commonPatterns: string[];
  troubleshooting: string[];
}

export interface DesignSystemDocumentation {
  theme: ThemeDocumentation;
  components: ComponentOverview[];
  patterns: DesignPattern[];
}

export interface ComponentOverview {
  name: string;
  category: ComponentCategory;
  description: string;
  usage: string;
}

export interface DesignPattern {
  name: string;
  description: string;
  components: string[];
  example: string;
}

export interface ComponentsByCategory {
  atoms: ComponentDocumentation[];
  molecules: ComponentDocumentation[];
  organisms: ComponentDocumentation[];
  layouts: ComponentDocumentation[];
  utils: ComponentDocumentation[];
  hooks: ComponentDocumentation[];
  theme: ComponentDocumentation[];
}

export interface GlobalAccessibilityGuide {
  overview: string;
  wcagCompliance: WCAGCompliance[];
  keyboardNavigation: KeyboardPattern[];
  screenReaderSupport: ScreenReaderFeature[];
  bestPractices: string[];
}

export interface TroubleshootingGuide {
  commonIssues: TroubleshootingEntry[];
  faq: FAQEntry[];
  support: SupportInfo;
}

export interface TroubleshootingEntry {
  issue: string;
  symptoms: string[];
  solutions: string[];
  relatedComponents?: string[];
}

export interface FAQEntry {
  question: string;
  answer: string;
  relatedTopics?: string[];
}

export interface SupportInfo {
  documentation: string;
  repository: string;
  issues: string;
  community: string;
}

export interface ParseError {
  file: string;
  line?: number;
  column?: number;
  message: string;
  type: 'syntax' | 'type' | 'import' | 'unknown';
}

export interface PartialDocumentation {
  component: string;
  available: string[];
  missing: string[];
  errors: ParseError[];
}

export interface BasicDocumentation {
  name: string;
  description: string;
  category: ComponentCategory;
  fallbackReason: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: string;
  message: string;
  component?: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ValidationWarning {
  type: string;
  message: string;
  component?: string;
  suggestion?: string;
}