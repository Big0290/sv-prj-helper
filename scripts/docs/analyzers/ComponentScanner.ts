/**
 * Component Scanner for discovering and categorizing Svelte components
 */

import { join, relative, basename, extname } from 'path';
import type { ComponentCategory, ComponentInfo } from '../types/index.ts';
import type { GeneratorConfig } from '../config/GeneratorConfig.ts';
import { FileUtils } from '../utils/FileUtils.ts';
import { Logger } from '../utils/Logger.ts';

export interface ComponentMetadata {
  name: string;
  filePath: string;
  relativePath: string;
  category: ComponentCategory;
  fileSize: number;
  lastModified: Date;
  isComponent: boolean;
  isHook: boolean;
  isTheme: boolean;
}

export interface ScanResult {
  components: ComponentMetadata[];
  hooks: ComponentMetadata[];
  themes: ComponentMetadata[];
  totalFiles: number;
  scanDuration: number;
  errors: string[];
}

export class ComponentScanner {
  private fileUtils: FileUtils;
  private logger: Logger;

  constructor(private config: GeneratorConfig) {
    this.fileUtils = new FileUtils(config);
    this.logger = new Logger(config.verbose);
  }

  /**
   * Scans the configured directories for components and categorizes them
   */
  async scanComponents(): Promise<ScanResult> {
    const startTime = Date.now();
    const result: ScanResult = {
      components: [],
      hooks: [],
      themes: [],
      totalFiles: 0,
      scanDuration: 0,
      errors: []
    };

    this.logger.info('Starting component discovery scan...');

    try {
      // Scan each configured component directory
      for (const directory of this.config.componentDirectories) {
        const fullPath = join(process.cwd(), directory);
        
        if (await this.fileUtils.fileExists(fullPath)) {
          this.logger.info(`Scanning directory: ${directory}`);
          const directoryResult = await this.scanDirectory(fullPath, directory);
          
          result.components.push(...directoryResult.components);
          result.hooks.push(...directoryResult.hooks);
          result.themes.push(...directoryResult.themes);
          result.totalFiles += directoryResult.totalFiles;
          result.errors.push(...directoryResult.errors);
        } else {
          const error = `Directory not found: ${directory}`;
          this.logger.warn(error);
          result.errors.push(error);
        }
      }

      // Sort components by category and name
      result.components.sort((a, b) => {
        if (a.category !== b.category) {
          return this.getCategoryOrder(a.category) - this.getCategoryOrder(b.category);
        }
        return a.name.localeCompare(b.name);
      });

      result.hooks.sort((a, b) => a.name.localeCompare(b.name));
      result.themes.sort((a, b) => a.name.localeCompare(b.name));

      result.scanDuration = Date.now() - startTime;

      this.logger.info(`Scan completed in ${result.scanDuration}ms`);
      this.logger.info(`Found ${result.components.length} components, ${result.hooks.length} hooks, ${result.themes.length} theme files`);

      if (result.errors.length > 0) {
        this.logger.warn(`Encountered ${result.errors.length} errors during scan`);
      }

    } catch (error) {
      const errorMessage = `Failed to scan components: ${error}`;
      this.logger.error(errorMessage);
      result.errors.push(errorMessage);
    }

    return result;
  }

  /**
   * Scans a specific directory for components
   */
  private async scanDirectory(directoryPath: string, relativeDirPath: string): Promise<ScanResult> {
    const result: ScanResult = {
      components: [],
      hooks: [],
      themes: [],
      totalFiles: 0,
      scanDuration: 0,
      errors: []
    };

    try {
      const files = await this.fileUtils.scanDirectory(directoryPath);
      result.totalFiles = files.length;

      for (const filePath of files) {
        try {
          const metadata = await this.analyzeFile(filePath, relativeDirPath);
          
          if (metadata) {
            if (metadata.isHook) {
              result.hooks.push(metadata);
            } else if (metadata.isTheme) {
              result.themes.push(metadata);
            } else if (metadata.isComponent) {
              result.components.push(metadata);
            }
          }
        } catch (error) {
          const errorMessage = `Failed to analyze file ${filePath}: ${error}`;
          this.logger.warn(errorMessage);
          result.errors.push(errorMessage);
        }
      }
    } catch (error) {
      const errorMessage = `Failed to scan directory ${directoryPath}: ${error}`;
      this.logger.error(errorMessage);
      result.errors.push(errorMessage);
    }

    return result;
  }

  /**
   * Analyzes a single file and extracts metadata
   */
  private async analyzeFile(filePath: string, basePath: string): Promise<ComponentMetadata | null> {
    const fileInfo = await this.fileUtils.getFileInfo(filePath);
    const relativePath = relative(join(process.cwd(), basePath), filePath);
    
    // Skip non-component files
    if (!this.isRelevantFile(fileInfo.extension)) {
      return null;
    }

    const name = this.extractComponentName(fileInfo.name);
    const category = this.fileUtils.categorizeComponent(filePath);
    
    const metadata: ComponentMetadata = {
      name,
      filePath,
      relativePath,
      category,
      fileSize: fileInfo.size,
      lastModified: fileInfo.lastModified,
      isComponent: this.isComponentFile(filePath, fileInfo.extension),
      isHook: this.isHookFile(filePath, fileInfo.name),
      isTheme: this.isThemeFile(filePath, fileInfo.name)
    };

    return metadata;
  }

  /**
   * Extracts component name from filename
   */
  private extractComponentName(fileName: string): string {
    // Remove file extension
    const nameWithoutExt = fileName.replace(/\.(svelte|ts|js|css)$/, '');
    
    // Handle hook files (remove .svelte from .svelte.ts)
    return nameWithoutExt.replace(/\.svelte$/, '');
  }

  /**
   * Checks if file extension is relevant for documentation
   */
  private isRelevantFile(extension: string): boolean {
    return ['.svelte', '.ts', '.js', '.css'].includes(extension);
  }

  /**
   * Determines if file is a Svelte component
   */
  private isComponentFile(filePath: string, extension: string): boolean {
    return extension === '.svelte' && !this.isHookFile(filePath, basename(filePath));
  }

  /**
   * Determines if file is a hook
   */
  private isHookFile(filePath: string, fileName: string): boolean {
    return (
      filePath.includes('/hooks/') ||
      fileName.startsWith('use') ||
      fileName.includes('.svelte.ts')
    );
  }

  /**
   * Determines if file is theme-related
   */
  private isThemeFile(filePath: string, fileName: string): boolean {
    return (
      filePath.includes('/theme/') ||
      fileName.includes('theme') ||
      fileName.includes('Theme') ||
      (fileName.includes('.css') && (
        fileName.includes('theme') ||
        fileName.includes('variables') ||
        fileName.includes('colors')
      ))
    );
  }

  /**
   * Gets the sort order for component categories
   */
  private getCategoryOrder(category: ComponentCategory): number {
    const order: Record<ComponentCategory, number> = {
      atom: 1,
      molecule: 2,
      organism: 3,
      layout: 4,
      util: 5,
      hook: 6,
      theme: 7
    };
    return order[category] || 999;
  }

  /**
   * Gets components by category
   */
  getComponentsByCategory(components: ComponentMetadata[]): Record<ComponentCategory, ComponentMetadata[]> {
    const categorized: Record<ComponentCategory, ComponentMetadata[]> = {
      atom: [],
      molecule: [],
      organism: [],
      layout: [],
      util: [],
      hook: [],
      theme: []
    };

    for (const component of components) {
      categorized[component.category].push(component);
    }

    return categorized;
  }

  /**
   * Filters components by specific criteria
   */
  filterComponents(
    components: ComponentMetadata[],
    criteria: {
      category?: ComponentCategory;
      namePattern?: RegExp;
      minSize?: number;
      maxSize?: number;
      modifiedAfter?: Date;
    }
  ): ComponentMetadata[] {
    return components.filter(component => {
      if (criteria.category && component.category !== criteria.category) {
        return false;
      }
      
      if (criteria.namePattern && !criteria.namePattern.test(component.name)) {
        return false;
      }
      
      if (criteria.minSize && component.fileSize < criteria.minSize) {
        return false;
      }
      
      if (criteria.maxSize && component.fileSize > criteria.maxSize) {
        return false;
      }
      
      if (criteria.modifiedAfter && component.lastModified < criteria.modifiedAfter) {
        return false;
      }
      
      return true;
    });
  }

  /**
   * Gets statistics about the scanned components
   */
  getStatistics(result: ScanResult): {
    totalComponents: number;
    componentsByCategory: Record<ComponentCategory, number>;
    averageFileSize: number;
    largestComponent: ComponentMetadata | null;
    newestComponent: ComponentMetadata | null;
  } {
    const allComponents = [...result.components, ...result.hooks, ...result.themes];
    
    const componentsByCategory: Record<ComponentCategory, number> = {
      atom: 0,
      molecule: 0,
      organism: 0,
      layout: 0,
      util: 0,
      hook: 0,
      theme: 0
    };

    let totalSize = 0;
    let largestComponent: ComponentMetadata | null = null;
    let newestComponent: ComponentMetadata | null = null;

    for (const component of allComponents) {
      componentsByCategory[component.category]++;
      totalSize += component.fileSize;
      
      if (!largestComponent || component.fileSize > largestComponent.fileSize) {
        largestComponent = component;
      }
      
      if (!newestComponent || component.lastModified > newestComponent.lastModified) {
        newestComponent = component;
      }
    }

    return {
      totalComponents: allComponents.length,
      componentsByCategory,
      averageFileSize: allComponents.length > 0 ? totalSize / allComponents.length : 0,
      largestComponent,
      newestComponent
    };
  }
}