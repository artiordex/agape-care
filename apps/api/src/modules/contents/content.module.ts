import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement/announcement.service';
import { BoardService } from './board/board.service';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { GalleryService } from './gallery/gallery.service';
import { PopupService } from './popup/popup.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, PopupService, BoardService, AnnouncementService, GalleryService],
  exports: [ContentService, PopupService, BoardService, AnnouncementService, GalleryService],
})
export class ContentModule {}
