/**
 * @description 입소자 활력징후(바이탈) 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 활력징후 정보
 */
export const ResidentVitalSchema = z.object({
  id: z.string(),
  residentId: z.string(),
  recordedBy: z.string().nullable(),
  recordedByName: z.string().nullable(), // 기록자 이름 (조인)
  measuredAt: z.string(), // ISO datetime
  systolicBp: z.number().int().nullable(), // 수축기 혈압
  diastolicBp: z.number().int().nullable(), // 이완기 혈압
  heartRate: z.number().int().nullable(), // 심박수
  temperature: z.number().nullable(), // 체온
  respiratoryRate: z.number().int().nullable(), // 호흡수
  spo2: z.number().int().nullable(), // 산소포화도
  notes: z.string().nullable(),
});

/**
 * 활력징후 생성 요청
 */
export const CreateVitalRequestSchema = z.object({
  measuredAt: z.string().optional(), // 기본값: 현재 시각
  systolicBp: z.number().int().min(0).max(300).optional(),
  diastolicBp: z.number().int().min(0).max(200).optional(),
  heartRate: z.number().int().min(0).max(300).optional(),
  temperature: z.number().min(30).max(45).optional(),
  respiratoryRate: z.number().int().min(0).max(100).optional(),
  spo2: z.number().int().min(0).max(100).optional(),
  notes: z.string().optional(),
});

/**
 * 활력징후 수정 요청
 */
export const UpdateVitalRequestSchema = z.object({
  measuredAt: z.string().optional(),
  systolicBp: z.number().int().min(0).max(300).nullable().optional(),
  diastolicBp: z.number().int().min(0).max(200).nullable().optional(),
  heartRate: z.number().int().min(0).max(300).nullable().optional(),
  temperature: z.number().min(30).max(45).nullable().optional(),
  respiratoryRate: z.number().int().min(0).max(100).nullable().optional(),
  spo2: z.number().int().min(0).max(100).nullable().optional(),
  notes: z.string().nullable().optional(),
});

/**
 * 활력징후 목록 조회 쿼리
 */
export const GetVitalsQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  startDate: z.string().optional(), // ISO date
  endDate: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

/**
 * 활력징후 목록 응답
 */
export const GetVitalsResponseSchema = z.object({
  data: z.array(ResidentVitalSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 활력징후 통계
 */
export const VitalStatsSchema = z.object({
  avgSystolicBp: z.number().nullable(),
  avgDiastolicBp: z.number().nullable(),
  avgHeartRate: z.number().nullable(),
  avgTemperature: z.number().nullable(),
  avgSpo2: z.number().nullable(),
  period: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
  count: z.number(),
});

// Type exports
export type ResidentVital = z.infer<typeof ResidentVitalSchema>;
export type CreateVitalRequest = z.infer<typeof CreateVitalRequestSchema>;
export type UpdateVitalRequest = z.infer<typeof UpdateVitalRequestSchema>;
export type GetVitalsQuery = z.infer<typeof GetVitalsQuerySchema>;
export type GetVitalsResponse = z.infer<typeof GetVitalsResponseSchema>;
export type VitalStats = z.infer<typeof VitalStatsSchema>;
