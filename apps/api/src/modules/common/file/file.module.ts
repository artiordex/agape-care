/**
 * Description : file.module.ts - 📌 파일 관리 모듈
 * Author : Agape Care AI
 */

import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
