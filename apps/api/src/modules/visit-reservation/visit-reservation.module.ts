import { Module } from '@nestjs/common';
import { VisitReservationController } from './visit-reservation.controller';
import { VisitReservationService } from './visit-reservation.service';

@Module({
  controllers: [VisitReservationController],
  providers: [VisitReservationService],
})
export class VisitReservationModule {}
