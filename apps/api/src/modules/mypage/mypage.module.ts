/**
 * Description : mypage.module.ts - ?? mypage ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Module } from '@nestjs/common';
import { MyPageController } from './mypage.controller';
import { MyPageService } from './mypage.service';

@Module({
  controllers: [MyPageController],
  providers: [MyPageService],
})
export class MyPageModule {}
