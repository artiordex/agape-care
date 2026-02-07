/**
 * @description Content(공지, 게시판, 갤러리) 관리 API Contract
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';
import { ApiResponseSchema } from '../schemas/common/response.schema.js';
import {
  BoardCommentSchema,
  BoardPostSchema,
  GalleryItemSchema,
  NoticeSchema,
  PopupBannerSchema,
  WebsiteSettingSchema,
} from '../schemas/contents/index.js';

/**
 * [공지사항] GET /contents/announcement
 * 전체 공지사항 목록 조회 (활성화된 공지만 조회하는 필터 포함)
 */

export const contentContract = {
  /**
   * [공지사항] GET /contents/announcement
   * 전체 공지사항 목록 조회 (활성화된 공지만 조회하는 필터 포함)
   */
  getNotices: {
    method: 'GET' as const,
    path: '/contents/announcement',
    query: z.object({
      category: z.string().optional(),
      isActive: z.coerce.boolean().optional(),
    }),
    responses: {
      200: ApiResponseSchema(z.array(NoticeSchema)),
    },
  },

  /**
   * [공지사항] GET /contents/announcement/:id
   * 특정 공지사항 상세 정보 조회
   */
  getNotice: {
    method: 'GET' as const,
    path: '/contents/announcement/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ApiResponseSchema(NoticeSchema),
    },
  },

  /**
   * [공지사항] POST /contents/notices
   * 신규 공지사항 작성
   */
  createNotice: {
    method: 'POST' as const,
    path: '/contents/notices',
    body: NoticeSchema.omit({ id: true, createdAt: true, updatedAt: true }),
    responses: {
      201: ApiResponseSchema(NoticeSchema),
    },
  },

  /**
   * [공지사항] PATCH /contents/notices/:id
   * 기존 공지사항 수정
   */
  updateNotice: {
    method: 'PATCH' as const,
    path: '/contents/notices/:id',
    body: NoticeSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial(),
    responses: {
      200: ApiResponseSchema(NoticeSchema),
    },
  },

  /**
   * [공지사항] DELETE /contents/notices/:id
   * 특정 공지사항 삭제
   */
  deleteNotice: {
    method: 'DELETE' as const,
    path: '/contents/notices/:id',
    body: z.object({}),
    responses: {
      200: ApiResponseSchema(z.object({ success: z.boolean() })),
    },
  },

  /**
   * [게시판] GET /contents/posts
   * 게시판 키('FREE', 'QNA' 등)에 따른 게시글 목록 조회
   */
  getPosts: {
    method: 'GET' as const,
    path: '/contents/posts',
    query: z.object({
      boardKey: z.string(),
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(10),
    }),
    responses: {
      200: ApiResponseSchema(z.array(BoardPostSchema)),
    },
  },

  /**
   * [게시판] GET /contents/posts/:id
   * 특정 게시글 상세 정보 및 조회수 증가
   */
  getPost: {
    method: 'GET' as const,
    path: '/contents/posts/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ApiResponseSchema(BoardPostSchema),
    },
  },

  /**
   * [게시판] POST /contents/posts
   * 신규 게시글 작성
   */
  createPost: {
    method: 'POST' as const,
    path: '/contents/posts',
    body: BoardPostSchema.omit({ id: true, createdAt: true, updatedAt: true }),
    responses: {
      201: ApiResponseSchema(BoardPostSchema),
    },
  },

  /**
   * [게시판] PATCH /contents/posts/:id
   * 기존 게시글 수정
   */
  updatePost: {
    method: 'PATCH' as const,
    path: '/contents/posts/:id',
    body: BoardPostSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial(),
    responses: {
      200: ApiResponseSchema(BoardPostSchema),
    },
  },

  /**
   * [게시판] DELETE /contents/posts/:id
   * 특정 게시글 삭제
   */
  deletePost: {
    method: 'DELETE' as const,
    path: '/contents/posts/:id',
    body: z.object({}),
    responses: {
      200: ApiResponseSchema(z.object({ success: z.boolean() })),
    },
  },

  /**
   * [댓글] GET /contents/posts/:postId/comments
   * 특정 게시글에 달린 전체 댓글 및 대댓글 조회
   */
  getComments: {
    method: 'GET' as const,
    path: '/contents/posts/:postId/comments',
    responses: {
      200: ApiResponseSchema(z.array(BoardCommentSchema)),
    },
  },

  /**
   * [댓글] POST /contents/comments
   * 신규 댓글 또는 대댓글 작성
   */
  createComment: {
    method: 'POST' as const,
    path: '/contents/comments',
    body: BoardCommentSchema.omit({ id: true, createdAt: true, updatedAt: true }),
    responses: {
      201: ApiResponseSchema(BoardCommentSchema),
    },
  },

  /**
   * [갤러리] GET /contents/gallery
   * 갤러리/행사 사진 목록 조회
   */
  getGalleryItems: {
    method: 'GET' as const,
    path: '/contents/gallery',
    responses: {
      200: ApiResponseSchema(z.array(GalleryItemSchema)),
    },
  },

  /**
   * [팝업] GET /contents/popups/active
   * 현재 노출 기간에 해당하는 활성 팝업 목록 조회
   */
  getActivePopups: {
    method: 'GET' as const,
    path: '/contents/popups/active',
    responses: {
      200: ApiResponseSchema(z.array(PopupBannerSchema)),
    },
  },

  /**
   * [설정] GET /contents/settings/:category
   * 웹사이트 섹션별 설정 정보(디자인, 비용 안내 등) 조회
   */
  getWebsiteSettings: {
    method: 'GET' as const,
    path: '/contents/settings/:category',
    responses: {
      200: ApiResponseSchema(z.array(WebsiteSettingSchema)),
    },
  },
} as const;

// Contract 타입 추출
export type ContentContract = typeof contentContract;
