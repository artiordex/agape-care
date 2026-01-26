/**
 * @description 운송 서비스 요청 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 운송 목적
 */
export const TransportPurposeSchema = z.enum(['HOSPITAL', 'OUTING', 'OTHER']);

/**
 * 운송 요청 상태
 */
export const TransportStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']);

/**
 * 운송 요청 정보
 */
export const TransportRequestSchema = z.object({
  id: z.string(),
  residentId: z.string(),
  residentName: z.string().optional(), // 조인
  vehicleId: z.string().nullable(),
  vehicleNo: z.string().nullable().optional(), // 조인
  driverId: z.string().nullable(),
  driverName: z.string().nullable().optional(), // 조인
  requestDate: z.string(), // ISO datetime
  pickupLocation: z.string(),
  destination: z.string(),
  purpose: TransportPurposeSchema.nullable(),
  status: TransportStatusSchema,
  actualDeparture: z.string().nullable(),
  actualArrival: z.string().nullable(),
  notes: z.string().nullable(),
  createdBy: z.string().nullable(),
  createdByName: z.string().nullable().optional(), // 조인
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 운송 요청 생성 요청
 */
export const CreateTransportRequestSchema = z.object({
  residentId: z.string(),
  vehicleId: z.string().optional(),
  driverId: z.string().optional(),
  requestDate: z.string(), // ISO datetime
  pickupLocation: z.string().min(1, '출발지는 필수입니다'),
  destination: z.string().min(1, '목적지는 필수입니다'),
  purpose: TransportPurposeSchema.optional(),
  notes: z.string().optional(),
});

/**
 * 운송 요청 수정 요청
 */
export const UpdateTransportRequestSchema = z.object({
  vehicleId: z.string().nullable().optional(),
  driverId: z.string().nullable().optional(),
  requestDate: z.string().optional(),
  pickupLocation: z.string().min(1).optional(),
  destination: z.string().min(1).optional(),
  purpose: TransportPurposeSchema.nullable().optional(),
  status: TransportStatusSchema.optional(),
  actualDeparture: z.string().nullable().optional(),
  actualArrival: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

/**
 * 운송 요청 목록 조회 쿼리
 */
export const GetTransportRequestsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: TransportStatusSchema.optional(),
  residentId: z.string().optional(),
  vehicleId: z.string().optional(),
  driverId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

/**
 * 운송 요청 목록 응답
 */
export const GetTransportRequestsResponseSchema = z.object({
  data: z.array(TransportRequestSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 운송 통계
 */
export const TransportStatsSchema = z.object({
  total: z.number(),
  byStatus: z.object({
    pending: z.number(),
    confirmed: z.number(),
    completed: z.number(),
    cancelled: z.number(),
  }),
  byPurpose: z.record(z.number()),
});

// Type exports
export type TransportPurpose = z.infer<typeof TransportPurposeSchema>;
export type TransportStatus = z.infer<typeof TransportStatusSchema>;
export type TransportRequest = z.infer<typeof TransportRequestSchema>;
export type CreateTransportRequest = z.infer<typeof CreateTransportRequestSchema>;
export type UpdateTransportRequest = z.infer<typeof UpdateTransportRequestSchema>;
export type GetTransportRequestsQuery = z.infer<typeof GetTransportRequestsQuerySchema>;
export type GetTransportRequestsResponse = z.infer<typeof GetTransportRequestsResponseSchema>;
export type TransportStats = z.infer<typeof TransportStatsSchema>;
