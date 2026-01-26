/**
 * @description 상담 및 면담 기록 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const ConsultationRecordSchema = z.object({
  id: z.coerce.string(),
  residentId: z.coerce.string(),
  counselorId: z.coerce.string().nullable().optional(),
  consultedAt: z.coerce.date(),
  type: z.string().default('GENERAL'), // 'FAMILY', 'NURSE' 등
  channel: z.string().nullable().optional(), // 'IN_PERSON', 'PHONE' 등
  summary: z.string().min(1, '상담 요약은 필수입니다.'),
  details: z.string().nullable().optional(),
  followUpDate: z.coerce.date().nullable().optional(),
  createdAt: z.date(),
});

export type ConsultationRecord = z.infer<typeof ConsultationRecordSchema>;
