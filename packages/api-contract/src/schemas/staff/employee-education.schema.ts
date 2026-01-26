/**
 * @description 직원 교육 이력 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const EmployeeEducationSchema = z.object({
  id: z.coerce.string(),
  employeeId: z.coerce.string(),
  educationDate: z.coerce.date(),
  title: z.string().min(1, '교육명은 필수입니다.'),
  category: z.string().nullable().optional(), // 'SAFETY', 'CARE' 등
  durationHours: z.coerce.number().nullable().optional(),
  instructor: z.string().nullable().optional(),
  completionStatus: z.enum(['COMPLETED', 'INCOMPLETE', 'CANCELLED']).default('COMPLETED'),
  notes: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type EmployeeEducation = z.infer<typeof EmployeeEducationSchema>;
