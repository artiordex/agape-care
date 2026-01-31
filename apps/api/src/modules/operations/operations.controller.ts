import { operationsContract } from '@agape-care/api-contract';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CctvService } from './cctv/cctv.service';
import { GrievanceService } from './grievance/grievance.service';
import { InventoryService } from './inventory/inventory.service';
import { SmsService } from './sms/sms.service';
import { VehicleService } from './vehicle/vehicle.service';

@Controller()
export class OperationsController {
  constructor(
    private readonly cctvService: CctvService,
    private readonly grievanceService: GrievanceService,
    private readonly inventoryService: InventoryService,
    private readonly smsService: SmsService,
    private readonly vehicleService: VehicleService,
  ) {}

  // ==================== Vehicle ====================
  @Get(operationsContract.getVehicles.path)
  async getVehicles(
    @Query(new ZodValidationPipe(operationsContract.getVehicles.query))
    query: any,
  ) {
    return this.vehicleService.getVehicles(query);
  }

  // ==================== Inventory ====================
  @Get(operationsContract.getInventoryItems.path)
  async getInventoryItems(
    @Query(new ZodValidationPipe(operationsContract.getInventoryItems.query))
    query: any,
  ) {
    return this.inventoryService.getInventoryItems(query);
  }

  // ==================== CCTV ====================
  @Get(operationsContract.getCctvDevices.path)
  async getCctvDevices(
    @Query(new ZodValidationPipe(operationsContract.getCctvDevices.query))
    query: any,
  ) {
    return this.cctvService.getCctvDevices(query);
  }

  @Get(operationsContract.getCctvViewLogs.path)
  async getCctvViewLogs(
    @Query(new ZodValidationPipe(operationsContract.getCctvViewLogs.query))
    query: any,
  ) {
    return this.cctvService.getCctvViewLogs(query);
  }

  // ==================== Grievance ====================
  @Get(operationsContract.getGrievances.path)
  async getGrievances(
    @Query(new ZodValidationPipe(operationsContract.getGrievances.query))
    query: any,
  ) {
    return this.grievanceService.getGrievances(query);
  }

  // ==================== SMS ====================
  @Post(operationsContract.sendSms.path)
  async sendSms(@Body(new ZodValidationPipe(operationsContract.sendSms.body)) body: any) {
    return this.smsService.sendSms(body);
  }

  @Get(operationsContract.getSmsLogs.path)
  async getSmsLogs(
    @Query(new ZodValidationPipe(operationsContract.getSmsLogs.query))
    query: any,
  ) {
    return this.smsService.getSmsLogs(query);
  }
}
