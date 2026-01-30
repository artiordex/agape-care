/**
 * @description Web Inquiry API Contract
 * @author Agape Care AI
 */
import { z } from 'zod';
import { ApiResponseSchema, PaginatedResponseSchema } from '../schemas/common/response.schema';
import { CreateWebInquirySchema, WebInquirySchema } from '../schemas/web-inquiry';

export const webInquiryContract = {
  /**
   * [문의] POST /web-inquiries
   * 웹사이트 상담 문의 등록
   */
  createWebInquiry: {
    method: 'POST' as const,
    path: '/web-inquiries',
    body: CreateWebInquirySchema,
    responses: {
      201: ApiResponseSchema(WebInquirySchema),
    },
  },

  /**
   * [문의] GET /web-inquiries
   * 웹사이트 상담 문의 목록 조회
   */
  getWebInquiries: {
    method: 'GET' as const,
    path: '/web-inquiries',
    query: z.object({
      page: z.string().transform(Number).default('1'),
      limit: z.string().transform(Number).default('10'),
      status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).optional(),
      type: z.string().optional(),
    }),
    responses: {
      200: PaginatedResponseSchema(WebInquirySchema),
    },
  },

  /**
   * [문의] GET /web-inquiries/:id
   * 웹사이트 상담 문의 상세 조회
   */
  getWebInquiry: {
    method: 'GET' as const,
    path: '/web-inquiries/:id',
    responses: {
      200: ApiResponseSchema(WebInquirySchema),
    },
  },

  /**
   * [문의] PATCH /web-inquiries/:id/status
   * 웹사이트 상담 문의 상태 변경
   */
  updateWebInquiryStatus: {
    method: 'PATCH' as const,
    path: '/web-inquiries/:id/status',
    body: z.object({
      status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']),
    }),
    responses: {
      200: ApiResponseSchema(WebInquirySchema),
    },
  },
} as const;

export type WebInquiryContract = typeof webInquiryContract;
