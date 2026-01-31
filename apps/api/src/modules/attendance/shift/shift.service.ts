import { attendanceContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async getShiftAssignments(query: z.infer<typeof attendanceContract.getShiftAssignments.query>) {
    const { employeeId, startDate, endDate } = query;

    const where: Prisma.ShiftAssignmentWhereInput = {
      workDate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    };

    if (employeeId) {
      where.employeeId = BigInt(employeeId);
    }

    const shifts = await this.prisma.shiftAssignment.findMany({
      where,
      include: {
        shiftTemplate: true,
      },
      orderBy: { workDate: 'asc' },
    });

    return shifts.map(this.serializeShiftAssignment);
  }

  async getShiftTemplates() {
    const templates = await this.prisma.shiftTemplate.findMany({
      orderBy: { startTime: 'asc' },
    });
    return templates.map(this.serializeShiftTemplate);
  }

  private serializeShiftAssignment(shift: Prisma.ShiftAssignmentGetPayload<{ include: { shiftTemplate: true } }>) {
    return {
      ...shift,
      id: shift.id.toString(),
      employeeId: shift.employeeId.toString(),
      shiftTemplateId: shift.shiftTemplateId?.toString() || null,
      shiftTemplate: shift.shiftTemplate ? this.serializeShiftTemplate(shift.shiftTemplate) : null,
    };
  }

  private serializeShiftTemplate(template: Prisma.ShiftTemplateGetPayload<object>) {
    return {
      ...template,
      id: template.id.toString(),
    };
  }
}
