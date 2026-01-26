/**
 * @description 직원 일일 출퇴근 기록 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const AttendanceStatusEnum = z.enum(['PRESENT', 'ABSENT', 'LATE', 'ON_LEAVE']);

export const AttendanceRecordSchema = z.object({
  id: z.coerce.string(),
  employeeId: z.coerce.string(),
  workDate: z.coerce.date(),
  checkInAt: z.coerce.date().nullable().optional(),
  checkOutAt: z.coerce.date().nullable().optional(),
  status: AttendanceStatusEnum.default('PRESENT'),
  notes: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AttendanceRecord = z.infer<typeof AttendanceRecordSchema>;
