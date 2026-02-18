/**
 * Description : health.module.ts - ?? health ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
