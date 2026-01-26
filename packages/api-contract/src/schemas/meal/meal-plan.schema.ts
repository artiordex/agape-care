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
 * 식단 항목 정보
 */
export const MealPlanItemSchema = z.object({
  id: z.string(),
  mealPlanId: z.string(),
  mealDate: z.string(), // ISO date
  mealType: MealTypeSchema,
  mainMenu: z.string(),
  sideMenu: z.string().nullable(),
  soup: z.string().nullable(),
  dessert: z.string().nullable(),
  calories: z.number().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 식단 항목 생성 요청
 */
export const CreateMealPlanItemRequestSchema = z.object({
  mealDate: z.string(), // ISO date
  mealType: MealTypeSchema,
  mainMenu: z.string().min(1, '주 메뉴는 필수입니다'),
  sideMenu: z.string().optional(),
  soup: z.string().optional(),
  dessert: z.string().optional(),
  calories: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

/**
 * 식단 항목 수정 요청
 */
export const UpdateMealPlanItemRequestSchema = z.object({
  mealDate: z.string().optional(),
  mealType: MealTypeSchema.optional(),
  mainMenu: z.string().min(1).optional(),
  sideMenu: z.string().nullable().optional(),
  soup: z.string().nullable().optional(),
  dessert: z.string().nullable().optional(),
  calories: z.number().int().positive().nullable().optional(),
  notes: z.string().nullable().optional(),
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
