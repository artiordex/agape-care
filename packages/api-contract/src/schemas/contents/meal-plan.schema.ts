/**
 * @description 식단표 스키마
 * @author Shiwoo Min
 * @date 2026-02-15
 */
import { z } from 'zod';

export const MealTypeSchema = z.enum(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK']);
export type MealType = z.infer<typeof MealTypeSchema>;

export const MealPlanItemSchema = z.object({
  id: z.coerce.string(),
  mealPlanId: z.coerce.string(),
  date: z.string().or(z.date().transform(d => d.toISOString().split('T')[0])), // YYYY-MM-DD
  breakfast: z.string().optional().nullable(),
  breakfastImage: z.string().optional().nullable(),
  morningSnack: z.string().optional().nullable(),
  lunch: z.string().optional().nullable(),
  lunchImage: z.string().optional().nullable(),
  afternoonSnack: z.string().optional().nullable(),
  dinner: z.string().optional().nullable(),
  dinnerImage: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type MealPlanItem = z.infer<typeof MealPlanItemSchema>;

export const MealPlanSchema = z.object({
  id: z.coerce.string(),
  facilityCode: z.string().default('DEFAULT'),
  weekStartDate: z.string().or(z.date().transform(d => d.toISOString().split('T')[0])), // YYYY-MM-DD
  mealMonth: z.number().default(202601),
  status: z.string().default('DRAFT'),
  nutritionManager: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdBy: z.coerce.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  creator: z
    .object({
      id: z.coerce.string(),
      name: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  dailyMeals: z.array(MealPlanItemSchema).optional().nullable(),
});

export type MealPlan = z.infer<typeof MealPlanSchema>;
export const WebMealPlanSchema = MealPlanSchema;
export type WebMealPlan = MealPlan;
