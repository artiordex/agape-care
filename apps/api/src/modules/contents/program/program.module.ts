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
