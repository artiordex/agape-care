import { Module } from '@nestjs/common';
import { ContactService } from './contact/contact.service';
import { ResidentController } from './resident.controller';
import { ResidentService } from './resident.service';

@Module({
  controllers: [ResidentController],
  providers: [ResidentService, ContactService],
})
export class ResidentModule {}
