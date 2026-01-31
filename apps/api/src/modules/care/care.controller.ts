import { careContract } from '@agape-care/api-contract';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CareService } from './care.service';
import { CareConsultationService } from './consultation/consultation.service';
import { CareIncidentService } from './incident/incident.service';
import { CarePlanService } from './plan/care-plan.service';
import { CareTaskService } from './task/care-task.service';

@Controller()
export class CareController {
  constructor(
    private readonly careService: CareService,
    private readonly careConsultationService: CareConsultationService,
    private readonly careIncidentService: CareIncidentService,
    private readonly carePlanService: CarePlanService,
    private readonly careTaskService: CareTaskService,
  ) {}

  // Daily Care
  @Get(careContract.getDailyCare.path)
  async getDailyCare(
    @Query(new ZodValidationPipe(careContract.getDailyCare.query))
    query: any,
  ) {
    return this.careService.getDailyCare(query);
  }

  @Post(careContract.saveDailyCare.path)
  async saveDailyCare(
    @Body(new ZodValidationPipe(careContract.saveDailyCare.body))
    body: any,
  ) {
    return this.careService.saveDailyCare(body);
  }

  // Care Plans
  @Get(careContract.getCarePlans.path)
  async getCarePlans(
    @Query(new ZodValidationPipe(careContract.getCarePlans.query))
    query: any,
  ) {
    return this.carePlanService.getCarePlans(query);
  }

  @Post(careContract.createCarePlan.path)
  async createCarePlan(
    @Body(new ZodValidationPipe(careContract.createCarePlan.body))
    body: any,
  ) {
    return this.carePlanService.createCarePlan(body);
  }

  // Consultations
  @Post(careContract.createConsultation.path)
  async createConsultation(
    @Body(new ZodValidationPipe(careContract.createConsultation.body))
    body: any,
  ) {
    return this.careConsultationService.createConsultation(body);
  }

  // Incidents
  @Get(careContract.getIncidents.path)
  async getIncidents(
    @Query(new ZodValidationPipe(careContract.getIncidents.query))
    query: any,
  ) {
    return this.careIncidentService.getIncidents(query);
  }

  @Patch(careContract.updateIncidentStatus.path.replace(':id', ':id'))
  async updateIncidentStatus(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(careContract.updateIncidentStatus.body))
    body: any,
  ) {
    return this.careIncidentService.updateIncidentStatus(id, body);
  }

  // Care Tasks
  @Get(careContract.getCareTasks.path)
  async getCareTasks(
    @Query(new ZodValidationPipe(careContract.getCareTasks.query))
    query: any,
  ) {
    return this.careTaskService.getCareTasks(query);
  }

  @Patch(careContract.updateCareTaskStatus.path.replace(':id', ':id'))
  async updateCareTaskStatus(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(careContract.updateCareTaskStatus.body))
    body: any,
  ) {
    return this.careTaskService.updateCareTaskStatus(id, body);
  }
}
