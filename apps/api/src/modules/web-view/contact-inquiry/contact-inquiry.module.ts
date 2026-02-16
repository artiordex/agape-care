import { Module } from '@nestjs/common';
import { ContactInquiryController } from './contact-inquiry.controller';
import { WebInquiryService } from './contact-inquiry.service';

@Module({
  controllers: [ContactInquiryController],
  providers: [WebInquiryService],
})
export class WebInquiryModule {}
