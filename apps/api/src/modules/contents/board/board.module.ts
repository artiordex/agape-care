/**
 * Description : board.module.ts - ?? contents ?? ??? ?? ??
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
