/**
 * @description CCTV 장비 및 열람 로그 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * CCTV 장비 상태
 */
export const CctvDeviceStatusSchema = z.enum(['ACTIVE', 'MAINTENANCE', 'INACTIVE']);

/**
 * CCTV 장비 정보
 */
export const CctvDeviceSchema = z.object({
  id: z.string(),
  deviceNo: z.string(),
  location: z.string(),
  ipAddress: z.string().nullable(),
  model: z.string().nullable(),
  installDate: z.string().nullable(), // ISO date
  lastCheckDate: z.string().nullable(),
  status: CctvDeviceStatusSchema,
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * CCTV 장비 생성 요청
 */
export const CreateCctvDeviceRequestSchema = z.object({
  deviceNo: z.string().min(1, '장비 번호는 필수입니다'),
  location: z.string().min(1, '설치 위치는 필수입니다'),
  ipAddress: z.string().optional(),
  model: z.string().optional(),
  installDate: z.string().optional(),
  status: CctvDeviceStatusSchema.default('ACTIVE'),
  notes: z.string().optional(),
});

/**
 * CCTV 장비 수정 요청
 */
export const UpdateCctvDeviceRequestSchema = z.object({
  location: z.string().min(1).optional(),
  ipAddress: z.string().nullable().optional(),
  model: z.string().nullable().optional(),
  installDate: z.string().nullable().optional(),
  lastCheckDate: z.string().nullable().optional(),
  status: CctvDeviceStatusSchema.optional(),
  notes: z.string().nullable().optional(),
});

/**
 * CCTV 열람 로그
 */
export const CctvViewLogSchema = z.object({
  id: z.string(),
  deviceId: z.string(),
  deviceNo: z.string().optional(), // 조인
  deviceLocation: z.string().optional(), // 조인
  viewerId: z.string(),
  viewerName: z.string().optional(), // 조인
  viewStart: z.string(), // ISO datetime
  viewEnd: z.string().nullable(),
  purpose: z.string(),
  approvedBy: z.string().nullable(),
  approverName: z.string().nullable().optional(), // 조인
  createdAt: z.string(),
});

/**
 * CCTV 열람 로그 생성 요청
 */
export const CreateCctvViewLogRequestSchema = z.object({
  deviceId: z.string(),
  viewStart: z.string().optional(), // 기본값: 현재 시각
  viewEnd: z.string().optional(),
  purpose: z.string().min(1, '열람 목적은 필수입니다'),
  approvedBy: z.string().optional(),
});

/**
 * CCTV 장비 목록 조회 쿼리
 */
export const GetCctvDevicesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: CctvDeviceStatusSchema.optional(),
  search: z.string().optional(), // 장비번호, 위치 검색
});

/**
 * CCTV 열람 로그 조회 쿼리
 */
export const GetCctvViewLogsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  deviceId: z.string().optional(),
  viewerId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

/**
 * CCTV 장비 목록 응답
 */
export const GetCctvDevicesResponseSchema = z.object({
  data: z.array(CctvDeviceSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * CCTV 열람 로그 목록 응답
 */
export const GetCctvViewLogsResponseSchema = z.object({
  data: z.array(CctvViewLogSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

// Type exports
export type CctvDeviceStatus = z.infer<typeof CctvDeviceStatusSchema>;
export type CctvDevice = z.infer<typeof CctvDeviceSchema>;
export type CreateCctvDeviceRequest = z.infer<typeof CreateCctvDeviceRequestSchema>;
export type UpdateCctvDeviceRequest = z.infer<typeof UpdateCctvDeviceRequestSchema>;
export type CctvViewLog = z.infer<typeof CctvViewLogSchema>;
export type CreateCctvViewLogRequest = z.infer<typeof CreateCctvViewLogRequestSchema>;
export type GetCctvDevicesQuery = z.infer<typeof GetCctvDevicesQuerySchema>;
export type GetCctvViewLogsQuery = z.infer<typeof GetCctvViewLogsQuerySchema>;
export type GetCctvDevicesResponse = z.infer<typeof GetCctvDevicesResponseSchema>;
export type GetCctvViewLogsResponse = z.infer<typeof GetCctvViewLogsResponseSchema>;
