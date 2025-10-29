/**
 * LLM Markdown Assembler - Combines all documentation sections into final LLM.md
 * Applies LLM-optimized formatting and structure with table of contents and cross-references
 */

import type {
  LLMDocumentation,
  ComponentDocumentation,
  ComponentsByCategory,
  TableOfContentsEntry
} from '../types/index.ts';
import { Logger } from '../utils/Logger.ts';

export interface AssemblyOptions {
  includeTableOfContents: boolean;
  includeCrossReferences: boolean;
  optimizeForLLM: boolean;
  maxSectionLength: number;
  includeMetadata: boolean;
  generateAnchors: boolean;
}

export interface AssembledSection {
  title: string;
  content: string;
  anchor: string;
  wordCount: number;
  crossReferences: string[];
}

export interface AssemblyResult {
  markdown: string;
  sections: AssembledSection[];
  metadata: {
    totalWordCount: number;
    sectionCount: number;
    componentCount: number;
    generatedAt: Date;
    estimatedTokens: number;
  };
  tableOfContents: string;
  crossReferenceMap: Map<string, string[]>;
}

export class LLMMarkdownAssembler {
  private logger: Logger;
  private options: AssemblyOptions;
  private readonly defaultOptions: AssemblyOptions = {
    includeTableOfContents: true,
    includeCrossReferences: true,
    optimizeForLLM: true,
    maxSectionLength: 5000, // words
    includeMetadata: true,
    generateAnchors: true
  };

  constructor(
    options: Partial<AssemblyOptions> = {},
    verbose: boolean = false
  ) {
    this.options = { ...this.defaultOptions, ...options };
    this.logger = new Logger(verbose);
  }

  /**
   * Assemble complete LLM.md from documentation structure
   */
  async assembleLLMMarkdown(documentation: LLMDocumentation): Promise<AssemblyResult> {
    this.logger.info('Starting LLM.md assembly...');

    const sections: AssembledSection[] = [];
    const crossReferenceMap = new Map<string, string[]>();

    try {
      // 1. Header and metadata
      sections.push(this.assembleHeader(documentation));

      // 2. Table of contents (if enabled)
      if (this.options.includeTableOfContents) {
        sections.push(this.assembleTableOfContents(documentation));
      }

      // 3. Quick reference guide
      sections.push(this.assembleQuickReference(documentation));

      // 4. Design system documentation
      sections.push(this.assembleDesignSystem(documentation));

      // 5. Component documentation by category
      const componentSections = this.assembleComponentsByCategory(documentation.components);
      sections.push(...componentSections);

      // 6. Usage patterns and best practices
      sections.push(this.assembleUsagePatterns(documentation));

      // 7. Accessibility guide
      sections.push(this.assembleAccessibilityGuide(documentation));

      // 8. Troubleshooting and FAQ
      sections.push(this.assembleTroubleshooting(documentation));

      // 9. Generate cross-references
      if (this.options.includeCrossReferences) {
        this.generateCrossReferences(sections, crossReferenceMap);
      }

      // 10. Optimize for LLM consumption
      if (this.options.optimizeForLLM) {
        this.optimizeForLLMConsumption(sections);
      }

      // 11. Assemble final markdown
      const finalMarkdown = this.combineAllSections(sections, documentation);
      const tableOfContents = this.generateFinalTableOfContents(sections);

      const result: AssemblyResult = {
        markdown: finalMarkdown,
        sections,
        metadata: this.generateMetadata(sections, documentation),
        tableOfContents,
        crossReferenceMap
      };

      this.logger.success(`LLM.md assembled successfully (${result.metadata.totalWordCount} words, ~${result.metadata.estimatedTokens} tokens)`);
      return result;

    } catch (error) {
      this.logger.error(`Failed to assemble LLM.md: ${error}`);
      throw error;
    }
  }

  /**
   * Assemble header section with metadata
   */
  private assembleHeader(documentation: LLMDocumentation): AssembledSection {
    const content = this.template`
<!-- LLM_DOCUMENT_START -->
<!-- DOCUMENT_TYPE: Component Library API Reference -->
<!-- FRAMEWORK: Svelte 5 -->
<!-- LANGUAGE: TypeScript -->

# ${documentation.header.title}

> **Version:** ${documentation.header.version}  
> **Generated:** ${documentation.header.lastGenerated.toISOString()}  
> **Description:** ${documentation.header.description}

<!-- LLM_CONTEXT_START -->
**🤖 LLM Usage Instructions:**
This documentation is structured for optimal LLM consumption. Each section contains:
- Strategic markers for navigation (<!-- SECTION_TYPE:name -->)
- Component type indicators (<!-- COMPONENT_TYPE:atom/molecule/organism -->)
- Code block language hints (<!-- CODE_BLOCK:svelte/typescript -->)
- Cross-reference anchors for related content
<!-- LLM_CONTEXT_END -->

## About This Documentation

This comprehensive reference guide is optimized for Large Language Model (LLM) consumption and provides complete API documentation, usage patterns, and implementation guidance for the SV Project Helper UI Library.

### Key Features <!-- FEATURES_SECTION -->

- **Svelte 5 Native**: Built with modern Svelte 5 runes (\`$props\`, \`$derived\`, \`$state\`) and snippets
- **TypeScript First**: Fully typed components with exported Props interfaces
- **Accessibility Compliant**: WCAG 2.1 AA standards with comprehensive keyboard navigation
- **Glassmorphism Design**: Purple-themed glass effects with \`backdrop-filter\`
- **Mobile First**: Responsive design patterns starting from mobile breakpoints
- **Dark Mode**: Automatic system preference detection via \`prefers-color-scheme\`

### Library Architecture <!-- ARCHITECTURE_SECTION -->

The component library follows atomic design principles with strict TypeScript typing:

- **Atoms** (${this.countComponentsInCategory(documentation.components?.atoms)}): Core primitives (Button, Input, Text, Icon)
- **Molecules** (${this.countComponentsInCategory(documentation.components?.molecules)}): Composed components (Card, Alert, Menu)
- **Organisms** (${this.countComponentsInCategory(documentation.components?.organisms)}): Complex components (DataTable, Chat, Forms)
- **Layouts** (${this.countComponentsInCategory(documentation.components?.layouts)}): Page-level layouts and containers
- **Utils** (${this.countComponentsInCategory(documentation.components?.utils)}): Utility components (Portal, FocusTrap, ScrollArea)
- **Hooks** (${this.countComponentsInCategory(documentation.components?.hooks)}): Svelte 5 rune-based hooks for state management
- **Theme** (${this.countComponentsInCategory(documentation.components?.theme)}): Theming system and providers

### Development Standards <!-- STANDARDS_SECTION -->

- **ES Modules Only**: No CommonJS support (\`"type": "module"\`)
- **Svelte 5 Runes**: Use \`$props()\`, \`$derived()\`, \`$state()\` over legacy reactivity
- **Snippets**: Use \`{@render children?.()}\` for content projection
- **CSS Variables**: All theming through custom properties, never hardcoded values
- **Accessibility**: ARIA labels, keyboard navigation, focus management required

---
    `.trim();

    return {
      title: 'Header',
      content,
      anchor: 'header',
      wordCount: this.countWords(content),
      crossReferences: []
    };
  }

  /**
   * Assemble table of contents
   */
  private assembleTableOfContents(documentation: LLMDocumentation): AssembledSection {
    const toc = this.generateOptimizedTableOfContents(documentation);
    
    const content = this.template`
## Table of Contents

<!-- LLM_NAVIGATION_START -->

### Quick Navigation

- [🚀 Quick Reference](#quick-reference) - Installation, basic usage, common patterns
- [🎨 Design System](#design-system) - Theming, colors, glassmorphism effects
- [🧩 Components](#components) - Complete component library reference
- [♿ Accessibility](#accessibility) - WCAG compliance and keyboard navigation
- [🔧 Troubleshooting](#troubleshooting) - Common issues and solutions

### Component Categories

- [⚛️ Atoms](#atoms) (${this.countComponentsInCategory(documentation.components.atoms)}) - Basic building blocks
- [🧬 Molecules](#molecules) (${this.countComponentsInCategory(documentation.components.molecules)}) - Composed components  
- [🦠 Organisms](#organisms) (${this.countComponentsInCategory(documentation.components.organisms)}) - Complex components
- [📐 Layouts](#layouts) (${this.countComponentsInCategory(documentation.components.layouts)}) - Page-level layouts
- [🛠️ Utils](#utils) (${this.countComponentsInCategory(documentation.components.utils)}) - Utility components
- [🪝 Hooks](#hooks) (${this.countComponentsInCategory(documentation.components.hooks)}) - Svelte 5 hooks
- [🎭 Theme](#theme) (${this.countComponentsInCategory(documentation.components.theme)}) - Theme providers

### Detailed Contents

${toc}

<!-- LLM_NAVIGATION_END -->

---
    `.trim();

    return {
      title: 'Table of Contents',
      content,
      anchor: 'table-of-contents',
      wordCount: this.countWords(content),
      crossReferences: []
    };
  }

  /**
   * Assemble quick reference guide
   */
  private assembleQuickReference(documentation: LLMDocumentation): AssembledSection {
    const content = this.template`
## Quick Reference

### Installation

\`\`\`bash
${documentation.quickReference.installation}
\`\`\`

### Basic Usage

\`\`\`typescript
${documentation.quickReference.basicUsage}
\`\`\`

### Common Patterns

${documentation.quickReference.commonPatterns.map(pattern => `- ${pattern}`).join('\n')}

### Troubleshooting Quick Tips

${documentation.quickReference.troubleshooting.map(tip => `- ${tip}`).join('\n')}

### Import Patterns

\`\`\`typescript
// Individual component imports (recommended)
import { Button, Card, Input } from 'sv-project-helper';

// Category imports
import { Button } from 'sv-project-helper/atoms';
import { Card } from 'sv-project-helper/molecules';

// Type imports
import type { ButtonProps, CardProps } from 'sv-project-helper';

// Hook imports
import { useTheme, useToast } from 'sv-project-helper/hooks';
\`\`\`

---
    `.trim();

    return {
      title: 'Quick Reference',
      content,
      anchor: 'quick-reference',
      wordCount: this.countWords(content),
      crossReferences: ['installation', 'usage-patterns', 'troubleshooting']
    };
  }

  /**
   * Assemble design system documentation
   */
  private assembleDesignSystem(documentation: LLMDocumentation): AssembledSection {
    const theme = documentation.designSystem.theme;
    
    const content = this.template`
## Design System

### Theme System

The SV Project Helper UI Library uses a comprehensive CSS custom property system for theming with glassmorphism effects.

#### Color System

${theme.colorSystem.map(color => 
  `- **${color.name}**: \`${color.value}\` - ${color.description}`
).join('\n')}

#### Spacing System

${theme.spacingSystem.map(spacing => 
  `- **${spacing.name}**: \`${spacing.value}\` - ${spacing.description}`
).join('\n')}

#### Typography System

${theme.typographySystem.map(typo => 
  `- **${typo.name}**: ${typo.fontSize}/${typo.lineHeight}, weight: ${typo.fontWeight} - ${typo.description}`
).join('\n')}

#### CSS Custom Properties

\`\`\`css
:root {
${theme.customProperties.map(prop => 
  `  ${prop.name}: ${prop.defaultValue}; /* ${prop.description} */`
).join('\n')}
}
\`\`\`

### Glassmorphism Effects

${theme.glassmorphism.implementation}

#### Available Glass Effects

${theme.glassmorphism.effects.map(effect => 
  `- **${effect.name}**: \`${effect.backdropFilter}\` with \`${effect.background}\``
).join('\n')}

#### Best Practices

${theme.glassmorphism.bestPractices.map(practice => `- ${practice}`).join('\n')}

### Responsive Design

#### Breakpoints

${theme.responsive.breakpoints.map(bp => 
  `- **${bp.name}**: ${bp.minWidth}${bp.maxWidth ? ` - ${bp.maxWidth}` : '+'} - ${bp.description}`
).join('\n')}

#### Responsive Patterns

${theme.responsive.patterns.map(pattern => 
  `- **${pattern.name}**: ${pattern.description}\n  \`\`\`css\n  ${pattern.implementation}\n  \`\`\``
).join('\n\n')}

---
    `.trim();

    return {
      title: 'Design System',
      content,
      anchor: 'design-system',
      wordCount: this.countWords(content),
      crossReferences: ['theming', 'glassmorphism', 'responsive-design', 'css-variables']
    };
  }

  /**
   * Assemble components by category
   */
  private assembleComponentsByCategory(components: ComponentsByCategory): AssembledSection[] {
    const sections: AssembledSection[] = [];

    const categories = [
      { key: 'atoms', title: 'Atomic Components', description: 'Core primitive components that cannot be broken down further' },
      { key: 'molecules', title: 'Molecular Components', description: 'Composed components built from atoms' },
      { key: 'organisms', title: 'Organism Components', description: 'Complex components with multiple molecules and atoms' },
      { key: 'layouts', title: 'Layout Components', description: 'Page-level layout and container components' },
      { key: 'utils', title: 'Utility Components', description: 'Helper components for common functionality' },
      { key: 'hooks', title: 'Hooks', description: 'Svelte 5 rune-based hooks for state management' },
      { key: 'theme', title: 'Theme Components', description: 'Theming system and provider components' }
    ];

    for (const category of categories) {
      const categoryComponents = components[category.key as keyof ComponentsByCategory];
      
      if (categoryComponents.length > 0) {
        sections.push(this.assembleCategorySection(category, categoryComponents));
      }
    }

    return sections;
  }

  /**
   * Assemble individual category section
   */
  private assembleCategorySection(
    category: { key: string; title: string; description: string },
    components: ComponentDocumentation[]
  ): AssembledSection {
    const componentDocs = components.map(component => 
      this.assembleComponentDocumentation(component)
    ).join('\n\n');

    const content = this.template`
## ${category.title}

${category.description}

### Components in this category

${components.map(comp => `- [${comp.metadata.name}](#${category.key}-${comp.metadata.name.toLowerCase()})`).join('\n')}

${componentDocs}

---
    `.trim();

    return {
      title: category.title,
      content,
      anchor: category.key,
      wordCount: this.countWords(content),
      crossReferences: components.map(c => c.metadata.name.toLowerCase())
    };
  }

  /**
   * Assemble individual component documentation
   */
  private assembleComponentDocumentation(component: ComponentDocumentation): string {
    const examples = component.examples.slice(0, 2); // Limit examples for LLM optimization
    const componentId = component.metadata.name.toLowerCase();
    
    return this.template`
<!-- COMPONENT_START:${componentId} -->
### ${component.metadata.name} <!-- COMPONENT_TYPE:${component.metadata.category} -->

${component.api.props.length > 0 ? `*Category: ${component.metadata.category} | Props: ${component.api.props.length} | Events: ${component.api.events.length}* <!-- COMPONENT_STATS -->`  : ''}

#### API Reference <!-- API_SECTION -->

${component.api.props.length > 0 ? this.generatePropsTable(component.api.props) : ''}

${component.api.events.length > 0 ? `**Events:** <!-- EVENTS_LIST -->
${component.api.events.map(event => `- \`${event.name}\`: ${event.description} (\`${event.type}\`)`).join('\n')}` : ''}

${component.api.slots.length > 0 ? `**Slots:** <!-- SLOTS_LIST -->
${component.api.slots.map(slot => `- \`${slot.name}\`: ${slot.description}`).join('\n')}` : ''}

${component.api.methods.length > 0 ? `**Methods:** <!-- METHODS_LIST -->
${component.api.methods.map(method => `- \`${method.name}(${method.parameters.map(p => `${p.name}: ${p.type}`).join(', ')})\`: ${method.description}`).join('\n')}` : ''}

#### Usage Examples <!-- EXAMPLES_SECTION -->

${examples.map((example, index) => `**${example.title}** <!-- EXAMPLE_${index + 1} -->
\`\`\`${example.language} <!-- CODE_BLOCK:${example.language} -->
${example.code}
\`\`\`
${example.description ? `*${example.description}*` : ''}`).join('\n\n')}

${component.accessibility && component.accessibility.ariaAttributes && component.accessibility.ariaAttributes.length > 0 ? `#### Accessibility <!-- A11Y_SECTION -->

**ARIA Attributes:** <!-- ARIA_LIST -->
${component.accessibility.ariaAttributes.map(aria => `- \`${aria.name}\`: ${aria.description}`).join('\n')}

${component.accessibility.keyboardNavigation && component.accessibility.keyboardNavigation.length > 0 ? `**Keyboard Navigation:** <!-- KEYBOARD_NAV -->
${component.accessibility.keyboardNavigation.map(kb => `- \`${kb.key}${kb.modifiers ? '+' + kb.modifiers.join('+') : ''}\`: ${kb.description}`).join('\n')}` : ''}` : ''}

${component.bestPractices && component.bestPractices.length > 0 ? `#### Best Practices <!-- BEST_PRACTICES_SECTION -->

${component.bestPractices.map(practice => `- **${practice.title}**: ${practice.description}`).join('\n')}` : ''}

${component.relatedComponents && component.relatedComponents.length > 0 ? `#### Related Components <!-- RELATED_COMPONENTS -->

${component.relatedComponents.map(related => `- [${related}](#${related.toLowerCase()})`).join(', ')}` : ''}

<!-- COMPONENT_END:${componentId} -->
    `.trim();
  }

  /**
   * Generate props table for component
   */
  private generatePropsTable(props: any[]): string {
    if (props.length === 0) return '';

    const headers = ['Prop', 'Type', 'Required', 'Default', 'Description'];
    const rows = props.map(prop => [
      `\`${prop.name}\``,
      `\`${prop.type}\``,
      prop.required ? '✓' : '',
      prop.defaultValue !== undefined ? `\`${JSON.stringify(prop.defaultValue)}\`` : '',
      prop.description
    ]);

    const headerRow = `| ${headers.join(' | ')} |`;
    const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
    const dataRows = rows.map(row => `| ${row.join(' | ')} |`);

    return `**Props:**\n${[headerRow, separatorRow, ...dataRows].join('\n')}\n`;
  }

  /**
   * Assemble usage patterns section
   */
  private assembleUsagePatterns(documentation: LLMDocumentation): AssembledSection {
    const content = this.template`
## Usage Patterns and Best Practices

### Common Component Patterns

${documentation.patterns.map(pattern => `#### ${pattern.name}

${pattern.description}

**Components involved:** ${pattern.components.join(', ')}

\`\`\`svelte
${pattern.example}
\`\`\`

**Best Practices:**
${pattern.bestPractices.map(practice => `- ${practice}`).join('\n')}`).join('\n\n')}

### Integration Patterns

#### Theme Integration

\`\`\`svelte
<script>
  import { ThemeProvider } from 'sv-project-helper/theme';
</script>

<ThemeProvider theme="dark">
  <App />
</ThemeProvider>
\`\`\`

#### Event Handling Patterns

\`\`\`svelte
<script>
  import { Button } from 'sv-project-helper';
  
  function handleClick(event) {
    console.log('Button clicked:', event.detail);
  }
</script>

<Button onclick={handleClick}>Click me</Button>
\`\`\`

#### Form Integration

\`\`\`svelte
<script>
  import { Input, Button, Card } from 'sv-project-helper';
  
  let formData = $state({ name: '', email: '' });
  
  function handleSubmit() {
    console.log('Form data:', formData);
  }
</script>

<Card>
  <form onsubmit={handleSubmit}>
    <Input bind:value={formData.name} placeholder="Name" />
    <Input bind:value={formData.email} type="email" placeholder="Email" />
    <Button type="submit">Submit</Button>
  </form>
</Card>
\`\`\`

---
    `.trim();

    return {
      title: 'Usage Patterns',
      content,
      anchor: 'usage-patterns',
      wordCount: this.countWords(content),
      crossReferences: ['components', 'theming', 'forms', 'events']
    };
  }

  /**
   * Assemble accessibility guide
   */
  private assembleAccessibilityGuide(documentation: LLMDocumentation): AssembledSection {
    const accessibility = documentation.accessibility;
    
    const content = this.template`
## Accessibility Guide

${accessibility.overview}

### WCAG 2.1 AA Compliance

${accessibility.wcagCompliance.map(wcag => 
  `#### ${wcag.criterion} - ${wcag.description} (Level ${wcag.level})

${wcag.implementation}`
).join('\n\n')}

### Keyboard Navigation

${accessibility.keyboardNavigation.map(pattern => 
  `#### ${pattern.name}

${pattern.implementation}

**Shortcuts:**
${pattern.shortcuts.map(shortcut => `- \`${shortcut.key}${shortcut.modifiers ? '+' + shortcut.modifiers.join('+') : ''}\`: ${shortcut.description}`).join('\n')}`
).join('\n\n')}

### Screen Reader Support

${accessibility.screenReaderSupport.map(feature => 
  `- **${feature.type}**: ${feature.content} (triggered by: ${feature.trigger})`
).join('\n')}

### Best Practices

${accessibility.bestPractices.map(practice => `- ${practice}`).join('\n')}

### Testing Accessibility

\`\`\`bash
# Install accessibility testing tools
npm install --save-dev @axe-core/playwright

# Run accessibility tests
npm run test:a11y
\`\`\`

---
    `.trim();

    return {
      title: 'Accessibility',
      content,
      anchor: 'accessibility',
      wordCount: this.countWords(content),
      crossReferences: ['wcag', 'keyboard-navigation', 'screen-reader', 'aria']
    };
  }

  /**
   * Assemble troubleshooting section
   */
  private assembleTroubleshooting(documentation: LLMDocumentation): AssembledSection {
    const troubleshooting = documentation.troubleshooting;
    
    const content = this.template`
## Troubleshooting

### Common Issues

${troubleshooting.commonIssues.map(issue => 
  `#### ${issue.issue}

**Symptoms:**
${issue.symptoms.map(symptom => `- ${symptom}`).join('\n')}

**Solutions:**
${issue.solutions.map(solution => `- ${solution}`).join('\n')}

${issue.relatedComponents ? `**Related Components:** ${issue.relatedComponents.join(', ')}` : ''}`
).join('\n\n')}

### Frequently Asked Questions

${troubleshooting.faq.map(faq => 
  `#### ${faq.question}

${faq.answer}

${faq.relatedTopics ? `*Related topics: ${faq.relatedTopics.join(', ')}*` : ''}`
).join('\n\n')}

### Getting Help

- **Documentation**: ${troubleshooting.support.documentation}
- **Repository**: ${troubleshooting.support.repository}
- **Issues**: ${troubleshooting.support.issues}
- **Community**: ${troubleshooting.support.community}

### Debug Mode

\`\`\`typescript
// Enable debug mode for detailed logging
import { setDebugMode } from 'sv-project-helper/debug';

setDebugMode(true);
\`\`\`

---
    `.trim();

    return {
      title: 'Troubleshooting',
      content,
      anchor: 'troubleshooting',
      wordCount: this.countWords(content),
      crossReferences: ['debugging', 'support', 'faq']
    };
  }

  /**
   * Generate cross-references between sections
   */
  private generateCrossReferences(sections: AssembledSection[], crossReferenceMap: Map<string, string[]>): void {
    for (const section of sections) {
      const references: string[] = [];
      
      // Find references to other sections
      for (const otherSection of sections) {
        if (otherSection.anchor !== section.anchor) {
          // Check if section content mentions other sections
          const mentionsOther = section.crossReferences.some(ref => 
            otherSection.anchor.includes(ref) || otherSection.title.toLowerCase().includes(ref)
          );
          
          if (mentionsOther) {
            references.push(otherSection.anchor);
          }
        }
      }
      
      crossReferenceMap.set(section.anchor, references);
    }
  }

  /**
   * Optimize content for LLM consumption
   */
  private optimizeForLLMConsumption(sections: AssembledSection[]): void {
    for (const section of sections) {
      // Add strategic markers for LLM navigation
      section.content = this.addLLMMarkers(section.content, section.anchor);
      
      // Ensure consistent formatting
      section.content = this.normalizeFormatting(section.content);
      
      // Add section metadata for LLM context
      if (this.options.includeMetadata) {
        section.content = this.addSectionMetadata(section.content, section);
      }
      
      // Optimize section length for LLM context windows
      if (section.wordCount > this.options.maxSectionLength) {
        section.content = this.truncateSection(section.content, section.wordCount);
      }
      
      // Add strategic section breaks for better LLM parsing
      section.content = this.addStrategicBreaks(section.content);
      
      // Enhance with LLM-friendly formatting
      section.content = this.enhanceLLMFormatting(section.content);
    }
  }

  /**
   * Add LLM navigation markers
   */
  private addLLMMarkers(content: string, anchor: string): string {
    return `<!-- LLM_SECTION_START:${anchor} -->\n${content}\n<!-- LLM_SECTION_END:${anchor} -->`;
  }

  /**
   * Normalize formatting for consistency
   */
  private normalizeFormatting(content: string): string {
    return content
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
      .replace(/\s+$/gm, '') // Remove trailing whitespace
      .trim();
  }

  /**
   * Add section metadata for LLM context
   */
  private addSectionMetadata(content: string, section: AssembledSection): string {
    const metadata = `<!-- SECTION_META: words=${section.wordCount}, anchor=${section.anchor}, refs=[${section.crossReferences.join(',')}] -->`;
    return `${metadata}\n${content}`;
  }

  /**
   * Truncate section content while preserving structure
   */
  private truncateSection(content: string, wordCount: number): string {
    if (wordCount <= this.options.maxSectionLength) return content;
    
    const lines = content.split('\n');
    const targetWords = this.options.maxSectionLength * 0.8; // Leave some buffer
    let currentWords = 0;
    let truncatedLines: string[] = [];
    
    for (const line of lines) {
      const lineWords = this.countWords(line);
      if (currentWords + lineWords > targetWords) {
        truncatedLines.push('');
        truncatedLines.push('*[Content truncated for LLM optimization - see full documentation for complete details]*');
        break;
      }
      truncatedLines.push(line);
      currentWords += lineWords;
    }
    
    return truncatedLines.join('\n');
  }

  /**
   * Add strategic breaks for better LLM parsing
   */
  private addStrategicBreaks(content: string): string {
    return content
      .replace(/^(#{1,3} .+)$/gm, '\n$1\n') // Add breaks around major headings
      .replace(/^(\*\*[^*]+\*\*:)/gm, '\n$1') // Add breaks before bold labels
      .replace(/```[\s\S]*?```/g, match => `\n${match}\n`) // Ensure code blocks have breaks
      .replace(/\n{3,}/g, '\n\n'); // Normalize excessive breaks
  }

  /**
   * Enhance formatting for LLM consumption
   */
  private enhanceLLMFormatting(content: string): string {
    return content
      // Add context markers for code blocks
      .replace(/```(\w+)/g, '```$1 <!-- CODE_BLOCK:$1 -->')
      // Add markers for important sections
      .replace(/^(#### API Reference)$/gm, '$1 <!-- API_SECTION -->')
      .replace(/^(#### Usage Examples?)$/gm, '$1 <!-- EXAMPLES_SECTION -->')
      .replace(/^(#### Accessibility)$/gm, '$1 <!-- A11Y_SECTION -->')
      .replace(/^(#### Best Practices)$/gm, '$1 <!-- BEST_PRACTICES_SECTION -->')
      // Add component type indicators
      .replace(/^\*Category: (\w+)/gm, '*Category: $1* <!-- COMPONENT_TYPE:$1 -->')
      // Enhance prop tables with markers
      .replace(/^\| Prop \| Type \| Required \| Default \| Description \|$/gm, 
        '| Prop | Type | Required | Default | Description | <!-- PROPS_TABLE -->');
  }

  /**
   * Combine all sections into final markdown
   */
  private combineAllSections(sections: AssembledSection[], documentation: LLMDocumentation): string {
    const sectionContents = sections.map(section => section.content);
    const totalWords = sections.reduce((sum, section) => sum + section.wordCount, 0);
    const estimatedTokens = Math.ceil(totalWords * 1.3);
    
    const footer = this.template`

---

## Document Information <!-- DOCUMENT_META -->

<!-- LLM_OPTIMIZATION_STATS -->
- **Total Sections**: ${sections.length}
- **Total Components**: ${this.countTotalComponents(documentation.components)}
- **Total Words**: ${totalWords.toLocaleString()}
- **Estimated Tokens**: ${estimatedTokens.toLocaleString()}
- **Generated**: ${documentation.header.lastGenerated.toISOString()}
- **Version**: ${documentation.header.version}

### LLM Usage Guidelines <!-- LLM_GUIDELINES -->

**For optimal LLM interaction with this documentation:**

1. **Navigation**: Use section markers (<!-- SECTION_TYPE:name -->) to jump to specific content
2. **Component Search**: Look for <!-- COMPONENT_TYPE:category --> markers to find components by type
3. **Code Examples**: All code blocks are marked with <!-- CODE_BLOCK:language --> for context
4. **API Reference**: Props tables are marked with <!-- PROPS_TABLE --> for easy identification
5. **Cross-References**: Related components are linked with anchor tags for navigation

### Content Structure <!-- CONTENT_STRUCTURE -->

- **Header**: Library overview and architecture
- **Quick Reference**: Installation and basic usage patterns
- **Design System**: Theming, colors, and glassmorphism effects
- **Components**: Complete API reference organized by atomic design categories
- **Usage Patterns**: Common implementation patterns and best practices
- **Accessibility**: WCAG compliance guidelines and keyboard navigation
- **Troubleshooting**: Common issues and solutions

### Token Optimization <!-- TOKEN_OPTIMIZATION -->

This documentation is optimized for LLM context windows:
- Sections are limited to ${this.options.maxSectionLength} words maximum
- Redundant content is minimized while maintaining completeness
- Strategic markers enable efficient content navigation
- Code examples are concise but functional

*This documentation is optimized for Large Language Model consumption and provides comprehensive API reference for the SV Project Helper UI Library.*

<!-- LLM_DOCUMENT_END -->
    `.trim();

    return sectionContents.join('\n\n') + '\n\n' + footer;
  }

  /**
   * Generate final table of contents
   */
  private generateFinalTableOfContents(sections: AssembledSection[]): string {
    return sections
      .map(section => `- [${section.title}](#${section.anchor})`)
      .join('\n');
  }

  /**
   * Generate optimized table of contents for LLM consumption
   */
  private generateOptimizedTableOfContents(_documentation: LLMDocumentation): string {
    const sections = [
      { title: 'Quick Reference', anchor: 'quick-reference', description: 'Installation and basic usage' },
      { title: 'Design System', anchor: 'design-system', description: 'Theming and visual guidelines' },
      { title: 'Components', anchor: 'components', description: 'Complete component reference' },
      { title: 'Usage Patterns', anchor: 'usage-patterns', description: 'Common implementation patterns' },
      { title: 'Accessibility', anchor: 'accessibility', description: 'WCAG compliance guide' },
      { title: 'Troubleshooting', anchor: 'troubleshooting', description: 'Common issues and solutions' }
    ];

    return sections.map(section => 
      `- [${section.title}](#${section.anchor}) - ${section.description}`
    ).join('\n');
  }

  /**
   * Generate nested table of contents
   */
  private generateNestedTableOfContents(entries: TableOfContentsEntry[]): string {
    return entries.map(entry => {
      const indent = '  '.repeat(entry.level - 1);
      const line = `${indent}- [${entry.title}](#${entry.anchor})`;
      
      if (entry.children && entry.children.length > 0) {
        const childLines = this.generateNestedTableOfContents(entry.children);
        return `${line}\n${childLines}`;
      }
      
      return line;
    }).join('\n');
  }

  /**
   * Count components in a category
   */
  private countComponentsInCategory(components: ComponentDocumentation[]): number {
    return components ? components.length : 0;
  }

  /**
   * Generate assembly metadata
   */
  private generateMetadata(sections: AssembledSection[], documentation: LLMDocumentation): any {
    const totalWordCount = sections.reduce((sum, section) => sum + section.wordCount, 0);
    const estimatedTokens = Math.ceil(totalWordCount * 1.3); // Rough token estimation
    
    return {
      totalWordCount,
      sectionCount: sections.length,
      componentCount: this.countTotalComponents(documentation.components),
      generatedAt: new Date(),
      estimatedTokens
    };
  }

  /**
   * Count total components across all categories
   */
  private countTotalComponents(components: ComponentsByCategory): number {
    return Object.values(components).reduce((sum, categoryComponents) => sum + categoryComponents.length, 0);
  }

  /**
   * Count words in text
   */
  private countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
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
  }
}