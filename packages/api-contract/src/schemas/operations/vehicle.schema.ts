/**
 * @description 차량 관리 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 차량 유형
 */
export const VehicleTypeSchema = z.enum(['SEDAN', 'VAN', 'BUS']);

/**
 * 차량 상태
 */
export const VehicleStatusSchema = z.enum(['ACTIVE', 'MAINTENANCE', 'RETIRED']);

/**
 * 차량 정보
 */
export const VehicleSchema = z.object({
  id: z.string(),
  vehicleNo: z.string(),
  vehicleType: VehicleTypeSchema,
  model: z.string().nullable(),
  manufacturer: z.string().nullable(),
  year: z.number().nullable(),
  capacity: z.number().nullable(),
  purchaseDate: z.string().nullable(), // ISO date
  lastInspection: z.string().nullable(),
  insuranceExpires: z.string().nullable(),
  mileage: z.number().nullable(),
  status: VehicleStatusSchema,
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 차량 생성 요청
 */
export const CreateVehicleRequestSchema = z.object({
  vehicleNo: z.string().min(1, '차량 번호는 필수입니다'),
  vehicleType: VehicleTypeSchema,
  model: z.string().optional(),
  manufacturer: z.string().optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  capacity: z.number().int().positive().optional(),
  purchaseDate: z.string().optional(),
  lastInspection: z.string().optional(),
  insuranceExpires: z.string().optional(),
  mileage: z.number().int().min(0).optional(),
  status: VehicleStatusSchema.default('ACTIVE'),
  notes: z.string().optional(),
});

/**
 * 차량 수정 요청
 */
export const UpdateVehicleRequestSchema = z.object({
  vehicleType: VehicleTypeSchema.optional(),
  model: z.string().nullable().optional(),
  manufacturer: z.string().nullable().optional(),
  year: z.number().int().min(1900).max(2100).nullable().optional(),
  capacity: z.number().int().positive().nullable().optional(),
  purchaseDate: z.string().nullable().optional(),
  lastInspection: z.string().nullable().optional(),
  insuranceExpires: z.string().nullable().optional(),
  mileage: z.number().int().min(0).nullable().optional(),
  status: VehicleStatusSchema.optional(),
  notes: z.string().nullable().optional(),
});

/**
 * 차량 목록 조회 쿼리
 */
export const GetVehiclesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  vehicleType: VehicleTypeSchema.optional(),
  status: VehicleStatusSchema.optional(),
  search: z.string().optional(), // 차량번호, 모델 검색
});

/**
 * 차량 목록 응답
 */
export const GetVehiclesResponseSchema = z.object({
  data: z.array(VehicleSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 차량 통계
 */
export const VehicleStatsSchema = z.object({
  total: z.number(),
  byType: z.record(z.number()),
  byStatus: z.object({
    active: z.number(),
    maintenance: z.number(),
    retired: z.number(),
  }),
  expiringInsurance: z.number(), // 보험 만료 임박
  needsInspection: z.number(), // 검사 필요
});

// Type exports
export type VehicleType = z.infer<typeof VehicleTypeSchema>;
export type VehicleStatus = z.infer<typeof VehicleStatusSchema>;
export type Vehicle = z.infer<typeof VehicleSchema>;
export type CreateVehicleRequest = z.infer<typeof CreateVehicleRequestSchema>;
export type UpdateVehicleRequest = z.infer<typeof UpdateVehicleRequestSchema>;
export type GetVehiclesQuery = z.infer<typeof GetVehiclesQuerySchema>;
export type GetVehiclesResponse = z.infer<typeof GetVehiclesResponseSchema>;
export type VehicleStats = z.infer<typeof VehicleStatsSchema>;
