import { attendanceContract } from '@agape-care/api-contract';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AttendanceService } from './attendance.service';
import { LeaveService } from './leave/leave.service';
import { ShiftService } from './shift/shift.service';

@Controller()
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly leaveService: LeaveService,
    private readonly shiftService: ShiftService,
  ) {}

  @Post(attendanceContract.checkIn.path)
  async checkIn(
    @Body(new ZodValidationPipe(attendanceContract.checkIn.body))
    body: any,
  ) {
    return this.attendanceService.checkIn(body);
  }

  @Post(attendanceContract.checkOut.path)
  async checkOut(
    @Body(new ZodValidationPipe(attendanceContract.checkOut.body))
    body: any,
  ) {
    return this.attendanceService.checkOut(body);
  }

  @Get(attendanceContract.getShiftAssignments.path)
  async getShiftAssignments(
    @Query(new ZodValidationPipe(attendanceContract.getShiftAssignments.query))
    query: any,
  ) {
    return this.shiftService.getShiftAssignments(query);
  }

  @Post(attendanceContract.createLeaveRequest.path)
  async createLeaveRequest(
    @Body(new ZodValidationPipe(attendanceContract.createLeaveRequest.body))
    body: any,
  ) {
    return this.leaveService.createLeaveRequest(body);
  }

  @Patch(attendanceContract.approveLeaveRequest.path.replace(':id', ':id'))
  async approveLeaveRequest(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(attendanceContract.approveLeaveRequest.body))
    body: any,
  ) {
    return this.leaveService.approveLeaveRequest(id, body);
  }

  @Get(attendanceContract.getShiftTemplates.path)
  async getShiftTemplates() {
    return this.shiftService.getShiftTemplates();
  }
}
