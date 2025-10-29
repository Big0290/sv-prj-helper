/**
 * File system utilities for the documentation generator
 */

import { readdir, readFile, stat, access } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import type { GeneratorConfig } from '../config/GeneratorConfig.ts';

export class FileUtils {
  constructor(private config: GeneratorConfig) {}

  /**
   * Recursively scans a directory for files matching the configured patterns
   */
  async scanDirectory(directory: string): Promise<string[]> {
    const files: string[] = [];
    
    try {
      const entries = await readdir(directory, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(directory, entry.name);
        
        if (entry.isDirectory()) {
          if (!this.isExcluded(fullPath)) {
            const subFiles = await this.scanDirectory(fullPath);
            files.push(...subFiles);
          }
        } else if (entry.isFile()) {
          if (this.isIncluded(fullPath) && !this.isExcluded(fullPath)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      if (this.config.verbose) {
        console.warn(`Warning: Could not scan directory ${directory}:`, error);
      }
    }
    
    return files;
  }

  /**
   * Reads a file and returns its content
   */
  async readFile(filePath: string): Promise<string> {
    try {
      const stats = await stat(filePath);
      
      if (stats.size > this.config.maxFileSize) {
        throw new Error(`File ${filePath} exceeds maximum size limit`);
      }
      
      return await readFile(filePath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error}`);
    }
  }

  /**
   * Writes content to a file
   */
  async writeToFile(filePath: string, content: string): Promise<void> {
    const { writeFile } = await import('fs/promises');
    const { dirname } = await import('path');
    const { mkdir } = await import('fs/promises');
    
    try {
      // Ensure directory exists
      await mkdir(dirname(filePath), { recursive: true });
      
      // Write file
      await writeFile(filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write file ${filePath}: ${error}`);
    }
  }

  /**
   * Checks if a file exists and is accessible
   */
  async fileExists(filePath: string): Promise<boolean> {
    try {
      await access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets file information
   */
  async getFileInfo(filePath: string): Promise<{
    name: string;
    extension: string;
    directory: string;
    size: number;
    lastModified: Date;
  }> {
    const stats = await stat(filePath);
    
    return {
      name: basename(filePath),
      extension: extname(filePath),
      directory: dirname(filePath),
      size: stats.size,
      lastModified: stats.mtime
    };
  }

  /**
   * Categorizes a component based on its file path
   */
  categorizeComponent(filePath: string): 'atom' | 'molecule' | 'organism' | 'layout' | 'util' | 'hook' | 'theme' {
    const normalizedPath = filePath.toLowerCase();
    
    if (normalizedPath.includes('/atoms/')) return 'atom';
    if (normalizedPath.includes('/molecules/')) return 'molecule';
    if (normalizedPath.includes('/organisms/')) return 'organism';
    if (normalizedPath.includes('/layouts/')) return 'layout';
    if (normalizedPath.includes('/utils/')) return 'util';
    if (normalizedPath.includes('/hooks/')) return 'hook';
    if (normalizedPath.includes('/theme/')) return 'theme';
    
    // Default categorization based on file location
    if (normalizedPath.includes('/ui/')) return 'atom';
    
    return 'util';
  }

  /**
   * Checks if a file path matches the include patterns
   */
  private isIncluded(filePath: string): boolean {
    return this.config.includePatterns.some(pattern => 
      this.matchesPattern(filePath, pattern)
    );
  }

  /**
   * Checks if a file path matches the exclude patterns
   */
  private isExcluded(filePath: string): boolean {
    return this.config.excludePatterns.some(pattern => 
      this.matchesPattern(filePath, pattern)
    );
  }

  /**
   * Simple glob pattern matching
   */
  private matchesPattern(filePath: string, pattern: string): boolean {
    // Convert glob pattern to regex
    const regexPattern = pattern
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*')
      .replace(/\?/g, '.');
    
    const regex = new RegExp(regexPattern);
    return regex.test(filePath);
  }
}