/**
 * Description : BoardModule.ts - 📌 게시판 모듈
 * Author : (User)
 * Date : 2026-02-16
 */

import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
