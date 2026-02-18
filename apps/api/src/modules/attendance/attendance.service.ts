/**
 * Description : attendance.service.ts - ?? attendance ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { attendanceContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { AgapeCareLogger } from '@agape-care/logger';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AgapeCareLogger,
  ) {}

  async checkIn(data: z.infer<typeof attendanceContract.checkIn.body>) {
    this.logger.info('출근 체크인 요청', { category: 'ATTENDANCE', metadata: { employeeId: data.employeeId, workDate: data.workDate } });
    const { employeeId, workDate, notes } = data;

    // 이미 출근 기록이 있는지 확인
    const existing = await this.prisma.attendanceRecord.findUnique({
      where: {
        employeeId_workDate: {
          employeeId: BigInt(employeeId),
          workDate: new Date(workDate),
        },
      },
    });

    if (existing) {
      this.logger.warn('체크인 실패 - 중복 기록', { category: 'ATTENDANCE', metadata: { employeeId: data.employeeId, workDate: data.workDate } });
      throw new BadRequestException('이미 출근 기록이 존재합니다.');
    }

    const record = await this.prisma.attendanceRecord.create({
      data: {
        employeeId: BigInt(employeeId),
        workDate: new Date(workDate),
        checkInAt: new Date(),
        status: 'PRESENT', // 기본값
        notes,
      },
    });

    this.logger.info('체크인 완료', { category: 'ATTENDANCE', metadata: { employeeId: data.employeeId } });
    return this.serializeAttendanceRecord(record);
  }

  async checkOut(data: z.infer<typeof attendanceContract.checkOut.body>) {
    this.logger.info('퇴근 체크아웃 요청', { category: 'ATTENDANCE', metadata: { employeeId: data.employeeId, workDate: data.workDate } });
    const { employeeId, workDate } = data;

    const record = await this.prisma.attendanceRecord.findUnique({
      where: {
        employeeId_workDate: {
          employeeId: BigInt(employeeId),
          workDate: new Date(workDate),
        },
      },
    });

    if (!record) {
      this.logger.warn('체크아웃 실패 - 출근 기록 없음', { category: 'ATTENDANCE', metadata: { employeeId: data.employeeId, workDate: data.workDate } });
      throw new NotFoundException('출근 기록을 찾을 수 없습니다.');
    }

    const updated = await this.prisma.attendanceRecord.update({
      where: { id: record.id },
      data: {
        checkOutAt: new Date(),
      },
    });

    this.logger.info('체크아웃 완료', { category: 'ATTENDANCE', metadata: { employeeId: data.employeeId } });
    return this.serializeAttendanceRecord(updated);
  }

  /* --- Serializers (BigInt Handling) --- */

  private serializeAttendanceRecord(record: Prisma.AttendanceRecordGetPayload<object>) {
    return {
      ...record,
      id: record.id.toString(),
      employeeId: record.employeeId.toString(),
      // Date 객체는 JSON 응답 시 자동으로 ISO string 변환됨
    };
  }
}
