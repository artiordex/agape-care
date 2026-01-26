/**
 * @description 시설 안전 점검 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 점검 유형
 */
export const InspectionTypeSchema = z.enum(['FIRE', 'SAFETY', 'HYGIENE', 'REGULAR']);

/**
 * 점검 상태
 */
export const InspectionStatusSchema = z.enum(['PENDING', 'COMPLETED', 'FOLLOW_UP']);

/**
 * 시설 점검 정보
 */
export const FacilityInspectionSchema = z.object({
  id: z.string(),
  inspectionDate: z.string(), // ISO date
  inspectionType: InspectionTypeSchema,
  inspectorId: z.string().nullable(),
  inspectorName: z.string().nullable().optional(), // 조인
  location: z.string().nullable(),
  checklist: z.record(z.unknown()).nullable(), // JSON 체크리스트
  findings: z.string().nullable(), // 지적사항
  correctiveActions: z.string().nullable(), // 시정조치
  status: InspectionStatusSchema,
  nextInspectionDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 점검 생성 요청
 */
export const CreateInspectionRequestSchema = z.object({
  inspectionDate: z.string(), // ISO date
  inspectionType: InspectionTypeSchema,
  inspectorId: z.string().optional(),
  location: z.string().optional(),
  checklist: z.record(z.unknown()).optional(),
  findings: z.string().optional(),
  correctiveActions: z.string().optional(),
  status: InspectionStatusSchema.default('PENDING'),
  nextInspectionDate: z.string().optional(),
});

/**
 * 점검 수정 요청
 */
export const UpdateInspectionRequestSchema = z.object({
  inspectionDate: z.string().optional(),
  inspectionType: InspectionTypeSchema.optional(),
  inspectorId: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  checklist: z.record(z.unknown()).nullable().optional(),
  findings: z.string().nullable().optional(),
  correctiveActions: z.string().nullable().optional(),
  status: InspectionStatusSchema.optional(),
  nextInspectionDate: z.string().nullable().optional(),
});

/**
 * 점검 목록 조회 쿼리
 */
export const GetInspectionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  inspectionType: InspectionTypeSchema.optional(),
  status: InspectionStatusSchema.optional(),
  inspectorId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

/**
 * 점검 목록 응답
 */
export const GetInspectionsResponseSchema = z.object({
  data: z.array(FacilityInspectionSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 점검 통계
 */
export const InspectionStatsSchema = z.object({
  total: z.number(),
  byType: z.record(z.number()),
  byStatus: z.object({
    pending: z.number(),
    completed: z.number(),
    followUp: z.number(),
  }),
  upcomingCount: z.number(), // 예정된 점검
});

// Type exports
export type InspectionType = z.infer<typeof InspectionTypeSchema>;
export type InspectionStatus = z.infer<typeof InspectionStatusSchema>;
export type FacilityInspection = z.infer<typeof FacilityInspectionSchema>;
export type CreateInspectionRequest = z.infer<typeof CreateInspectionRequestSchema>;
export type UpdateInspectionRequest = z.infer<typeof UpdateInspectionRequestSchema>;
export type GetInspectionsQuery = z.infer<typeof GetInspectionsQuerySchema>;
export type GetInspectionsResponse = z.infer<typeof GetInspectionsResponseSchema>;
export type InspectionStats = z.infer<typeof InspectionStatsSchema>;
