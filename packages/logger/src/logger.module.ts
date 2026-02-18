/**
 * Description : logger.module.ts - ?? src ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Global, Module } from '@nestjs/common';
import { AgapeCareLogger, logger } from './logger.js';

@Global()
@Module({
  providers: [
    {
      provide: AgapeCareLogger,
      useValue: logger,
    },
  ],
  exports: [AgapeCareLogger],
})
export class LoggerModule {}
