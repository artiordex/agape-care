/**
 * @description 식단 항목(요일별 식사) 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 식사 유형
 */
export const MealTypeSchema = z.enum(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK']);

/**
 * 일별 식단 항목 정보 (DailyMeal)
 */
export const MealPlanItemSchema = z.object({
  id: z.string(),
  mealPlanId: z.string(),
  date: z.string(), // ISO date
  breakfast: z.string().nullable(),
  breakfastImage: z.string().nullable(),
  morningSnack: z.string().nullable(),
  lunch: z.string().nullable(),
  lunchImage: z.string().nullable(),
  afternoonSnack: z.string().nullable(),
  dinner: z.string().nullable(),
  dinnerImage: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 일별 식단 생성 요청
 */
export const CreateMealPlanItemRequestSchema = z.object({
  date: z.string(), // ISO date
  breakfast: z.string().optional(),
  breakfastImage: z.string().optional(),
  morningSnack: z.string().optional(),
  lunch: z.string().optional(),
  lunchImage: z.string().optional(),
  afternoonSnack: z.string().optional(),
  dinner: z.string().optional(),
  dinnerImage: z.string().optional(),
});

/**
 * 일별 식단 수정 요청
 */
export const UpdateMealPlanItemRequestSchema = z.object({
  date: z.string().optional(),
  breakfast: z.string().nullable().optional(),
  breakfastImage: z.string().nullable().optional(),
  morningSnack: z.string().nullable().optional(),
  lunch: z.string().nullable().optional(),
  lunchImage: z.string().nullable().optional(),
  afternoonSnack: z.string().nullable().optional(),
  dinner: z.string().nullable().optional(),
  dinnerImage: z.string().nullable().optional(),
});

/**
 * 식단 항목 목록 조회 쿼리
 */
export const GetMealPlanItemsQuerySchema = z.object({
  mealPlanId: z.string(),
  mealType: MealTypeSchema.optional(),
  mealDate: z.string().optional(), // 특정 날짜
});

/**
 * 식단 항목 목록 응답
 */
export const GetMealPlanItemsResponseSchema = z.array(MealPlanItemSchema);

/**
 * 일별 식단 정보 (하루 전체 식사)
 */
export const DailyMealSchema = z.object({
  date: z.string(), // ISO date
  meals: z.object({
    breakfast: MealPlanItemSchema.nullable(),
    lunch: MealPlanItemSchema.nullable(),
    dinner: MealPlanItemSchema.nullable(),
    snack: MealPlanItemSchema.nullable(),
  }),
  totalCalories: z.number().nullable(),
});

/**
 * 주간 식단 조회 응답
 */
export const WeeklyMealPlanSchema = z.object({
  mealPlan: z.any(), // MealPlanSchema
  dailyMeals: z.array(DailyMealSchema),
  weekStartDate: z.string(),
  weekEndDate: z.string(),
});

/**
 * 식단 복사 요청
 */
export const CopyMealPlanItemsRequestSchema = z.object({
  sourceMealPlanId: z.string(),
  targetMealPlanId: z.string(),
  overwrite: z.boolean().default(false), // 기존 항목 덮어쓰기 여부
});

// Type exports
export type MealType = z.infer<typeof MealTypeSchema>;
export type MealPlanItem = z.infer<typeof MealPlanItemSchema>;
export type CreateMealPlanItemRequest = z.infer<typeof CreateMealPlanItemRequestSchema>;
export type UpdateMealPlanItemRequest = z.infer<typeof UpdateMealPlanItemRequestSchema>;
export type GetMealPlanItemsQuery = z.infer<typeof GetMealPlanItemsQuerySchema>;
export type GetMealPlanItemsResponse = z.infer<typeof GetMealPlanItemsResponseSchema>;
export type DailyMeal = z.infer<typeof DailyMealSchema>;
export type WeeklyMealPlan = z.infer<typeof WeeklyMealPlanSchema>;
export type CopyMealPlanItemsRequest = z.infer<typeof CopyMealPlanItemsRequestSchema>;
