/**
 * Description : inquiry.module.ts - 📌 상담 및 면회 문의 통합 모듈
 * Author : (User)
 * Date : 2026-02-16
 */

import { Module } from '@nestjs/common';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';

@Module({
  controllers: [InquiryController],
  providers: [InquiryService],
  exports: [InquiryService],
})
export class InquiryModule {}
