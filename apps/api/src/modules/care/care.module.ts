import { Module } from '@nestjs/common';
import { CareController } from './care.controller';
import { CareService } from './care.service';
import { CareConsultationService } from './consultation/consultation.service';
import { CareIncidentService } from './incident/incident.service';
import { CarePlanService } from './plan/care-plan.service';
import { CareTaskService } from './task/care-task.service';

@Module({
  controllers: [CareController],
  providers: [
    CareService, // For Daily Care
    CareConsultationService,
    CareIncidentService,
    CarePlanService,
    CareTaskService,
  ],
})
export class CareModule {}
