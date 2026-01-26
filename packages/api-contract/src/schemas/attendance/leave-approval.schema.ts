/**
 * @description 휴가 승인/반려 이력 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const LeaveApprovalSchema = z.object({
  id: z.coerce.string(),
  leaveRequestId: z.coerce.string(),
  approvedBy: z.coerce.string().nullable().optional(), // 승인자 ID
  approvedAt: z.coerce.date().nullable().optional(),
  decision: z.enum(['APPROVED', 'REJECTED']),
  comment: z.string().nullable().optional(),
  createdAt: z.date(),
});

export type LeaveApproval = z.infer<typeof LeaveApprovalSchema>;
