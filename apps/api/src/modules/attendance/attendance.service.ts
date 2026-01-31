import { attendanceContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async checkIn(data: z.infer<typeof attendanceContract.checkIn.body>) {
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

    return this.serializeAttendanceRecord(record);
  }

  async checkOut(data: z.infer<typeof attendanceContract.checkOut.body>) {
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
      throw new NotFoundException('출근 기록을 찾을 수 없습니다.');
    }

    const updated = await this.prisma.attendanceRecord.update({
      where: { id: record.id },
      data: {
        checkOutAt: new Date(),
      },
    });

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
