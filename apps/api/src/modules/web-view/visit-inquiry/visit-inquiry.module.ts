import { Module } from '@nestjs/common';
import { VisitReservationController } from './visit-inquiry.controller';
import { VisitReservationService } from './visit-inquiry.service';

@Module({
  controllers: [VisitReservationController],
  providers: [VisitReservationService],
})
export class VisitReservationModule {}
