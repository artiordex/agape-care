/**
 * Description : popup.module.ts - ?? contents ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@agape-care/database';
import { PopupBannerController } from './popup-banner.controller';
import { PopupBannerService } from './popup-banner.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PopupBannerController],
  providers: [PopupBannerService],
  exports: [PopupBannerService],
})
export class PopupBannerModule {}
