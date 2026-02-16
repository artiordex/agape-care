/**
 * Description : GalleryModule.ts - 📌 갤러리 관리 모듈
 * Author : (User)
 * Date : 2026-02-16
 */

import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
