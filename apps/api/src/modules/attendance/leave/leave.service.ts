import { attendanceContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class LeaveService {
  constructor(private readonly prisma: PrismaService) {}

  async createLeaveRequest(data: z.infer<typeof attendanceContract.createLeaveRequest.body>) {
    const request = await this.prisma.leaveRequest.create({
      data: {
        employeeId: BigInt(data.employeeId),
        type: data.type,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        reason: data.reason,
        status: 'PENDING',
      },
    });

    return this.serializeLeaveRequest(request);
  }

  async approveLeaveRequest(id: string, data: z.infer<typeof attendanceContract.approveLeaveRequest.body>) {
    const { approvedBy, decision, comment } = data;

    // 트랜잭션으로 처리: 승인 정보 생성 + 요청 상태 업데이트
    const result = await this.prisma.$transaction(async tx => {
      const leaveRequest = await tx.leaveRequest.findUnique({
        where: { id: BigInt(id) },
      });

      if (!leaveRequest) {
        throw new NotFoundException('휴가 신청 내역을 찾을 수 없습니다.');
      }

      // 승인/반려 이력 생성
      const approval = await tx.leaveApproval.create({
        data: {
          leaveRequestId: BigInt(id),
          approvedBy: BigInt(approvedBy),
          decision: decision,
          comment: comment,
          approvedAt: new Date(),
        },
      });

      // 휴가 요청 상태 업데이트
      await tx.leaveRequest.update({
        where: { id: BigInt(id) },
        data: {
          status: decision, // APPROVED or REJECTED
        },
      });

      return approval;
    });

    return this.serializeLeaveApproval(result);
  }

  private serializeLeaveRequest(request: Prisma.LeaveRequestGetPayload<object>) {
    return {
      ...request,
      id: request.id.toString(),
      employeeId: request.employeeId.toString(),
    };
  }

  private serializeLeaveApproval(approval: Prisma.LeaveApprovalGetPayload<object>) {
    return {
      ...approval,
      id: approval.id.toString(),
      leaveRequestId: approval.leaveRequestId.toString(),
      approvedBy: approval.approvedBy?.toString() || null,
    };
  }
}
