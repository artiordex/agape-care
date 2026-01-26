/**
 * @description 케어 플랜별 세부 항목(실행 지침) 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const CarePlanItemSchema = z.object({
  id: z.coerce.string(),
  carePlanId: z.coerce.string(),
  sequenceNo: z.number().int(),
  description: z.string().min(1, '세부 수행 내용은 필수입니다.'),
  frequency: z.string().nullable().optional(), // '매일', '주 3회' 등
  notes: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CarePlanItem = z.infer<typeof CarePlanItemSchema>;
