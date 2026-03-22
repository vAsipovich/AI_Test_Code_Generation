// path: src/utils/logger.ts

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

/**
 * Lightweight structured logger scoped to a named context.
 * Outputs ISO timestamp, log level, context tag, and message.
 */
class Logger {
  private readonly tag: string;

  constructor(context: string) {
    this.tag = `[${context}]`;
  }

  /** Log an informational message. */
  info(message: string, ...args: unknown[]): void {
    this.emit('INFO', message, ...args);
  }

  /** Log a warning message. */
  warn(message: string, ...args: unknown[]): void {
    this.emit('WARN', message, ...args);
  }

  /** Log an error message. */
  error(message: string, ...args: unknown[]): void {
    this.emit('ERROR', message, ...args);
  }

  /** Log a debug message. Suppressed when running in CI. */
  debug(message: string, ...args: unknown[]): void {
    if (process.env.CI !== 'true') {
      this.emit('DEBUG', message, ...args);
    }
  }

  private emit(level: LogLevel, message: string, ...args: unknown[]): void {
    const ts = new Date().toISOString();
    console.log(`${ts} ${level.padEnd(5)} ${this.tag} ${message}`, ...args);
  }
}

/**
 * Factory function that creates a Logger instance scoped to the given context name.
 *
 * @param context - Identifier shown in every log line (e.g. class name).
 */
export const createLogger = (context: string): Logger => new Logger(context);
