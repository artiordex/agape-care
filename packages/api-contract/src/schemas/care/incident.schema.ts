/**
 * @description 사건/사고 보고서 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const IncidentSchema = z.object({
  id: z.coerce.string(),
  residentId: z.coerce.string().nullable().optional(),
  reportedBy: z.coerce.string().nullable().optional(),
  occurredAt: z.coerce.date(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  title: z.string().min(1, '사고 명칭은 필수입니다.'),
  description: z.string().min(1, '사고 경위는 필수입니다.'),
  location: z.string().nullable().optional(),
  status: z.enum(['OPEN', 'IN_REVIEW', 'CLOSED']).default('OPEN'),
  actionTaken: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Incident = z.infer<typeof IncidentSchema>;
