import { Module } from '@nestjs/common';
import { BoardService } from './board/board.service';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { PopupService } from './popup/popup.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, BoardService, PopupService],
  exports: [ContentService, BoardService, PopupService],
})
export class ContentModule {}
