/**
 * @description 휴가 신청 정보 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const LeaveTypeEnum = z.enum(['ANNUAL', 'SICK', 'OTHER']);
export const LeaveStatusEnum = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);

export const LeaveRequestSchema = z.object({
  id: z.coerce.string(),
  employeeId: z.coerce.string(),
  requestedAt: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  type: LeaveTypeEnum,
  reason: z.string().nullable().optional(),
  status: LeaveStatusEnum.default('PENDING'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type LeaveRequest = z.infer<typeof LeaveRequestSchema>;
