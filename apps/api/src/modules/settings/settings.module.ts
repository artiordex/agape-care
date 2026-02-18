/**
 * Description : settings.module.ts - ?? settings ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
