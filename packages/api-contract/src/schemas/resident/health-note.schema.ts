/**
 * @description 입소자 건강 노트 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 건강 노트 타입
 */
export const HealthNoteTypeSchema = z.enum([
  'GENERAL',
  'NUTRITION',
  'MOBILITY',
  'MENTAL',
  'SKIN',
  'MEDICATION',
  'OTHER',
]);

/**
 * 건강 노트
 */
export const ResidentHealthNoteSchema = z.object({
  id: z.string(),
  residentId: z.string(),
  recordedBy: z.string().nullable(),
  recordedByName: z.string().nullable(), // 기록자 이름 (조인)
  noteType: HealthNoteTypeSchema,
  content: z.string(),
  createdAt: z.string(),
});

/**
 * 건강 노트 생성 요청
 */
export const CreateHealthNoteRequestSchema = z.object({
  noteType: HealthNoteTypeSchema.default('GENERAL'),
  content: z.string().min(1, '내용은 필수입니다'),
});

/**
 * 건강 노트 목록 조회 쿼리
 */
export const GetHealthNotesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  noteType: HealthNoteTypeSchema.optional(),
  startDate: z.string().optional(), // ISO date
  endDate: z.string().optional(),
});

/**
 * 건강 노트 목록 응답
 */
export const GetHealthNotesResponseSchema = z.object({
  data: z.array(ResidentHealthNoteSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

// Type exports
export type HealthNoteType = z.infer<typeof HealthNoteTypeSchema>;
export type ResidentHealthNote = z.infer<typeof ResidentHealthNoteSchema>;
export type CreateHealthNoteRequest = z.infer<typeof CreateHealthNoteRequestSchema>;
export type GetHealthNotesQuery = z.infer<typeof GetHealthNotesQuerySchema>;
export type GetHealthNotesResponse = z.infer<typeof GetHealthNotesResponseSchema>;
