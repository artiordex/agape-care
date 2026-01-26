/**
 * @description 직원 교육 이력 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 교육 카테고리
 */
export const EducationCategorySchema = z.enum(['SAFETY', 'CARE', 'COMPLIANCE', 'OTHER']);

/**
 * 교육 완료 상태
 */
export const EducationCompletionStatusSchema = z.enum(['COMPLETED', 'INCOMPLETE', 'CANCELLED']);

/**
 * 직원 교육 이력
 */
export const EmployeeEducationSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  employeeName: z.string().optional(), // 조인
  educationDate: z.string(), // ISO date
  title: z.string(),
  category: EducationCategorySchema.nullable(),
  durationHours: z.number().nullable(),
  instructor: z.string().nullable(),
  completionStatus: EducationCompletionStatusSchema,
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 교육 이력 생성 요청
 */
export const CreateEducationRequestSchema = z.object({
  employeeId: z.string(),
  educationDate: z.string(), // ISO date
  title: z.string().min(1, '교육명은 필수입니다'),
  category: EducationCategorySchema.optional(),
  durationHours: z.number().positive().optional(),
  instructor: z.string().optional(),
  completionStatus: EducationCompletionStatusSchema.default('COMPLETED'),
  notes: z.string().optional(),
});

/**
 * 교육 이력 수정 요청
 */
export const UpdateEducationRequestSchema = z.object({
  educationDate: z.string().optional(),
  title: z.string().min(1).optional(),
  category: EducationCategorySchema.nullable().optional(),
  durationHours: z.number().positive().nullable().optional(),
  instructor: z.string().nullable().optional(),
  completionStatus: EducationCompletionStatusSchema.optional(),
  notes: z.string().nullable().optional(),
});

/**
 * 교육 이력 목록 조회 쿼리
 */
export const GetEducationsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  employeeId: z.string().optional(),
  category: EducationCategorySchema.optional(),
  completionStatus: EducationCompletionStatusSchema.optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

/**
 * 교육 이력 목록 응답
 */
export const GetEducationsResponseSchema = z.object({
  data: z.array(EmployeeEducationSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 교육 통계
 */
export const EducationStatsSchema = z.object({
  total: z.number(),
  completed: z.number(),
  incomplete: z.number(),
  cancelled: z.number(),
  totalHours: z.number(),
  byCategory: z.record(z.number()),
  byEmployee: z.array(
    z.object({
      employeeId: z.string(),
      employeeName: z.string(),
      completedCount: z.number(),
      totalHours: z.number(),
    }),
  ),
});

// Type exports
export type EducationCategory = z.infer<typeof EducationCategorySchema>;
export type EducationCompletionStatus = z.infer<typeof EducationCompletionStatusSchema>;
export type EmployeeEducation = z.infer<typeof EmployeeEducationSchema>;
export type CreateEducationRequest = z.infer<typeof CreateEducationRequestSchema>;
export type UpdateEducationRequest = z.infer<typeof UpdateEducationRequestSchema>;
export type GetEducationsQuery = z.infer<typeof GetEducationsQuerySchema>;
export type GetEducationsResponse = z.infer<typeof GetEducationsResponseSchema>;
export type EducationStats = z.infer<typeof EducationStatsSchema>;
