import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { LeaveService } from './leave/leave.service';
import { ShiftService } from './shift/shift.service';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, LeaveService, ShiftService],
})
export class AttendanceModule {}
