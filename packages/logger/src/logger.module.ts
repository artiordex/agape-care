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
