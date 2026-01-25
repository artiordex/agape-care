/**
 * Description: console.ts - 📌 콘솔 트랜스포트 (간소화)
 * Author: Shiwoo Min
 * Date: 2026-01-24
 */
import type { Transport, LogRecord, LogLevel } from './logger-types.js';
import { levelWeight } from './logger-types.js';

export function ConsoleTransport(minLevel: LogLevel = 'info'): Transport {
  const min = levelWeight(minLevel);

  return {
    log(rec: LogRecord) {
      if (levelWeight(rec.level) < min) return;

      const timestamp = rec.timestamp || new Date().toISOString();
      const line = `[${timestamp}] ${rec.level.toUpperCase()} [${rec.category}] ${rec.message}`;

      console.log(line);

      if (rec.error) {
        console.error('  Error:', rec.error.message);
        if (rec.error.stack) console.error(rec.error.stack);
      }
    },

    async flush() {
      // stdout flush
    },
  };
}
