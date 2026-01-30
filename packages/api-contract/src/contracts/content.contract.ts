/**
 * @description Content(공지, 게시판, 갤러리) 관리 API Contract
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';
import { ApiResponseSchema } from '../schemas/common/response.schema';
import {
  BoardCommentSchema,
  BoardPostSchema,
  GalleryItemSchema,
  NoticeSchema,
  PopupBannerSchema,
  WebsiteSettingSchema,
} from '../schemas/content/index';

/**
 * [공지사항] GET /content/notices
 * 전체 공지사항 목록 조회 (활성화된 공지만 조회하는 필터 포함)
 */

export const contentContract = {
  /**
   * [공지사항] GET /content/notices
   * 전체 공지사항 목록 조회 (활성화된 공지만 조회하는 필터 포함)
   */
  getNotices: {
    method: 'GET' as const,
    path: '/content/notices',
    query: z.object({
      category: z.string().optional(),
      isActive: z.coerce.boolean().optional(),
    }),
    responses: {
      200: ApiResponseSchema(z.array(NoticeSchema)),
    },
  },

  /**
   * [게시판] GET /content/posts
   * 게시판 키('FREE', 'QNA' 등)에 따른 게시글 목록 조회
   */
  getPosts: {
    method: 'GET' as const,
    path: '/content/posts',
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
   * [게시판] GET /content/posts/:id
   * 특정 게시글 상세 정보 및 조회수 증가
   */
  getPost: {
    method: 'GET' as const,
    path: '/content/posts/:id',
    responses: {
      200: ApiResponseSchema(BoardPostSchema),
    },
  },

  /**
   * [댓글] GET /content/posts/:postId/comments
   * 특정 게시글에 달린 전체 댓글 및 대댓글 조회
   */
  getComments: {
    method: 'GET' as const,
    path: '/content/posts/:postId/comments',
    responses: {
      200: ApiResponseSchema(z.array(BoardCommentSchema)),
    },
  },

  /**
   * [댓글] POST /content/comments
   * 신규 댓글 또는 대댓글 작성
   */
  createComment: {
    method: 'POST' as const,
    path: '/content/comments',
    body: BoardCommentSchema.omit({ id: true, createdAt: true, updatedAt: true }),
    responses: {
      201: ApiResponseSchema(BoardCommentSchema),
    },
  },

  /**
   * [갤러리] GET /content/gallery
   * 갤러리/행사 사진 목록 조회
   */
  getGalleryItems: {
    method: 'GET' as const,
    path: '/content/gallery',
    responses: {
      200: ApiResponseSchema(z.array(GalleryItemSchema)),
    },
  },

  /**
   * [팝업] GET /content/popups/active
   * 현재 노출 기간에 해당하는 활성 팝업 목록 조회
   */
  getActivePopups: {
    method: 'GET' as const,
    path: '/content/popups/active',
    responses: {
      200: ApiResponseSchema(z.array(PopupBannerSchema)),
    },
  },

  /**
   * [설정] GET /content/settings/:category
   * 웹사이트 섹션별 설정 정보(디자인, 비용 안내 등) 조회
   */
  getWebsiteSettings: {
    method: 'GET' as const,
    path: '/content/settings/:category',
    responses: {
      200: ApiResponseSchema(z.array(WebsiteSettingSchema)),
    },
  },
} as const;

// Contract 타입 추출
export type ContentContract = typeof contentContract;
