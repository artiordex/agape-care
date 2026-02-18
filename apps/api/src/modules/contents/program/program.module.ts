/**
 * Description : program.module.ts - ?? contents ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@agape-care/database';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProgramController],
  providers: [ProgramService],
  exports: [ProgramService],
})
export class ProgramModule {}
