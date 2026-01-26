/**
 * @description 요양보호사 전용 업무(태스크) 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const CareTaskSchema = z.object({
  id: z.coerce.string(),
  residentId: z.coerce.string(),
  assignedTo: z.coerce.string().nullable().optional(),
  dueAt: z.coerce.date().nullable().optional(),
  title: z.string().min(1, '업무 명칭은 필수입니다.'),
  description: z.string().nullable().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED']).default('PENDING'),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH']).default('NORMAL'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CareTask = z.infer<typeof CareTaskSchema>;
