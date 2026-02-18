/**
 * Description : operations.module.ts - ?? operations ?? ??? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Module } from '@nestjs/common';
import { CctvService } from './cctv/cctv.service';
import { GrievanceService } from './grievance/grievance.service';
import { InventoryService } from './inventory/inventory.service';
import { OperationsController } from './operations.controller';
import { SmsService } from './sms/sms.service';
import { VehicleService } from './vehicle/vehicle.service';

@Module({
  controllers: [OperationsController],
  providers: [CctvService, GrievanceService, InventoryService, SmsService, VehicleService],
})
export class OperationsModule {}
