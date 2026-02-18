/**
 * Description : visit-inquiry.module.ts - ?? web-view ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Module } from '@nestjs/common';
import { VisitReservationController } from './visit-inquiry.controller';
import { VisitReservationService } from './visit-inquiry.service';

import { QUEUE_NAMES } from '@agape-care/api-contract';
import { BullModule } from '@nestjs/bullmq';
import { NotificationModule } from '../../notification/notification.module';

@Module({
  imports: [BullModule.registerQueue({ name: QUEUE_NAMES.INQUIRY }), NotificationModule],
  controllers: [VisitReservationController],
  providers: [VisitReservationService],
})
export class VisitReservationModule {}
