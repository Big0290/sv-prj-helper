import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { generateComponentReadme } from './templates.js';
import { createComponentDocumentation } from './parser.js';
/**
 * Generate documentation for all components in the library
 */
export async function generateAllDocumentation(srcPath = 'src/lib/components') {
    const registry = {};
    const categories = new Map();
    try {
        await processDirectory(srcPath, registry, categories);
        const metadata = {
            version: '1.0.0',
            lastUpdated: new Date().toISOString(),
            components: registry,
            categories: Array.from(categories.entries()).map(([name, components]) => ({
                name,
                description: getCategoryDescription(name),
                components
            })),
            totalComponents: Object.keys(registry).length
        };
        return metadata;
    }
    catch (error) {
        console.error('Error generating documentation:', error);
        throw error;
    }
}
/**
 * Process a directory recursively to find and document components
 */
async function processDirectory(dirPath, registry, categories) {
    try {
        const entries = await readdir(dirPath);
        for (const entry of entries) {
            const fullPath = join(dirPath, entry);
            const stats = await stat(fullPath);
            if (stats.isDirectory()) {
                // Check if this is a component directory (contains .svelte file)
                const componentFiles = await readdir(fullPath);
                const svelteFile = componentFiles.find(f => f.endsWith('.svelte'));
                if (svelteFile) {
                    // This is a component directory
                    await processComponent(fullPath, entry, registry, categories);
                }
                else {
                    // Continue recursing
                    await processDirectory(fullPath, registry, categories);
                }
            }
        }
    }
    catch (error) {
        console.warn(`Could not process directory ${dirPath}:`, error);
    }
}
/**
 * Process a single component directory
 */
async function processComponent(componentPath, componentName, registry, categories) {
    try {
        const files = await readdir(componentPath);
        // Find component files
        const svelteFile = files.find(f => f.endsWith('.svelte'));
        const typesFile = files.find(f => f.endsWith('.types.ts'));
        const indexFile = files.find(f => f === 'index.ts');
        if (!svelteFile)
            return;
        // Read component content
        const componentContent = await readFile(join(componentPath, svelteFile), 'utf-8');
        // Read types content if available
        let typeContent = '';
        if (typesFile) {
            typeContent = await readFile(join(componentPath, typesFile), 'utf-8');
        }
        // Determine category from path
        const category = determineCategoryFromPath(componentPath);
        const importPath = generateImportPath(componentPath, componentName);
        // Create documentation
        const documentation = createComponentDocumentation(componentName, category, importPath, typeContent, componentContent);
        // Generate README
        const readmeContent = generateComponentReadme(documentation);
        await writeFile(join(componentPath, 'README.md'), readmeContent);
        // Add to registry
        registry[componentName] = {
            path: componentPath,
            category,
            exports: [componentName],
            dependencies: extractDependencies(componentContent),
            documentation
        };
        // Add to category
        if (!categories.has(category)) {
            categories.set(category, []);
        }
        categories.get(category).push(componentName);
        console.log(`Generated documentation for ${componentName}`);
    }
    catch (error) {
        console.error(`Error processing component ${componentName}:`, error);
    }
}
/**
 * Update documentation for a specific component
 */
export async function updateComponentDocumentation(componentPath, componentName, customDescription) {
    try {
        const files = await readdir(componentPath);
        const svelteFile = files.find(f => f.endsWith('.svelte'));
        const typesFile = files.find(f => f.endsWith('.types.ts'));
        if (!svelteFile) {
            throw new Error(`No Svelte component found in ${componentPath}`);
        }
        // Read files
        const componentContent = await readFile(join(componentPath, svelteFile), 'utf-8');
        let typeContent = '';
        if (typesFile) {
            typeContent = await readFile(join(componentPath, typesFile), 'utf-8');
        }
        // Generate documentation
        const category = determineCategoryFromPath(componentPath);
        const importPath = generateImportPath(componentPath, componentName);
        const documentation = createComponentDocumentation(componentName, category, importPath, typeContent, componentContent, customDescription);
        // Generate and write README
        const readmeContent = generateComponentReadme(documentation);
        await writeFile(join(componentPath, 'README.md'), readmeContent);
        console.log(`Updated documentation for ${componentName}`);
        return documentation;
    }
    catch (error) {
        console.error(`Error updating documentation for ${componentName}:`, error);
        return null;
    }
}
/**
 * Validate that all components have proper documentation
 */
export async function validateDocumentation(srcPath = 'src/lib/components') {
    const issues = [];
    try {
        const registry = {};
        const categories = new Map();
        await processDirectory(srcPath, registry, categories);
        for (const [componentName, component] of Object.entries(registry)) {
            const readmePath = join(component.path, 'README.md');
            try {
                const readmeContent = await readFile(readmePath, 'utf-8');
                // Check for required sections
                const requiredSections = ['## Overview', '## Props', '## Accessibility', '## Examples'];
                for (const section of requiredSections) {
                    if (!readmeContent.includes(section)) {
                        issues.push(`${componentName}: Missing ${section} section`);
                    }
                }
                // Check if props documentation matches actual props
                if (component.documentation.props.length > 0) {
                    const hasPropsTable = readmeContent.includes('| Name | Type | Default | Required | Description |');
                    if (!hasPropsTable) {
                        issues.push(`${componentName}: Props table not found or malformed`);
                    }
                }
            }
            catch (error) {
                issues.push(`${componentName}: README.md not found or unreadable`);
            }
        }
    }
    catch (error) {
        issues.push(`Error validating documentation: ${error}`);
    }
    return issues;
}
// Helper functions
function determineCategoryFromPath(componentPath) {
    if (componentPath.includes('/atoms/'))
        return 'atoms';
    if (componentPath.includes('/molecules/'))
        return 'molecules';
    if (componentPath.includes('/organisms/'))
        return 'organisms';
    if (componentPath.includes('/layouts/'))
        return 'layouts';
    if (componentPath.includes('/utils/'))
        return 'utils';
    if (componentPath.includes('/hooks/'))
        return 'hooks';
    if (componentPath.includes('/theme/'))
        return 'theme';
    return 'atoms'; // default
}
function generateImportPath(componentPath, componentName) {
    // Generate import path based on library structure
    if (componentPath.includes('src/lib/components/')) {
        return '@sv-project-helper/ui';
    }
    return `@sv-project-helper/ui/${componentName}`;
}
function extractDependencies(componentContent) {
    const dependencies = [];
    // Extract import statements
    const importMatches = componentContent.matchAll(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/g);
    for (const [, importPath] of importMatches) {
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
            // Local imports
            const componentMatch = importPath.match(/\/(\w+)(?:\.svelte)?$/);
            if (componentMatch) {
                dependencies.push(componentMatch[1]);
            }
        }
    }
    return dependencies;
}
function getCategoryDescription(category) {
    const descriptions = {
        atoms: 'Basic building blocks and primitive components',
        molecules: 'Composed components built from atoms',
        organisms: 'Complex components with multiple molecules and atoms',
        layouts: 'Layout and structural components',
        utils: 'Utility components for common functionality',
        hooks: 'Svelte 5 runes-based hooks and composables',
        theme: 'Theme and styling related components'
    };
    return descriptions[category] || 'Component category';
}
