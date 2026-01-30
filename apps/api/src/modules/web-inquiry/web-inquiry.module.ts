import { Module } from '@nestjs/common';
import { WebInquiryController } from './web-inquiry.controller';
import { WebInquiryService } from './web-inquiry.service';

@Module({
  controllers: [WebInquiryController],
  providers: [WebInquiryService],
})
export class WebInquiryModule {}
