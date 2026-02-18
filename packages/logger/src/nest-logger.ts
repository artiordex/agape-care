/**
 * Description : nest-logger.ts - ?? nest-logger ?? ?? ??
 * Author: Shiwoo Min
 * Date: 2026-01-24
 */

import { LoggerService } from '@nestjs/common';
import type { LogCategory } from './logger-types.js';
import { AgapeCareLogger } from './logger.js';

export class NestLoggerAdapter implements LoggerService {
  private readonly logger: AgapeCareLogger;

  constructor(logger?: AgapeCareLogger) {
    this.logger = logger || new AgapeCareLogger();
  }

  /**
   * 유효한 LogCategory인지 검증
   */
  private isValidCategory(context?: string): context is LogCategory {
    const categories: LogCategory[] = [
      'SYSTEM',
      'AUTH',
      'RESIDENT',
      'HEALTH',
      'MEDICATION',
      'INCIDENT',
      'CARE',
      'ATTENDANCE',
      'ACCOUNTING',
      'AUDIT',
      'PRIVACY',
    ];
    return context ? categories.includes(context as LogCategory) : false;
  }

  /**
   * 메시지 정규화
   */
  private normalizeMessage(message: any): string {
    if (typeof message === 'string') {
      return message;
    }
    if (message instanceof Error) {
      return message.message;
    }
    try {
      return JSON.stringify(message);
    } catch {
      return String(message);
    }
  }

  log(message: any, context?: string) {
    const msg = this.normalizeMessage(message);
    const category = this.isValidCategory(context) ? context : 'SYSTEM';

    this.logger.info(msg, {
      category,
      metadata: { context },
    });
  }

  error(message: any, trace?: string, context?: string) {
    const msg = this.normalizeMessage(message);
    const category = this.isValidCategory(context) ? context : 'SYSTEM';

    this.logger.error(msg, {
      category,
      metadata: { context, trace },
      error: trace ? new Error(trace) : undefined,
    });
  }

  warn(message: any, context?: string) {
    const msg = this.normalizeMessage(message);
    const category = this.isValidCategory(context) ? context : 'SYSTEM';

    this.logger.warn(msg, {
      category,
      metadata: { context },
    });
  }

  debug(message: any, context?: string) {
    const msg = this.normalizeMessage(message);
    const category = this.isValidCategory(context) ? context : 'SYSTEM';

    this.logger.debug(msg, {
      category,
      metadata: { context },
    });
  }

  verbose(message: any, context?: string) {
    const msg = this.normalizeMessage(message);
    const category = this.isValidCategory(context) ? context : 'SYSTEM';

    this.logger.debug(msg, {
      category,
      metadata: { context, level: 'verbose' },
    });
  }
}
