import { Module } from '@nestjs/common';
import { NoticesModule } from '../web-view/notices/notices.module';
import { ContentsController } from './contents.controller';
import { ContentService } from './contents.service';
import { PopupService } from './popup/popup.service';

@Module({
  imports: [NoticesModule],
  controllers: [ContentsController],
  providers: [ContentService, PopupService],
  exports: [ContentService, PopupService],
})
export class ContentModule {}
