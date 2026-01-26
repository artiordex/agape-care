import { LoggerService } from '@nestjs/common';
import { AgapeCareLogger } from './logger.js';
import type { LogCategory } from './logger-types.js';

export class NestLoggerAdapter implements LoggerService {
  private logger: AgapeCareLogger;

  constructor() {
    this.logger = new AgapeCareLogger();
  }

  log(message: any, context?: string) {
    this.logger.info(String(message), {
      category: (context as LogCategory) || 'SYSTEM',
      metadata: { context },
    });
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error(String(message), {
      category: (context as LogCategory) || 'SYSTEM',
      metadata: { context, trace },
      error: trace ? new Error(trace) : undefined,
    });
  }

  warn(message: any, context?: string) {
    this.logger.warn(String(message), {
      category: (context as LogCategory) || 'SYSTEM',
      metadata: { context },
    });
  }

  debug(message: any, context?: string) {
    this.logger.debug(String(message), {
      category: (context as LogCategory) || 'SYSTEM',
      metadata: { context },
    });
  }

  verbose(message: any, context?: string) {
    this.logger.debug(String(message), {
      category: (context as LogCategory) || 'SYSTEM',
      metadata: { context },
    });
  }
}
