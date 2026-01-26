/**
 * @description 입소자 투약 정보 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 투약 정보
 */
export const ResidentMedicationSchema = z.object({
  id: z.string(),
  residentId: z.string(),
  prescribedBy: z.string().nullable(),
  drugName: z.string(),
  dosage: z.string(),
  schedule: z.string().nullable(), // '1-0-1' 형식
  startDate: z.string(), // ISO date
  endDate: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 투약 정보 생성 요청
 */
export const CreateMedicationRequestSchema = z.object({
  prescribedBy: z.string().optional(),
  drugName: z.string().min(1, '약품명은 필수입니다'),
  dosage: z.string().min(1, '용량은 필수입니다'),
  schedule: z.string().optional(),
  startDate: z.string(), // ISO date
  endDate: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * 투약 정보 수정 요청
 */
export const UpdateMedicationRequestSchema = z.object({
  prescribedBy: z.string().optional(),
  drugName: z.string().min(1).optional(),
  dosage: z.string().min(1).optional(),
  schedule: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * 투약 정보 목록 조회 쿼리
 */
export const GetMedicationsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  active: z.coerce.boolean().optional(), // 현재 복용 중인 약만
  search: z.string().optional(), // 약품명 검색
});

/**
 * 투약 정보 목록 응답
 */
export const GetMedicationsResponseSchema = z.object({
  data: z.array(ResidentMedicationSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

// Type exports
export type ResidentMedication = z.infer<typeof ResidentMedicationSchema>;
export type CreateMedicationRequest = z.infer<typeof CreateMedicationRequestSchema>;
export type UpdateMedicationRequest = z.infer<typeof UpdateMedicationRequestSchema>;
export type GetMedicationsQuery = z.infer<typeof GetMedicationsQuerySchema>;
export type GetMedicationsResponse = z.infer<typeof GetMedicationsResponseSchema>;
