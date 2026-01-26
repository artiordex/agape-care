/**
 * @description 직원별 실제 근무 배정 정보 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const ShiftAssignmentSchema = z.object({
  id: z.coerce.string(),
  employeeId: z.coerce.string(),
  workDate: z.coerce.date(),
  shiftTemplateId: z.coerce.string().nullable().optional(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ShiftAssignment = z.infer<typeof ShiftAssignmentSchema>;
