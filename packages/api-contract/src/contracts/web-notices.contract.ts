/**
 * @description Content(공지, 게시판, 갤러리) 관리 API Contract
 * @author Shiwoo Min
 * @date 2026-01-27
 */

import { z } from 'zod';
import { ApiResponseSchema } from '../schemas/common/response.schema.js';
import { BoardPostSchema, GalleryItemSchema, NoticeSchema } from '../schemas/contents/index.js';
import { MealPlanSchema } from '../schemas/meal/index.js';
import { ProgramScheduleSchema } from '../schemas/program/index.js';

export const webpageContract = {
  /**
   * [공지사항] GET /notices/announcement
   * 전체 공지사항 목록 조회 (활성화된 공지만 조회하는 필터 포함)
   */
  getNotices: {
    method: 'GET' as const,
    path: '/notices/announcement',
    query: z.object({
      category: z.string().optional(),
      isActive: z.coerce.boolean().optional(),
    }),
    responses: {
      200: ApiResponseSchema(z.array(NoticeSchema)),
    },
  },

  /**
   * [공지사항] GET /notices/announcement/:id
   * 특정 공지사항 상세 정보 조회
   */
  getNotice: {
    method: 'GET' as const,
    path: '/notices/announcement/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ApiResponseSchema(NoticeSchema),
    },
  },

  /**
   * [게시판] GET /notices/board
   * 게시판 키('FREE', 'QNA' 등)에 따른 게시글 목록 조회
   */
  getPosts: {
    method: 'GET' as const,
    path: '/notices/board',
    query: z.object({
      boardKey: z.string().optional(),
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(10),
    }),
    responses: {
      200: ApiResponseSchema(z.array(BoardPostSchema)),
    },
  },

  /**
   * [게시판] GET /notices/board/:id
   * 특정 게시글 상세 정보 및 조회수 증가
   */
  getPost: {
    method: 'GET' as const,
    path: '/notices/board/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ApiResponseSchema(BoardPostSchema),
    },
  },

  /**
   * [갤러리] GET /notices/gallery
   * 갤러리/행사 사진 목록 조회
   */
  getGalleryItems: {
    method: 'GET' as const,
    path: '/notices/gallery',
    responses: {
      200: ApiResponseSchema(z.array(GalleryItemSchema)),
    },
  },

  /**
   * [갤러리] GET /notices/gallery/:id
   * 특정 갤러리/행사 사진 상세 정보 조회
   */
  getGalleryItem: {
    method: 'GET' as const,
    path: '/notices/gallery/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ApiResponseSchema(GalleryItemSchema),
    },
  },

  /**
   * [식단표] GET /notices/meal-plan
   * 식단표 목록 조회
   */
  getMealPlans: {
    method: 'GET' as const,
    path: '/notices/meal-plan',
    query: z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(20),
    }),
    responses: {
      200: z.object({
        data: z.array(
          MealPlanSchema.extend({
            creator: z
              .object({
                id: z.string(),
                name: z.string(),
              })
              .nullable()
              .optional(),
            dailyMeals: z.array(
              z.object({
                id: z.string(),
                mealPlanId: z.string(),
                date: z.string(),
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
              }),
            ),
          }),
        ),
        total: z.number(),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
      }),
    },
  },

  /**
   * [프로그램 일정] GET /notices/program-schedule
   * 프로그램 일정 목록 조회
   */
  getProgramSchedules: {
    method: 'GET' as const,
    path: '/notices/program-schedule',
    responses: {
      200: ApiResponseSchema(z.array(ProgramScheduleSchema)),
    },
  },
} as const;

// Contract 타입 추출
export type WebpageContract = typeof webpageContract;
