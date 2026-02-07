/**
 * @description Visit Reservation API Contract
 * @author Agape Care AI
 */
import { z } from 'zod';
import { ApiResponseSchema, PaginatedResponseSchema } from '../schemas/common/response.schema.js';
import { CreateVisitReservationSchema, VisitReservationSchema } from '../schemas/visit-reservation/index.js';

export const visitReservationContract = {
  /**
   * [면회] POST /visit-reservations
   * 홈페이지 면회 예약 신청
   */
  createVisitReservation: {
    method: 'POST' as const,
    path: '/visit-reservations',
    body: CreateVisitReservationSchema,
    responses: {
      201: ApiResponseSchema(VisitReservationSchema),
    },
  },

  /**
   * [면회] GET /visit-reservations
   * 면회 예약 목록 조회 (관리자용)
   */
  getVisitReservations: {
    method: 'GET' as const,
    path: '/visit-reservations',
    query: z.object({
      page: z.string().transform(Number).default('1'),
      limit: z.string().transform(Number).default('10'),
      status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']).optional(),
      search: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
    responses: {
      200: PaginatedResponseSchema(VisitReservationSchema),
    },
  },

  /**
   * [면회] GET /visit-reservations/:id
   * 면회 예약 상세 조회
   */
  getVisitReservation: {
    method: 'GET' as const,
    path: '/visit-reservations/:id',
    responses: {
      200: ApiResponseSchema(VisitReservationSchema),
    },
  },

  /**
   * [면회] PATCH /visit-reservations/:id/status
   * 면회 예약 상태 변경 (승인/반려 등)
   */
  updateVisitReservationStatus: {
    method: 'PATCH' as const,
    path: '/visit-reservations/:id/status',
    body: z.object({
      status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']),
    }),
    responses: {
      200: ApiResponseSchema(VisitReservationSchema),
    },
  },

  /**
   * [면회] DELETE /visit-reservations/:id
   * 면회 예약 신청 기록 삭제
   */
  deleteVisitReservation: {
    method: 'DELETE' as const,
    path: '/visit-reservations/:id',
    body: null,
    responses: {
      200: ApiResponseSchema(VisitReservationSchema),
    },
  },
} as const;

export type VisitReservationContract = typeof visitReservationContract;
