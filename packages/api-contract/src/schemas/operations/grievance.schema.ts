/**
 * @description 민원 접수/처리 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 민원 카테고리
 */
export const GrievanceCategorySchema = z.enum(['SERVICE', 'FACILITY', 'CARE', 'BILLING', 'OTHER']);

/**
 * 민원 접수 방법
 */
export const GrievanceReceivedMethodSchema = z.enum(['PHONE', 'VISIT', 'EMAIL', 'WEBSITE']);

/**
 * 민원 상태
 */
export const GrievanceStatusSchema = z.enum(['RECEIVED', 'PROCESSING', 'RESOLVED', 'CLOSED']);

/**
 * 민원 정보
 */
export const GrievanceSchema = z.object({
  id: z.string(),
  grievanceNo: z.string(),
  complainantName: z.string(),
  complainantPhone: z.string().nullable(),
  complainantRelation: z.string().nullable(),
  residentId: z.string().nullable(),
  residentName: z.string().nullable().optional(), // 조인
  category: GrievanceCategorySchema,
  title: z.string(),
  content: z.string(),
  receivedAt: z.string(), // ISO datetime
  receivedMethod: GrievanceReceivedMethodSchema.nullable(),
  assignedTo: z.string().nullable(),
  assigneeName: z.string().nullable().optional(), // 조인
  status: GrievanceStatusSchema,
  response: z.string().nullable(),
  resolvedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 민원 생성 요청
 */
export const CreateGrievanceRequestSchema = z.object({
  complainantName: z.string().min(1, '민원인 이름은 필수입니다'),
  complainantPhone: z.string().optional(),
  complainantRelation: z.string().optional(),
  residentId: z.string().optional(),
  category: GrievanceCategorySchema,
  title: z.string().min(1, '제목은 필수입니다'),
  content: z.string().min(1, '내용은 필수입니다'),
  receivedAt: z.string().optional(), // 기본값: 현재 시각
  receivedMethod: GrievanceReceivedMethodSchema.optional(),
  assignedTo: z.string().optional(),
});

/**
 * 민원 수정 요청
 */
export const UpdateGrievanceRequestSchema = z.object({
  complainantPhone: z.string().nullable().optional(),
  complainantRelation: z.string().nullable().optional(),
  category: GrievanceCategorySchema.optional(),
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  assignedTo: z.string().nullable().optional(),
  status: GrievanceStatusSchema.optional(),
  response: z.string().nullable().optional(),
  resolvedAt: z.string().nullable().optional(),
});

/**
 * 민원 목록 조회 쿼리
 */
export const GetGrievancesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: GrievanceStatusSchema.optional(),
  category: GrievanceCategorySchema.optional(),
  residentId: z.string().optional(),
  assignedTo: z.string().optional(),
  search: z.string().optional(), // 민원인, 제목, 내용 검색
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

/**
 * 민원 목록 응답
 */
export const GetGrievancesResponseSchema = z.object({
  data: z.array(GrievanceSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 민원 통계
 */
export const GrievanceStatsSchema = z.object({
  total: z.number(),
  byStatus: z.object({
    received: z.number(),
    processing: z.number(),
    resolved: z.number(),
    closed: z.number(),
  }),
  byCategory: z.record(z.number()),
  avgResolutionDays: z.number().nullable(),
});

// Type exports
export type GrievanceCategory = z.infer<typeof GrievanceCategorySchema>;
export type GrievanceReceivedMethod = z.infer<typeof GrievanceReceivedMethodSchema>;
export type GrievanceStatus = z.infer<typeof GrievanceStatusSchema>;
export type Grievance = z.infer<typeof GrievanceSchema>;
export type CreateGrievanceRequest = z.infer<typeof CreateGrievanceRequestSchema>;
export type UpdateGrievanceRequest = z.infer<typeof UpdateGrievanceRequestSchema>;
export type GetGrievancesQuery = z.infer<typeof GetGrievancesQuerySchema>;
export type GetGrievancesResponse = z.infer<typeof GetGrievancesResponseSchema>;
export type GrievanceStats = z.infer<typeof GrievanceStatsSchema>;
