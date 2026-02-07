/**
 * @description Meal API Contract
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';
import {
  CreateMealPlanRequestSchema,
  UpdateMealPlanRequestSchema,
  GetMealPlansQuerySchema,
  GetMealPlansResponseSchema,
  MealPlanSchema,
  CreateMealPlanItemRequestSchema,
  UpdateMealPlanItemRequestSchema,
  GetMealPlanItemsQuerySchema,
  GetMealPlanItemsResponseSchema,
  WeeklyMealPlanSchema,
  GetCurrentWeekMealPlanQuerySchema,
} from '../schemas/meal/index.js';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

const errorResponse = (statusCode: number) =>
  z.object({
    message: z.string(),
    error: z.string().optional(),
    statusCode: z.literal(statusCode),
  });

export const mealContract = {
  // ==================== MealPlan ====================
  /**
   * GET /api/meal-plans
   * 식단표 목록 조회
   */
  getMealPlans: {
    method: 'GET' as const,
    path: '/api/meal-plans',
    query: GetMealPlansQuerySchema,
    responses: {
      200: GetMealPlansResponseSchema,
    },
    summary: '식단표 목록 조회',
    headers: authHeader,
  },

  /**
   * GET /api/meal-plans/:id
   * 식단표 상세 조회
   */
  getMealPlan: {
    method: 'GET' as const,
    path: '/api/meal-plans/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: MealPlanSchema,
      404: errorResponse(404),
    },
    summary: '식단표 상세 조회',
    headers: authHeader,
  },

  /**
   * GET /api/meal-plans/current-week
   * 현재 주 식단표 조회
   */
  getCurrentWeekMealPlan: {
    method: 'GET' as const,
    path: '/api/meal-plans/current-week',
    query: GetCurrentWeekMealPlanQuerySchema,
    responses: {
      200: WeeklyMealPlanSchema,
      404: errorResponse(404),
    },
    summary: '현재 주 식단표 조회',
    headers: authHeader,
  },

  /**
   * POST /api/meal-plans
   * 식단표 생성
   */
  createMealPlan: {
    method: 'POST' as const,
    path: '/api/meal-plans',
    body: CreateMealPlanRequestSchema,
    responses: {
      201: MealPlanSchema,
      400: errorResponse(400),
      409: errorResponse(409),
    },
    summary: '식단표 생성',
    headers: authHeader,
  },

  /**
   * PATCH /api/meal-plans/:id
   * 식단표 수정
   */
  updateMealPlan: {
    method: 'PATCH' as const,
    path: '/api/meal-plans/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: UpdateMealPlanRequestSchema,
    responses: {
      200: MealPlanSchema,
      404: errorResponse(404),
    },
    summary: '식단표 수정',
    headers: authHeader,
  },

  /**
   * DELETE /api/meal-plans/:id
   * 식단표 삭제
   */
  deleteMealPlan: {
    method: 'DELETE' as const,
    path: '/api/meal-plans/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '식단표 삭제',
    headers: authHeader,
  },

  // ==================== MealPlanItem ====================
  /**
   * GET /api/meal-plans/:mealPlanId/items
   * 식단 항목 목록 조회
   */
  getMealPlanItems: {
    method: 'GET' as const,
    path: '/api/meal-plans/:mealPlanId/items',
    pathParams: z.object({
      mealPlanId: z.string(),
    }),
    query: GetMealPlanItemsQuerySchema,
    responses: {
      200: GetMealPlanItemsResponseSchema,
    },
    summary: '식단 항목 목록 조회',
    headers: authHeader,
  },

  /**
   * POST /api/meal-plans/:mealPlanId/items
   * 식단 항목 생성
   */
  createMealPlanItem: {
    method: 'POST' as const,
    path: '/api/meal-plans/:mealPlanId/items',
    pathParams: z.object({
      mealPlanId: z.string(),
    }),
    body: CreateMealPlanItemRequestSchema,
    responses: {
      201: z.any(), // MealPlanItemSchema
      400: errorResponse(400),
    },
    summary: '식단 항목 생성',
    headers: authHeader,
  },

  /**
   * PATCH /api/meal-plans/:mealPlanId/items/:id
   * 식단 항목 수정
   */
  updateMealPlanItem: {
    method: 'PATCH' as const,
    path: '/api/meal-plans/:mealPlanId/items/:id',
    pathParams: z.object({
      mealPlanId: z.string(),
      id: z.string(),
    }),
    body: UpdateMealPlanItemRequestSchema,
    responses: {
      200: z.any(), // MealPlanItemSchema
      404: errorResponse(404),
    },
    summary: '식단 항목 수정',
    headers: authHeader,
  },

  /**
   * DELETE /api/meal-plans/:mealPlanId/items/:id
   * 식단 항목 삭제
   */
  deleteMealPlanItem: {
    method: 'DELETE' as const,
    path: '/api/meal-plans/:mealPlanId/items/:id',
    pathParams: z.object({
      mealPlanId: z.string(),
      id: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '식단 항목 삭제',
    headers: authHeader,
  },
} as const;

export type MealContract = typeof mealContract;
