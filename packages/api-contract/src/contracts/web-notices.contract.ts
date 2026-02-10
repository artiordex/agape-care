/**
 * @description Content(공지, 게시판, 갤러리) 관리 API Contract
 * @author Shiwoo Min
 * @date 2026-01-27
 */

import { z } from 'zod';
import { ApiResponseSchema, PaginatedResponseSchema } from '../schemas/common/response.schema.js';
import {
  BoardCommentBaseSchema,
  BoardCommentSchema,
  BoardPostSchema,
  GalleryItemSchema,
  NoticeSchema,
} from '../schemas/contents/index.js';
import { MealPlanSchema } from '../schemas/meal/index.js';
import { ProgramScheduleSchema } from '../schemas/program/index.js';

export const webpageContract = {
  /**
   * [공지사항] GET /notices/notice
   * 전체 공지사항 목록 조회 (활성화된 공지만 조회하는 필터 포함)
   */
  getNotices: {
    method: 'GET' as const,
    path: '/notices/notice',
    query: z.object({
      category: z.string().optional(),
      isActive: z.coerce.boolean().optional(),
    }),
    responses: {
      200: ApiResponseSchema(z.array(NoticeSchema)),
    },
  },

  /**
   * [공지사항] GET /notices/notice/:id
   * 특정 공지사항 상세 정보 조회
   */
  getNotice: {
    method: 'GET' as const,
    path: '/notices/notice/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ApiResponseSchema(NoticeSchema),
      404: z.null(),
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
      200: PaginatedResponseSchema(BoardPostSchema),
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
      404: z.null(),
    },
  },

  /**
   * [게시판] POST /notices/board
   * 게시글 작성
   */
  createPost: {
    method: 'POST' as const,
    path: '/notices/board',
    body: BoardPostSchema.pick({
      boardKey: true,
      title: true,
      content: true,
    }).extend({
      isPinned: z.boolean().optional(),
      isLocked: z.boolean().optional(),
      fileIds: z.array(z.string()).optional(),
    }),
    responses: {
      201: ApiResponseSchema(BoardPostSchema),
    },
  },

  /**
   * [게시판] PATCH /notices/board/:id
   * 게시글 수정
   */
  updatePost: {
    method: 'PATCH' as const,
    path: '/notices/board/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: BoardPostSchema.pick({
      title: true,
      content: true,
    })
      .partial()
      .extend({
        isPinned: z.boolean().optional(),
        isLocked: z.boolean().optional(),
        fileIds: z.array(z.string()).optional(),
      }),
    responses: {
      200: ApiResponseSchema(BoardPostSchema),
    },
  },

  /**
   * [게시판] DELETE /notices/board/:id
   * 게시글 삭제
   */
  deletePost: {
    method: 'DELETE' as const,
    path: '/notices/board/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: z.object({}),
    responses: {
      200: ApiResponseSchema(z.object({ success: z.boolean() })),
    },
  },

  /**
   * [댓글] GET /notices/board/:postId/comments
   * 특정 게시글에 달린 전체 댓글 및 대댓글 조회
   */
  getComments: {
    method: 'GET' as const,
    path: '/notices/board/:postId/comments',
    pathParams: z.object({
      postId: z.string(),
    }),
    responses: {
      200: ApiResponseSchema(z.array(BoardCommentSchema)),
    },
  },

  /**
   * [댓글] POST /notices/board/comments
   * 신규 댓글 또는 대댓글 작성
   */
  createComment: {
    method: 'POST' as const,
    path: '/notices/board/comments',
    body: BoardCommentBaseSchema.omit({ id: true, createdAt: true, updatedAt: true }),
    responses: {
      201: ApiResponseSchema(BoardCommentSchema),
    },
  },

  /**
   * [댓글] DELETE /notices/board/comments/:id
   * 댓글 삭제 (논리 삭제)
   */
  deleteComment: {
    method: 'DELETE' as const,
    path: '/notices/board/comments/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: z.object({}),
    responses: {
      200: ApiResponseSchema(z.object({ success: z.boolean() })),
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
