/**
 * @description Resident API Contract
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';
import {
  CreateResidentRequestSchema,
  UpdateResidentRequestSchema,
  GetResidentsQuerySchema,
  GetResidentsResponseSchema,
  ResidentSchema,
  ResidentStatsSchema,
} from '../schemas/resident/index.js';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

const errorResponse = (statusCode: number) =>
  z.object({
    message: z.string(),
    error: z.string().optional(),
    statusCode: z.literal(statusCode),
  });

export const residentContract = {
  /**
   * GET /api/residents
   * 입소자 목록 조회
   */
  getResidents: {
    method: 'GET' as const,
    path: '/api/residents',
    query: GetResidentsQuerySchema,
    responses: {
      200: GetResidentsResponseSchema,
    },
    summary: '입소자 목록 조회',
    description: '입소자 목록을 페이징하여 조회합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/residents/:id
   * 입소자 상세 조회
   */
  getResident: {
    method: 'GET' as const,
    path: '/api/residents/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ResidentSchema,
      404: errorResponse(404),
    },
    summary: '입소자 상세 조회',
    description: '특정 입소자의 상세 정보를 조회합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/residents
   * 입소자 생성
   */
  createResident: {
    method: 'POST' as const,
    path: '/api/residents',
    body: CreateResidentRequestSchema,
    responses: {
      201: ResidentSchema,
      400: errorResponse(400),
      409: errorResponse(409),
    },
    summary: '입소자 생성',
    description: '새로운 입소자를 등록합니다.',
    headers: authHeader,
  },

  /**
   * PATCH /api/residents/:id
   * 입소자 수정
   */
  updateResident: {
    method: 'PATCH' as const,
    path: '/api/residents/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: UpdateResidentRequestSchema,
    responses: {
      200: ResidentSchema,
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '입소자 수정',
    description: '입소자 정보를 수정합니다.',
    headers: authHeader,
  },

  /**
   * DELETE /api/residents/:id
   * 입소자 삭제
   */
  deleteResident: {
    method: 'DELETE' as const,
    path: '/api/residents/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '입소자 삭제',
    description: '입소자를 삭제합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/residents/stats
   * 입소자 통계
   */
  getResidentStats: {
    method: 'GET' as const,
    path: '/api/residents/stats',
    responses: {
      200: ResidentStatsSchema,
    },
    summary: '입소자 통계',
    description: '입소자 통계 정보를 조회합니다.',
    headers: authHeader,
  },
} as const;

export type ResidentContract = typeof residentContract;
