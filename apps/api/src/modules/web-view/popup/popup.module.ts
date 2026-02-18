/**
 * Description : popup.module.ts - ?? web-view ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-16
 */

import { DatabaseModule } from '@agape-care/database';
import { Module } from '@nestjs/common';
import { PopupController } from './popup.controller';
import { PopupService } from './popup.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PopupController],
  providers: [PopupService],
  exports: [PopupService],
})
export class PopupModule {}
