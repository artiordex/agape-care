/**
 * Description : NoticesModule.ts - 📌 알림마당 모듈
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import { DatabaseModule } from '@agape-care/database';
import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';

// 알림마당 모듈
@Module({
  imports: [DatabaseModule],
  controllers: [NoticesController],
  providers: [NoticesService],
  exports: [NoticesService],
})
export class NoticesModule {}
