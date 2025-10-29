/**
 * Logging utility for the documentation generator
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  constructor(
    private verbose: boolean = false,
    private showProgress: boolean = true
  ) {}

  debug(message: string, ...args: any[]): void {
    if (this.verbose) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    console.info(`[INFO] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  error(message: string, error?: any): void {
    console.error(`[ERROR] ${message}`, error);
  }

  progress(current: number, total: number, message: string): void {
    if (this.showProgress) {
      const percentage = Math.round((current / total) * 100);
      const progressBar = this.createProgressBar(percentage);
      console.log(`${progressBar} ${percentage}% - ${message}`);
    }
  }

  success(message: string): void {
    console.log(`✅ ${message}`);
  }

  private createProgressBar(percentage: number, width: number = 20): string {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    return `[${'█'.repeat(filled)}${' '.repeat(empty)}]`;
  }
}