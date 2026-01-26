/**
 * @description 식단표(주간 식단) 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 식단표 상태
 */
export const MealPlanStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

/**
 * 식단표 정보 (주간 식단표 헤더)
 */
export const MealPlanSchema = z.object({
  id: z.string(),
  facilityCode: z.string(),
  weekStartDate: z.string(), // ISO date (해당 주의 월요일)
  createdBy: z.string().nullable(),
  createdByName: z.string().nullable().optional(), // 조인
  status: MealPlanStatusSchema,
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 식단표 생성 요청
 */
export const CreateMealPlanRequestSchema = z.object({
  facilityCode: z.string().default('DEFAULT'),
  weekStartDate: z.string(), // ISO date
  status: MealPlanStatusSchema.default('DRAFT'),
  notes: z.string().optional(),
});

/**
 * 식단표 수정 요청
 */
export const UpdateMealPlanRequestSchema = z.object({
  status: MealPlanStatusSchema.optional(),
  notes: z.string().nullable().optional(),
});

/**
 * 식단표 목록 조회 쿼리
 */
export const GetMealPlansQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  facilityCode: z.string().optional(),
  status: MealPlanStatusSchema.optional(),
  startDate: z.string().optional(), // 기간 검색
  endDate: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

/**
 * 식단표 목록 응답
 */
export const GetMealPlansResponseSchema = z.object({
  data: z.array(MealPlanSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 식단표 상세 응답 (식단 항목 포함)
 */
export const MealPlanDetailSchema = MealPlanSchema.extend({
  items: z.array(z.any()).optional(), // MealPlanItemSchema
  itemCount: z.number().optional(),
});

/**
 * 현재 주 식단표 조회 쿼리
 */
export const GetCurrentWeekMealPlanQuerySchema = z.object({
  facilityCode: z.string().default('DEFAULT'),
  date: z.string().optional(), // 기준 날짜 (기본값: 오늘)
});

// Type exports
export type MealPlanStatus = z.infer<typeof MealPlanStatusSchema>;
export type MealPlan = z.infer<typeof MealPlanSchema>;
export type CreateMealPlanRequest = z.infer<typeof CreateMealPlanRequestSchema>;
export type UpdateMealPlanRequest = z.infer<typeof UpdateMealPlanRequestSchema>;
export type GetMealPlansQuery = z.infer<typeof GetMealPlansQuerySchema>;
export type GetMealPlansResponse = z.infer<typeof GetMealPlansResponseSchema>;
export type MealPlanDetail = z.infer<typeof MealPlanDetailSchema>;
export type GetCurrentWeekMealPlanQuery = z.infer<typeof GetCurrentWeekMealPlanQuerySchema>;
