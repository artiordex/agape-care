import { residentContract } from '@agape-care/api-contract';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ResidentService } from './resident.service';

@Controller()
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Get(residentContract.getResidents.path)
  async getResidents(
    @Query(new ZodValidationPipe(residentContract.getResidents.query))
    query: any,
  ) {
    return this.residentService.getResidents(query);
  }

  @Get(residentContract.getResidentStats.path)
  async getResidentStats() {
    return this.residentService.getResidentStats();
  }

  @Get(residentContract.getResident.path.replace(':id', ':id'))
  async getResident(@Param('id') id: string) {
    return this.residentService.getResident(id);
  }

  @Post(residentContract.createResident.path)
  async createResident(
    @Body(new ZodValidationPipe(residentContract.createResident.body))
    body: any,
  ) {
    return this.residentService.createResident(body);
  }

  @Patch(residentContract.updateResident.path.replace(':id', ':id'))
  async updateResident(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(residentContract.updateResident.body))
    body: any,
  ) {
    return this.residentService.updateResident(id, body);
  }

  @Delete(residentContract.deleteResident.path.replace(':id', ':id'))
  async deleteResident(@Param('id') id: string) {
    return this.residentService.deleteResident(id);
  }
}
