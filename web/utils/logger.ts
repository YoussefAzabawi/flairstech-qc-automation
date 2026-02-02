export class Logger {
  constructor(private readonly scope: string) {}

  info(message: string, extra?: unknown): void {
    // In real projects, plug into a structured logger
    console.log(`[${this.scope}] ${message}`, extra ?? '');
  }

  error(message: string, extra?: unknown): void {
    console.error(`[${this.scope}] ${message}`, extra ?? '');
  }
}

