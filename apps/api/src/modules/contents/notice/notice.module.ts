/**
 * Description : NoticeModule.ts - 📌 공지사항 모듈
 * Author : Shiwoo Min
 * Date : 2026-02-16
 */

import { DatabaseModule } from '@agape-care/database';
import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

// 공지사항 모듈
@Module({
  imports: [DatabaseModule],
  controllers: [NoticeController],
  providers: [NoticeService],
  exports: [NoticeService],
})
export class NoticeModule {}
