/**
 * @description 입소자 케어 플랜(수립 계획) 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const CarePlanSchema = z.object({
  id: z.coerce.string(),
  residentId: z.coerce.string(),
  createdBy: z.coerce.string().nullable().optional(),
  title: z.string().min(1, '계획 명칭은 필수입니다.'),
  goalSummary: z.string().nullable().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  status: z.enum(['ACTIVE', 'COMPLETED', 'CANCELLED']).default('ACTIVE'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CarePlan = z.infer<typeof CarePlanSchema>;
